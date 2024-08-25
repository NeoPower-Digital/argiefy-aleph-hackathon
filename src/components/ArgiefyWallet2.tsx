"use client";

import {
  checkWalletStatus,
  createNewUser,
  getSessionToken,
  getWalletBalance,
  initializeUserAccount,
} from "@/lib/actions/programmableWallet";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { W3SSdk } from "@circle-fin/w3s-pw-web-sdk";
import { Separator } from "./ui/separator";

const ArgiefyWallet = () => {
  const [userToken, setUserToken] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [challengeId, setChallengeId] = useState("");
  const [sdk, setSdk] = useState<W3SSdk | undefined>(undefined);

  const [walletId, setWalletId] = useState("");
  const [walletBalance, setWalletBalance] = useState<any>(null);

  const userId = "argie12oi32u198uwdfy";
  const appId = "282b5b14-dd49-53d3-b53c-e5e321c2a047";

  const getBalance = async () => {
    if (walletId === "noWallet") return;

    const walletBalanceResponse: { data: { tokenBalances: any[] } } =
      await getWalletBalance(walletId);

    setWalletBalance(walletBalanceResponse);
    console.log(walletBalanceResponse);
  };

  const resolveChallenge = () => {
    sdk!.execute(challengeId, (error, result) => {
      if (error) {
        return;
      }

      console.log(result);
    });
  };

  useEffect(() => {
    if (!encryptionKey || !userToken || sdk) return;

    const newSdk = new W3SSdk(
      {
        appSettings: { appId },
        authentication: {
          userToken,
          encryptionKey,
        },
      },
      (error, result) => {
        if (error) {
          return;
        }

        console.log(result);
      }
    );

    setSdk(newSdk);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [encryptionKey, userToken]);

  useEffect(() => {
    if (walletId === "noWallet") return;

    const asyncFunction = async () => {
      const walletStatusResponse: { data: { wallets: { id: string }[] } } =
        await checkWalletStatus(userId);

      console.log(walletStatusResponse);

      setWalletId(walletStatusResponse?.data?.wallets[0].id || "noWallet");
    };

    asyncFunction();
  }, []);

  return (
    <div className="flex flex-col gap-4 pt-4">
      {walletId === "noWallet" && (
        <>
          {!(encryptionKey || userToken) && (
            <Button onClick={() => createNewUser(userId)}>
              Create new user
            </Button>
          )}
          <Button
            onClick={async () => {
              const response: {
                data: { encryptionKey: string; userToken: string };
              } = await getSessionToken(userId);
              setEncryptionKey(response.data.encryptionKey);
              setUserToken(response.data.userToken);
            }}
          >
            Acquire Session Token
          </Button>
          <Button
            onClick={async () => {
              const response: { data: { challengeId: string } } =
                await initializeUserAccount(userToken);
              setChallengeId(response.data.challengeId);
            }}
          >
            Initialize User Account
          </Button>
          {sdk && <Button onClick={resolveChallenge}>Resolve Challenge</Button>}

          <p className="text-2xl font-bold">User Token: {userToken}</p>
          <p className="text-2xl font-bold">Encryption Key: {encryptionKey}</p>
          <p className="text-2xl font-bold">Challenge ID: {challengeId}</p>

          <Separator />
        </>
      )}
      {walletId != "noWallet" && (
        <>
          <p className="text-3xl font-bold">Wallet Id {walletId}</p>

          <Button onClick={getBalance}>Get Balance</Button>
          <p className="text-2xl font-bold">
            Wallet Balance {JSON.stringify(walletBalance)}
          </p>
        </>
      )}
    </div>
  );
};

export default ArgiefyWallet;
