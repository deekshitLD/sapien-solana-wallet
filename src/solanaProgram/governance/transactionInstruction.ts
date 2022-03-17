import "dotenv/config";
// import { getLocalKeyypair, getProvider } from '@helpers/mixins';
import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  Connection,
} from "@solana/web3.js";
import { Program, Provider, web3 } from "@project-serum/anchor";

import { serializeInstructionToBase64 } from "@solana/spl-governance";
import { WalletContextState } from "@solana/wallet-adapter-react";
const idl = require("../idl-gov.json");
import * as splToken from "@solana/spl-token";

import * as BufferLayout from "@solana/buffer-layout";
import { Buffer } from "buffer";

import * as buffer from "@solana/buffer-layout";
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

export const sendInstruction = async (
  wallet: any,
  reportAccount: any,
  articleId: any
) => {
  const args = process.argv.slice(2);

  const provider = await getProvider(wallet);
  const connection = new Connection("https://api.devnet.solana.com");
  //   const user = getLocalKeyypair(process.env.SOLANA_WALLET_FILEPATH);

  const tx = new Transaction();
  let transaction = new Transaction();

  const signers = [wallet];

  let sendTx = true;

  const programID = new web3.PublicKey(
    "xpqf8AFoskZT2AfYUdSjvWRn2niqEcvTS1wrKQpuBia"
  );
  const { SystemProgram, Keypair } = web3;

  const mint = new PublicKey("FCrUzx3LzTB58UTew7tCkE7jry93x3Fv8TTPzUwzVNZU");

  const program = new Program(idl, programID, provider);

  let fromAccount: any;
  let treasuryAccount: any;

  try {
    fromAccount = await splToken.getOrCreateAssociatedTokenAccount(
      connection,
      wallet,
      mint,
      wallet.publicKey
    );

    // treasuryAccount = await splToken.getOrCreateAssociatedTokenAccount(
    //   connection,
    //   wallet,
    //   mint,
    //   new PublicKey("6kgSK2hFDjUCS3wafYYW2VSwkjETuqHdByWddwmytyp7")
    // );
    console.log(
      "WE have treasury and from accounts",
      // treasuryAccount
      fromAccount
    );
  } catch (err) {
    console.log("Error inside getOrCreateAssosciatedTokenAccount", err);
  }
  // ------------------- Initialize all parameters -------------------------------------
  const publisherAccount = Keypair.generate();
  try {
    /* Initialize account for article for first time, interact with the program via rpc */

    await program.rpc.initialize({
      accounts: {
        publisherAccount: publisherAccount.publicKey,
        author: wallet,
        systemProgram: SystemProgram.programId,
      },
      signers: [publisherAccount],
    });

    const account = await program.account.publisherAccount.fetch(
      publisherAccount.publicKey
    );

    console.log("account: ", account);
    // return reportAccount.publicKey;
    // setValue(account.count.toString());
  } catch (err) {
    console.log("Transaction error: ", err);
  }

  try {
    const hash = await program.rpc.publishArticle(articleId, reportAccount, {
      accounts: {
        publisherAccount: programID,
      },
      signers: [],
    });
    const account = await program.account.publisherAccount.fetch(
      publisherAccount.publicKey
    );
    console.log("Transaction hash: ", hash, "Account: ", account);
  } catch (err) {
    console.log("Publish article error", err);
  }
  const instructions: web3.TransactionInstruction[] = [];

  const createSayByeInstructionData = () => {
    program.rpc
      .publishArticle(articleId, reportAccount, {
        accounts: {
          publisherAccount: programID,
        },
        signers: [],
      })
      .then((res) => {
        // const dataLayout = BufferLayout.struct([

        //   BufferLayout.u8('instruction'),
        // ]);

        // const data = Buffer.alloc(dataLayout.span);
        // dataLayout.encode(
        //   {
        //     instruction: res,
        //   },
        //   data
        // );

        // return data;
        program.account.reportAccount
          .fetch(reportAccount.publicKey)
          .then((acc) => {
            console.log(acc);
          });

        return res;
      });
  };

  // const instruction = new web3.TransactionInstruction({
  //   keys: [{ pubkey: wallet.publicKey, isSigner: false, isWritable: true }],
  //   programId: programID,
  //   //    data: Buffer.alloc(0),
  //   data: createSayByeInstructionData(),
  // });

  // // instructions.push();

  // // tx.add(...instructions);
  // tx.add(instruction);
  // const ix = await program.rpc.publishArticle(articleId, reportAccount, {
  //   accounts: {
  //     publisherAccount: programID,
  //   },
  //   signers: [],
  // });
  // const txId = await sendAndConfirmTransaction(connection, tx, wallet);

  // switch (Number(args[0])) {
  // case 0: {
  //   tx.add(
  //     await CreateMintGovernance(
  //       user,
  //       user,
  //       new PublicKey(args[1])
  //     ),
  //   );

  //   break;
  // }

  // case 1: {
  //   if(args.length < 3) {
  //     throw new Error("Please provide nft mint address and containing token account address as arguments.");
  //   }
  //   tx.add(
  //     await MintCommunityTokenToNftHolder(
  //       user,
  //       new PublicKey(args[1]),
  //       new PublicKey(args[2]),
  //       new PublicKey(args[3])
  //     ),
  //   );

  //   break;
  // }

  // case 2: {
  //   if (args.length < 2) {
  //     throw new Error("Please provide amount to mint as argument.");
  //   }

  // sendTx = false;
  // const amount = Number(args[1]);

  // if (!isNaN(amount) || amount < 1) {

  //   // const buf = serializeInstructionToBase64(ix);

  //   // console.log(buf);
  //   // return buf;
  // } else {
  //   throw new Error("Invalid number passed as amount.");
  // }

  //   break;
  // }

  // case 4: {
  //   if(args.length < 3) {
  //     throw new Error("Please provide at least token name, symbol as arguments.");
  //   }

  //   tx.add(
  //     await CreateTokenWithMetadata(
  //       user, user,
  //       args[1], args[2],
  //       args[3], Number(args[4]),
  //       args[5] ? getLocalKeyypair(args[5]) : null,
  //     ),
  //   );

  //   break;
  // }

  // default: {
  //   throw new Error("No arguments provided.");
  // }
};
//   const mint = new PublicKey('FCrUzx3LzTB58UTew7tCkE7jry93x3Fv8TTPzUwzVNZU')
//   const fromAccount = await splToken.getOrCreateAssociatedTokenAccount(
//     connection,
//     wallet,
//     mint,
//     provider.wallet.publicKey
//   );
// if (sendTx) {

//   return txId;
// } else {
//   return null;
// }
