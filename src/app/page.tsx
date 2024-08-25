"use client";

import {
  handleVerifyIdKit,
  handleMiniKitSubscription,
} from "@/lib/utils/worldcoin";
import useSupabase from "@/lib/hooks/useSupabase";
import { IDKitWidget } from "@worldcoin/idkit";
import {
  ISuccessResult,
  MiniKit,
  ResponseEvent,
  VerificationLevel,
  VerifyCommandInput,
} from "@worldcoin/minikit-js";
import { useEffect, useState } from "react";
import ArgiefyClub from "@/components/ArgiefyClub";
import { Button } from "@/components/ui/button";

const worldcoinAppId = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`;
const IncognitoActions = {
  ARGIEFY_CLUB_LOGIN:
    process.env.NEXT_PUBLIC_WORLDCOIN_LOGIN_ACTION_NAME || "argiefy-club-login",
};
const loginDeviceVerifyPayload: VerifyCommandInput = {
  action: IncognitoActions.ARGIEFY_CLUB_LOGIN, // This is your action ID from the Developer Portal
  verification_level: VerificationLevel.Device, // Orb | Device
};

export default function Home() {
  const [payload, setPayload] = useState({});
  const [isMiniKit, setMiniKit] = useState<boolean>(false)
  const [isUserVerified, setUserVerified] = useState<boolean>(false);

  const { getUser } = useSupabase();

  const userIsVerified = async () => {
    const user = await getUser("221b6a90-e61f-4ffc-b8fd-93ac192eb6bc");

    if (!user) return;

    const isVerified = user[0].world_id_verified
    setUserVerified(isVerified)
  };

  useEffect(() => {
    userIsVerified();

    if (!MiniKit.isInstalled()) {
      return
    };

    setMiniKit(true)

    MiniKit.subscribe(
      ResponseEvent.MiniAppVerifyAction,
      handleMiniKitSubscription
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyWithMiniKit = () => {
    const payload = MiniKit.commands.verify(loginDeviceVerifyPayload);
    setPayload(payload);
    return payload;
  };

  const onSuccessIdKit = (payload: ISuccessResult) => {
    setPayload(payload);
  };

  return (
    <main className="max-w-2xl mx-auto">
      <h1>Welcome to Argiefy Club!</h1>

      {/* <Button className="" onClick={verifyWithMiniKit}>
        Verify with MiniKit
      </Button> */}

      {/* <p>{JSON.stringify(payload)}</p> */}

      {/* <Button className='' onClick={verifyWithMiniKit} asChild>
        <IDKitWidget
          app_id={worldcoinAppId} // obtained from the Developer Portal
          action={IncognitoActions.ARGIEFY_CLUB_LOGIN} // obtained from the Developer Portal
          onSuccess={onSuccessIdKit} // callback when the modal is closed
          handleVerify={handleVerifyIdKit} // callback when the proof is received
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) => (
            // This is the button that will open the IDKit modal
            <Button onClick={open}>Verify with IDKit</Button>
          )}
        </IDKitWidget>
      </Button> */}
      <ArgiefyClub isVerified={isUserVerified} handleClick={verifyWithMiniKit} isMiniKit={isMiniKit} onSuccessIdKit={onSuccessIdKit} />
    </main>
  );
}
