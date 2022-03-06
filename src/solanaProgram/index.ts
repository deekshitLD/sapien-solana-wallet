import { Connection, PublicKey } from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";
// import idl from "./idl.json";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
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
  const network = "https://api.testnet.solana.com";
  const connection = new Connection(network, opts.preflightCommitment);

  const provider = new Provider(connection, wallet, opts.preflightCommitment);
  return provider;
}

export const pushArticleToVoting = async (wallet: any, id: any) => {};
export const addToSolanaProgram = async (wallet: any, id: any) => {
  console.log(idl);
  const provider = await getProvider(wallet);

  const { SystemProgram, Keypair } = web3;
  /* create an account  */
  const reportAccount = Keypair.generate();

  const programID = new PublicKey(
    "3Z8eqLzepWH6UmqFyU9mDsjQp6QepLURqHSBFwmJLdCh"
  );

  const program = new Program(idl, programID, provider);
  console.log(programID);
  try {
    /* interact with the program via rpc */
    await program.rpc.initialize({
      accounts: {
        reportAccount: reportAccount.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [reportAccount],
    });

    const account = await program.account.reportAccount.fetch(
      reportAccount.publicKey
    );

    console.log("account: ", account.uri);
    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
  }

  //   try {
  //     /* interact with the program via rpc */
  //     await program.rpc.updateReport("Sapiens", {
  //       accounts: {
  //         reportAccount: reportAccount.publicKey,
  //         authority: provider.wallet.publicKey,
  //         systemProgram: SystemProgram.programId,
  //       },
  //       signers: [],
  //     });

  //     const account = await program.account.reportAccount.fetch(
  //       reportAccount.publicKey
  //     );

  //     console.log("account: ", account.uri);
  //     // setValue(account.count.toString());
  //   } catch (err) {
  //     console.log("Transaction error: ", err);
  //   }

  const paymentAmout = 100000;
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

    console.log("account: ", account.uri);
    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
  }
  //   const prog = new Program(idl, programId);

  // Address of the deployed program.
};
