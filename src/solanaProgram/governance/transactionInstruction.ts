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
  let finalInstructions = {
    initializeInstruction: "",
    publishArticleInstruction: "",
  };
  const provider = await getProvider(wallet);
  const connection = new Connection("https://api.devnet.solana.com");
  //   const user = getLocalKeyypair(process.env.SOLANA_WALLET_FILEPATH);

  const programID = new web3.PublicKey(
    "xpqf8AFoskZT2AfYUdSjvWRn2niqEcvTS1wrKQpuBia"
  );
  const { SystemProgram, Keypair } = web3;

  const mint = new PublicKey("DWj1Tkqxp5tKf1aNT2Ci3axh7A89YwT6hDLJZJKvrJc");

  const program = new Program(idl, programID, provider);

  let programAuthority;
  let programAuthorityBump;

  const [_programAuthority, _programAuthorityBump] =
    await web3.PublicKey.findProgramAddress(
      [Buffer.from("author"), wallet.publicKey.toBuffer()],
      program.programId
    );
  programAuthority = _programAuthority;
  programAuthorityBump = _programAuthorityBump;

  const publisherAccount = Keypair.generate();
  try {
    /* Initialize account for article for first time, interact with the program via rpc */

    const initializeInstruction = await program.instruction.initialize(
      programAuthorityBump,
      {
        accounts: {
          publisherAccount: programAuthority,
          author: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [],
      }
    );

    let serialized = serializeInstructionToBase64(initializeInstruction);

    console.log("Serialized instruction is  :", serialized.toString());
    finalInstructions.initializeInstruction = serialized;
  } catch (err) {
    console.log("Transaction error: ", err);
  }

  try {
    const publishArticleInstruction = await program.instruction.publishArticle(
      // programAuthorityBump,
      articleId,
      wallet.publicKey,
      {
        accounts: {
          publisherAccount: programAuthority,
          // author: wallet.publicKey,
          // systemProgram: SystemProgram.programId,
        },
        signers: [],
      }
    );
    let serialized = serializeInstructionToBase64(publishArticleInstruction);
    finalInstructions.publishArticleInstruction = serialized;

    console.log("publishArticle Instruction serialized: ", serialized);
    return finalInstructions;
  } catch (err) {
    console.log("Publish article error", err);
  }
};
