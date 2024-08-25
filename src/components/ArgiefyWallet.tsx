"use client";

import {
  checkWalletStatus,
  getSessionToken,
} from "@/lib/actions/programmableWallet";
import { useEffect, useState } from "react";
import CreateNewUser from "./ArgiefyWallet/CreateNewUser";
import WalletContainer from "./ArgiefyWallet/WalletContainer";

const userId = "sadfyas72318";

const ArgiefyWallet = () => {
  const [sessionToken, setSessionToken] = useState("");
  const [wallet, setWallet] = useState<CircleWallet | null>(null);

  const handleUserExists = async () => {
    const response = (await checkWalletStatus(userId)) as {
      data: { wallets: CircleWallet[] };
    };

    console.log(response);

    setWallet(response.data.wallets[0]);
  };

  useEffect(() => {
    getSessionToken(userId)
      .then(async ({ data }: { data: { userToken: string } }) => {
        setSessionToken(data.userToken);

        if (data.userToken) {
          handleUserExists();
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {!sessionToken && !wallet && (
        <CreateNewUser userId={userId} onChallengeResolved={handleUserExists} />
      )}

      {wallet && <WalletContainer wallet={wallet} />}
    </>
  );
};

export default ArgiefyWallet;
