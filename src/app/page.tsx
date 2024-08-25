'use client';

import { Button } from '@/components/ui/Button';
import {
  handleVerifyIdKit,
  loginDeviceVerifyPayload,
  worldcoinAppId,
  IncognitoActions,
  activeUserId,
  verifyWithServer,
} from '@/lib/utils/worldcoin';
import useSupabase from '@/lib/hooks/useSupabase';
import { IDKitWidget } from '@worldcoin/idkit';
import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
  MiniKit,
  ResponseEvent,
  VerificationLevel,
} from '@worldcoin/minikit-js';
import { useEffect, useState } from 'react';

export default function Home() {
  console.log('MiniKit installed: ', MiniKit.isInstalled());
  const [state, setState] = useState<{
    user: any;
    worldcoin: any;
    message?: string;
  }>({
    user: null,
    worldcoin: null,
  });

  useEffect(() => {
    getCurrentUser();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getUser } = useSupabase();

  const getCurrentUser = async () => {
    const currentUser = await getUser(activeUserId);
    setState({ ...state, user: currentUser?.length ? currentUser[0] : null });
  };

  const handleMiniKitSubscription = async (
    response: MiniAppVerifyActionPayload
  ) => {
    if (response.status === 'error') {
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
      setState({
        ...state,
        user: verifyResponseJson.user,
        message: 'Verified!',
      });
    }
  };

  const verifyWithMiniKit = () => {
    const payload = MiniKit.commands.verify(loginDeviceVerifyPayload);
    setState({ ...state, worldcoin: payload });
    return payload;
  };

  const onSuccessIdKit = (payload: ISuccessResult) => {
    const user = getCurrentUser();
    setState({ ...state, user, worldcoin: payload });
  };

  return (
    <main className=''>
      <h1>Welcome to Argiefy Club!</h1>

      <Button className='' onClick={verifyWithMiniKit}>
        Verify with MiniKit
      </Button>

      <p>{JSON.stringify(state)}</p>

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
    </main>
  );
}
