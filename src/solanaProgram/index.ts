import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
// import idl from "./idl.json";
// const splToken = require("@solana/spl-token");
import * as splToken from "@solana/spl-token";

import bs58 from "bs58";
import * as solanaweb3 from "@solana/web3.js";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { TokenInstructions } from "@project-serum/serum";

import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
require("@solana/wallet-adapter-react-ui/styles.css");
import * as anchor from "@project-serum/anchor";
// import { TOKEN_PROGRAM_ID } from "@solana/spl-governance";
const idl = require("./idl.json");
const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  new PhantomWalletAdapter(),
];

// const { SystemProgram } = anchor.web3;

async function getProvider(wallet: any) {
  const opts: any = {
    preflightCommitment: "processed",
  };
  console.log("Wallet passed inside is ", wallet);
  /* create the provider and return it to the caller */
  /* network set to local network for now */
  const network = "https://api.devnet.solana.com";
  const connection = new Connection(network, opts.preflightCommitment);

  const provider = new Provider(connection, wallet, opts.preflightCommitment);
  return provider;
}

const getParameters = () => {};

export const pushArticleToVoting = async (
  wallet: any,
  id: any,
  reportAccount: any
) => {
  const provider = await getProvider(wallet);
  const programID = new anchor.web3.PublicKey(
    "BDxFK1pXTk1FsmGmqkhZzk8ptNXvyEX6WQJcacwLDnVC"
  );

  const program = new Program(idl, programID, provider);

  console.log("The provder", provider);
  const { SystemProgram, Keypair } = web3;
  /* create an account  */

  const paymentAmount = 100000000;
  function ToInteger(x: any) {
    x = Number(x);
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  }
  function modulo(a: any, b: any) {
    return a - Math.floor(a / b) * b;
  }
  function ToUint32(x: any) {
    // return modulo(ToInteger(x), Math.pow(2, 32));
    return x >>> 0;
  }
  // const paymentAmout = ToUint32(100000000);
  console.log("Payment Amount is: ", paymentAmount, typeof paymentAmount);
  let fromAccount: any;
  let treasuryAccount: any;
  const connection = new Connection("https://api.devnet.solana.com");
  const mint = new PublicKey("HaE6JcfLgeeStUxSx3YfZi84hm9bmu2oxsLmRCF8xvTm");
  try {
    fromAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      provider.wallet.publicKey
    );

    treasuryAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      new PublicKey("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7")
    );
  } catch (err) {
    console.log("Error inside getOrCreateAssosciatedTokenAccount", err);
  }
  try {
    /* interact with the program via rpc */
    await program.rpc.pushForVote({
      accounts: {
        reportAccount: new PublicKey(reportAccount),
        authority: provider.wallet.publicKey,
        newstoken: splToken.TOKEN_PROGRAM_ID,
        from: fromAccount.address,
        treasury: treasuryAccount.address,
        systemProgram: SystemProgram.programId,
      },
      signers: [],
    });
    return true;
    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
    return false;
  }
};

export const initializeArticleAccount = async (wallet: any, id: any) => {
  // ------------------- Initialize all parameters -------------------------------------
  const provider: Provider = await getProvider(wallet);
  anchor.setProvider(provider);

  const { SystemProgram, Keypair } = web3;

  const reportAccount = Keypair.generate();
  console.log("Inside initializeArticleAccount: ", reportAccount);
  const programID = new anchor.web3.PublicKey(
    "BDxFK1pXTk1FsmGmqkhZzk8ptNXvyEX6WQJcacwLDnVC"
  );

  const program = new anchor.Program(idl, programID, provider);

  const connection = new Connection("https://api.devnet.solana.com");
  const mint = new PublicKey("HaE6JcfLgeeStUxSx3YfZi84hm9bmu2oxsLmRCF8xvTm");

  let fromAccount: any;
  let treasuryAccount: any;

  try {
    fromAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      provider.wallet.publicKey
    );

    treasuryAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      new PublicKey("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7")
    );
  } catch (err) {
    console.log("Error inside getOrCreateAssosciatedTokenAccount", err);
  }
  // ------------------- Initialize all parameters -------------------------------------

  try {
    /* Initialize account for article for first time, interact with the program via rpc */

    await program.rpc.initialize({
      accounts: {
        reportAccount: reportAccount.publicKey,
        authority: provider.wallet.publicKey,
        newstoken: splToken.TOKEN_PROGRAM_ID,
        from: fromAccount.address,
        treasury: treasuryAccount.address,
        systemProgram: SystemProgram.programId,
      },
      signers: [reportAccount],
    });

    const account = await program.account.reportAccount.fetch(
      reportAccount.publicKey
    );

    console.log("account: ", account);
    return reportAccount.publicKey;
    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
  }
};

export const updateOrAddArticle = async (
  wallet: any,
  id: any,
  reportAccount: any
) => {
  const provider: Provider = await getProvider(wallet);
  anchor.setProvider(provider);

  const { SystemProgram, Keypair } = web3;

  const programID = new anchor.web3.PublicKey(
    "BDxFK1pXTk1FsmGmqkhZzk8ptNXvyEX6WQJcacwLDnVC"
  );

  const program = new anchor.Program(idl, programID, provider);

  const connection = new Connection("https://api.devnet.solana.com");
  const mint = new PublicKey("HaE6JcfLgeeStUxSx3YfZi84hm9bmu2oxsLmRCF8xvTm");

  let fromAccount: any;
  let treasuryAccount: any;

  try {
    fromAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      provider.wallet.publicKey
    );

    treasuryAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      new PublicKey("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7")
    );
  } catch (err) {
    console.log("Error inside getOrCreateAssosciatedTokenAccount", err);
  }
  try {
    await program.rpc.updateReport(id.toString(), {
      accounts: {
        reportAccount: new PublicKey(reportAccount),
        authority: provider.wallet.publicKey,
        newstoken: splToken.TOKEN_PROGRAM_ID,
        from: fromAccount.address,
        treasury: treasuryAccount.address,
        systemProgram: SystemProgram.programId,
      },
      signers: [],
    });

    const account = await program.account.reportAccount.fetch(reportAccount);

    console.log("id: ", id.toString());
    console.log("account: ", account);

    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
  }
};

export const addToSolanaProgram = async (
  wallet: any,
  id: any,
  reportAccount?: any
) => {
  console.log();
  console.log("IDL", idl);
  console.log("wallet is : ", wallet);
  const provider: Provider = await getProvider(wallet);
  // const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  console.log("Provider is : ", provider);

  const { SystemProgram, Keypair } = web3;

  if (reportAccount === undefined) {
    /* create an account  */
    reportAccount = Keypair.generate();
  }
  // const programID = new PublicKey(
  //   "FuiSWC8pz48qFicr9FyhEDMaMot9iNLQHZmjq66tcvUp"
  // );

  const programID = new anchor.web3.PublicKey(
    "BDxFK1pXTk1FsmGmqkhZzk8ptNXvyEX6WQJcacwLDnVC"
  );

  const program = new anchor.Program(idl, programID, provider);

  // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const connection = new Connection("https://api.devnet.solana.com");
  const mint = new PublicKey("HaE6JcfLgeeStUxSx3YfZi84hm9bmu2oxsLmRCF8xvTm");

  // let mintAccount = await splToken.getMint(connection, mint);

  let fromAccount: any;
  let treasuryAccount: any;

  try {
    fromAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      provider.wallet.publicKey
    );

    treasuryAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      new PublicKey("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7")
    );
  } catch (err) {
    console.log("Error inside getOrCreateAssosciatedTokenAccount", err);
  }

  // if (!reportAccount) {
  //   initializeArticleAccount(
  //     program,
  //     reportAccount,
  //     provider,
  //     fromAccount,
  //     treasuryAccount,
  //     SystemProgram
  //   );
  // }
  // updateOrAddArticle(
  //   program,
  //   reportAccount,
  //   provider,
  //   fromAccount,
  //   treasuryAccount,
  //   SystemProgram
  // );
  // const paymentAmout = 100000;
  // try {
  //   /* interact with the program via rpc */
  //   await program.rpc.pushForVote(id, paymentAmout, {
  //     accounts: {
  //       reportAccount: reportAccount.publicKey,
  //       authority: provider.wallet.publicKey,
  //       systemProgram: SystemProgram.programId,
  //     },
  //     signers: [],
  //   });

  //   const account = await program.account.reportAccount.fetch(
  //     reportAccount.publicKey
  //   );

  //   console.log("account: ", account.uri);
  //   // setValue(account.count.toString());
  // } catch (err) {
  //   console.log("Transaction error: ", err);
  // }
  //   const prog = new Program(idl, programId);

  // Address of the deployed program.
};
