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

export const pushArticleToVoting = async (wallet: any, id: any) => {
  const provider = await getProvider(wallet);
  const programID = new PublicKey(
    "3Z8eqLzepWH6UmqFyU9mDsjQp6QepLURqHSBFwmJLdCh"
  );

  const program = new Program(idl, programID, provider);

  console.log("The provder", provider);
  const { SystemProgram, Keypair } = web3;
  /* create an account  */
  const reportAccount = {
    publicKey: new PublicKey("J74UtXHDxgzfvaorBDxh9V3SSJ1fcASVX1UBc7XXDb2"),
  };

  const paymentAmout = 100000000;
  try {
    /* interact with the program via rpc */
    await program.rpc.pushForVote(id, paymentAmout, {
      accounts: {
        reportAccount: reportAccount.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [],
    });

    const account = await program.account.reportAccount.fetch(
      reportAccount.publicKey
    );

    return account;
    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
  }
};

export const addToSolanaProgram = async (wallet: any, id: any) => {
  console.log("IDL", idl);
  console.log("wallet is : ", wallet);
  const provider: Provider = await getProvider(wallet);
  // const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  console.log("Provider is : ", provider);

  const { SystemProgram, Keypair } = web3;
  /* create an account  */
  const reportAccount = Keypair.generate();

  // const programID = new PublicKey(
  //   "FuiSWC8pz48qFicr9FyhEDMaMot9iNLQHZmjq66tcvUp"
  // );

  const programID = new anchor.web3.PublicKey(
    "FuiSWC8pz48qFicr9FyhEDMaMot9iNLQHZmjq66tcvUp"
  );

  const program = new anchor.Program(idl, programID, provider);

  // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const connection = new Connection("https://api.devnet.solana.com");
  const mint = new PublicKey("3qq7ExpwRRAAexGNpUVoFkiTfSB1uo8ezsbyAoxhyryo");

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
  try {
    /* interact with the program via rpc */

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
    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
  }

  try {
    await program.rpc.updateReport("Sapiens", {
      accounts: {
        reportAccount: reportAccount.publicKey,
        authority: provider.wallet.publicKey,
        newstoken: splToken.TOKEN_PROGRAM_ID,
        from: fromAccount.address,
        treasury: treasuryAccount.address,
        systemProgram: SystemProgram.programId,
      },
      signers: [],
    });

    const account = await program.account.reportAccount.fetch(
      reportAccount.publicKey
    );

    console.log("account: ", account.uri);
    return reportAccount.publicKey;
    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
  }

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
