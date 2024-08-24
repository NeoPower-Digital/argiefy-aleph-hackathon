'use client';

import { Button } from '@/components/ui/Button';
import {
  handleVerifyIdKit,
  handleMiniKitSubscription,
} from '@/lib/utils/worldcoin';
import { IDKitWidget } from '@worldcoin/idkit';
import {
  ISuccessResult,
  MiniKit,
  ResponseEvent,
  VerificationLevel,
  VerifyCommandInput,
} from '@worldcoin/minikit-js';
import { useEffect, useState } from 'react';

const worldcoinAppId = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`;
const IncognitoActions = {
  ARGIEFY_CLUB_LOGIN:
    process.env.NEXT_PUBLIC_WORLDCOIN_LOGIN_ACTION_NAME || 'argiefy-club-login',
};
const loginDeviceVerifyPayload: VerifyCommandInput = {
  action: IncognitoActions.ARGIEFY_CLUB_LOGIN, // This is your action ID from the Developer Portal
  verification_level: VerificationLevel.Device, // Orb | Device
};

export default function Home() {
  console.log('MiniKit installed: ', MiniKit.isInstalled());
  const [state, setState] = useState({});

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }
    MiniKit.subscribe(
      ResponseEvent.MiniAppVerifyAction,
      handleMiniKitSubscription
    );
    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
    };
  }, []);

  const verifyWithMiniKit = () => {
    const payload = MiniKit.commands.verify(loginDeviceVerifyPayload);
    setState(payload);
    return payload;
  };

  const onSuccessIdKit = (payload: ISuccessResult) => {
    setState(payload);
  };

  return (
    <main className=''>
      <h1>Welcome to Argiefy Club!</h1>

      <Button className='' onClick={verifyWithMiniKit}>
        Verify with MiniKit
      </Button>

      <p>{JSON.stringify(state)}</p>

      <Button className='' onClick={verifyWithMiniKit}>
        <IDKitWidget
          app_id={worldcoinAppId} // obtained from the Developer Portal
          action={IncognitoActions.ARGIEFY_CLUB_LOGIN} // obtained from the Developer Portal
          onSuccess={onSuccessIdKit} // callback when the modal is closed
          handleVerify={handleVerifyIdKit} // callback when the proof is received
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) => (
            // This is the button that will open the IDKit modal
            <button onClick={open}>Verify with IDKit</button>
          )}
        </IDKitWidget>
      </Button>
    </main>
  );
}
