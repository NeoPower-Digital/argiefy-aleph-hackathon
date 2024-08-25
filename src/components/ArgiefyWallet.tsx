"use client";

import {
  checkWalletStatus,
  getSessionToken,
} from "@/lib/actions/programmableWallet";
import { useEffect, useState } from "react";
import CreateNewUser from "./ArgiefyWallet/CreateNewUser";
import WalletContainer from "./ArgiefyWallet/WalletContainer";
import { LoaderCircle } from "lucide-react";

const userId = "TestArgiefy";

const ArgiefyWallet = () => {
  const [sessionToken, setSessionToken] = useState("");
  const [wallet, setWallet] = useState<CircleWallet | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUserExists = async () => {
    setIsLoading(true);
    console.log("user exists");

    const response = (await checkWalletStatus(userId)) as {
      data: { wallets: CircleWallet[] };
    };

    console.log(response);

    setWallet(response.data.wallets[0]);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getSessionToken(userId)
      .then(async ({ data }: { data: { userToken: string } }) => {
        setIsLoading(false);
        setSessionToken(data?.userToken);

        if (data?.userToken) {
          handleUserExists();
        }
      })
      .catch((error) => {
        console.error(error);

        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      ) : (
        <>
          {!sessionToken && !wallet && (
            <CreateNewUser
              userId={userId}
              onChallengeResolved={handleUserExists}
            />
          )}

          {wallet && <WalletContainer wallet={wallet} />}
        </>
      )}
    </>
  );
};

export default ArgiefyWallet;
