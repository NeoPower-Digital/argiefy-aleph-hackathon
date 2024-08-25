"use client";

import { FC, useEffect, useState } from "react";
import Benefits from "./Benefits";
import ButtonClaim from "./ButtonClaim";
import ProfileHeader from "./ProfileHeader";
import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
  MiniKit,
  ResponseEvent,
} from "@worldcoin/minikit-js";
import {
  IncognitoActions,
  loginDeviceVerifyPayload,
  verifyWithServer,
} from "@/lib/utils/worldcoin";

interface ArgiefyClubProps {
  isVerified: boolean;
  onSuccessIdKit: (payload: ISuccessResult) => void;
  getUserVerification: () => void;
}

const ArgiefyClub: FC<ArgiefyClubProps> = ({
  isVerified,
  onSuccessIdKit,
  getUserVerification,
}) => {
  const [isMiniKit, setMiniKit] = useState<boolean>(false);

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

  useEffect(() => {
    if (!MiniKit.isInstalled(true)) {
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
  }, []);

  return (
    <>
      <div className="space-y-4">
        <ProfileHeader />

        <ButtonClaim
          isVerified={isVerified}
          handleClick={verifyWithMiniKit}
          isMiniKit={isMiniKit}
          onSuccessIdKit={onSuccessIdKit}
        />

        <Benefits />
      </div>
    </>
  );
};

export default ArgiefyClub;
