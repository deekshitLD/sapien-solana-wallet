import { Connection, PublicKey } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
// import idl from "./idl.json";
const splToken = require("@solana/spl-token");
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
  console.log(idl);
  const provider = await getProvider(wallet);

  const { SystemProgram, Keypair } = web3;
  /* create an account  */
  const reportAccount = Keypair.generate();

  const programID = new PublicKey(
    "FuiSWC8pz48qFicr9FyhEDMaMot9iNLQHZmjq66tcvUp"
  );

  const program = new Program(idl, programID, provider);
  console.log("The program id is", programID);
  console.log("The program is", program);
  console.log("The report accont is", reportAccount);
  console.log(
    "The TokenInstructions token TOKEN_PGM_ID is",
    new PublicKey(TokenInstructions.TOKEN_PROGRAM_ID)
  );
  console.log("program.programId", program.programId);
  console.log(
    "treasury",
    new PublicKey("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7")
  );
  try {
    /* interact with the program via rpc */

    await program.rpc.initialize({
      accounts: {
        reportAccount: reportAccount.publicKey,
        authority: provider.wallet.publicKey,
        // newstoken: splToken.TOKEN_PROGRAM_ID,
        // from: provider.wallet.publicKey,
        // treasury: new PublicKey("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7"),
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
    /* interact with the program via rpc */
    const uint8Arr = new Uint8Array(
      bs58.decode("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7")
    );
    const fromWallet = solanaweb3.Keypair.fromSecretKey(uint8Arr);
    await program.rpc.updateReport("Sapiens", {
      accounts: {
        reportAccount: reportAccount.publicKey,
        authority: provider.wallet.publicKey,
        newstoken: TokenInstructions.TOKEN_PROGRAM_ID,
        from: provider.wallet.publicKey,
        treasury: new PublicKey("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7"),
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
