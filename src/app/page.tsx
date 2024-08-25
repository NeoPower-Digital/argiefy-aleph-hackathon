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
  const [isMiniKit, setMiniKit] = useState<boolean>(false);
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

    if (!MiniKit.isInstalled()) {
      return;
    }

    setMiniKit(true);

    MiniKit.subscribe(
      ResponseEvent.MiniAppVerifyAction,
      handleMiniKitSubscription
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMiniKitSubscription = async (
    response: MiniAppVerifyActionPayload
  ) => {
    if (response.status === "error") {
      throw new Error(`Verification failed: ${JSON.stringify(response)}`);
    }

    // Verify the proof in the backend
    const verifyResponse = await verifyWithServer(
      response,
      IncognitoActions.ARGIEFY_CLUB_LOGIN
    );

    // TODO: Handle Success!
    const verifyResponseJson = await verifyResponse.json();
    if (verifyResponseJson.status === 200) {
      await getUserVerification();
    }
  };

  const verifyWithMiniKit = () => {
    MiniKit.commands.verify(loginDeviceVerifyPayload);
  };

  const onSuccessIdKit = (payload: ISuccessResult) => {
    getUserVerification();
  };

  return (
    <main className="max-w-2xl mx-auto">
      <ArgiefyClub
        isVerified={isUserVerified}
        handleClick={verifyWithMiniKit}
        isMiniKit={isMiniKit}
        onSuccessIdKit={onSuccessIdKit}
      />
    </main>
  );
}
