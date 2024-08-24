'use client';

import { Button } from '@/components/ui/Button';
import { IDKitWidget } from '@worldcoin/idkit';
import {
  ISuccessResult,
  MiniAppVerifyActionPayload,
  MiniKit,
  ResponseEvent,
  VerificationLevel,
  VerifyCommandInput,
} from '@worldcoin/minikit-js';
import { useEffect, useState } from 'react';

export default function Home() {
  console.log('MiniKit installed: ', MiniKit.isInstalled());
  const [state, setState] = useState({});
  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(
      ResponseEvent.MiniAppVerifyAction,
      async (response: MiniAppVerifyActionPayload) => {
        if (response.status === 'error') {
          return console.log('Error payload', response);
        }

        // Verify the proof in the backend
        const verifyResponse = await postData(response);

        // TODO: Handle Success!
        const verifyResponseJson = await verifyResponse.json();
        if (verifyResponseJson.status === 200) {
          console.log('Verification success!', verifyResponseJson);
        }
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
    };
  }, []);

  const postData = async (response: ISuccessResult) => {
    return await fetch(
      'https://1eed-186-125-134-194.ngrok-free.app/api/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: response as ISuccessResult,
          action: 'argiefy-club-login',
        }),
      }
    );
  };

  const handleVerify = async (response: MiniAppVerifyActionPayload) => {
    if (response.status === 'error') {
      return console.log('Error payload', response);
    }

    // Verify the proof in the backend
    const verifyResponse = await fetch(
      'https://1eed-186-125-134-194.ngrok-free.app/api/verify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload: response as ISuccessResult,
          action: 'argiefy-club-login',
        }),
      }
    );

    // TODO: Handle Success!
    const verifyResponseJson = await verifyResponse.json();
    if (verifyResponseJson.status === 200) {
      console.log('Verification success!', verifyResponseJson);
    }
  };

  const verifyPayload: VerifyCommandInput = {
    action: 'argiefy-club-login', // This is your action ID from the Developer Portal
    verification_level: VerificationLevel.Device, // Orb | Device
  };

  const testVerification = () => {
    const payload = MiniKit.commands.verify(verifyPayload);
    setState(payload);
    return payload;
  };

  const onSuccessIdKit = (payload: ISuccessResult) => {
    setState(payload);
  };
  const handleVerifyIdKit = async (proof: ISuccessResult) => {
    const res = await postData(proof);
    if (!res.ok) {
      throw new Error('Verification failed.'); // IDKit will display the error message to the user in the modal
    }
  };

  return (
    <main className=''>
      <h1>argiefy-club</h1>
      <Button className='' onClick={testVerification}>
        Verify with MiniKit
      </Button>
      <p>{JSON.stringify(state)}</p>
      <Button className='' onClick={testVerification}>
        <IDKitWidget
          app_id='app_d63a157f74ec9f310c77572e2a55edb0' // obtained from the Developer Portal
          action='argiefy-club-login' // obtained from the Developer Portal
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
