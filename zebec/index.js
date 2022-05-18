import {
    getProvider,
    depositNativeToken,
    initNativeTransaction,
    withdrawNativeTransaction,
    cancelNativeTransaction,
    pauseNativeTransaction,
    resumeNativeTransaction,
    withdrawNativeTokenDeposit,
  } from "zebecprotocol-sdk";

    getProvider(); // This will connect user's wallet to phantom //For more info visit https://docs.phantom.app/

    //Deposit Native Token
    const depositTransac = async () => {
        const data = {
          sender: "J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9", // wallet public key
          amount: 1,
        };

        const response = await depositNativeToken(data);
      };

    //Initialize Native Token
    const sendTransac = async () => {
        const data = {
          sender: "J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9",
          receiver: "FuEm7UMaCYHThzKaf9DcJ7MdM4t4SALfeNnYQq46foVv",
          amount: 1,
          start_time: 1637182627, // epoch time stamp (unix)  Math.floor(Date.now()/1000)
          end_time: 1637192627,
        };
        const response = await initNativeTransaction(data);
        console.log(response); // pda should be saved.
      };

    //Pause Native Token
    const pauseTransac = async () => {
        const data = {
          sender: "J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9",
          receiver: "FuEm7UMaCYHThzKaf9DcJ7MdM4t4SALfeNnYQq46foVv",
          pda: "3AicfRtVVXzkjU5L3yarWt2oMWSS32jfkPeeK5Hh9Hyz", // use saved pda returned from initNativeTransaction()
        };
        const response = await pauseNativeTransaction(data);
      };

    //Resume Native Token or streaming payment
    const resumeTransac = async () => {
        const data = {
          sender: "J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9",
          receiver: "FuEm7UMaCYHThzKaf9DcJ7MdM4t4SALfeNnYQq46foVv",
          pda: "3AicfRtVVXzkjU5L3yarWt2oMWSS32jfkPeeK5Hh9Hyz",
        };
        const response = await resumeNativeTransaction(data);
      };

    //Cancel Transaction
    const cancelTransac = async () => {
        const data = {
          sender: "J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9",
          receiver: "FuEm7UMaCYHThzKaf9DcJ7MdM4t4SALfeNnYQq46foVv",
          pda: "3AicfRtVVXzkjU5L3yarWt2oMWSS32jfkPeeK5Hh9Hyz",
        };

        const response = await cancelNativeTransaction(data);
      };

    //Withdraw Native Token or streaming payment
    const withTransac = async () => {
        const data = {
          sender: "J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9",
          receiver: "FuEm7UMaCYHThzKaf9DcJ7MdM4t4SALfeNnYQq46foVv",
          pda: "3AicfRtVVXzkjU5L3yarWt2oMWSS32jfkPeeK5Hh9Hyz",
          amount: 0.5,
        };
        const response = await withdrawNativeTransaction(data);
      };

      //Withdraw Native Token Deposit
      const nativeWithdraw = async () => {
        const data = {
          sender: "J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9", //wallet public key
          amount: 1,
        };
        const response = await withdrawNativeTokenDeposit(data);
      };

