"use client";

import ArgiefyClub from "@/components/ArgiefyClub";
import useSupabase from "@/lib/hooks/useSupabase";
import {
  IncognitoActions,
  loginDeviceVerifyPayload,
  verifyWithServer,
} from "@/lib/utils/worldcoin";
import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
  MiniKit,
  ResponseEvent,
} from "@worldcoin/minikit-js";
import { useEffect, useState } from "react";

export default function Home() {
  console.log("MiniKit installed: ", MiniKit.isInstalled());
  const [isUserVerified, setIsUserVerified] = useState<boolean>(false);

  const { getUser } = useSupabase();

  const getUserVerification = async () => {
    const user = await getUser("221b6a90-e61f-4ffc-b8fd-93ac192eb6bc");

    if (!user) return;

    const isVerified = user[0].world_id_verified;
    setIsUserVerified(isVerified);
  };

  useEffect(() => {
    getUserVerification();
  }, []);

  const onSuccessIdKit = (payload: ISuccessResult) => {
    getUserVerification();
  };

  return (
    <main className="max-w-2xl mx-auto">
      Minikit {MiniKit?.isInstalled() ? "is" : "is not"} installed
      <ArgiefyClub
        isVerified={isUserVerified}
        getUserVerification={getUserVerification}
        onSuccessIdKit={onSuccessIdKit}
      />
    </main>
  );
}
