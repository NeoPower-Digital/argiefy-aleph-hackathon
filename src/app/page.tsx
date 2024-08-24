'use client';

import { Button } from '@/components/ui/Button';
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
      }
    );

    return () => {
      MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
    };
  }, []);

  const verifyPayload: VerifyCommandInput = {
    action: 'argiefy-club-login', // This is your action ID from the Developer Portal
    verification_level: VerificationLevel.Device, // Orb | Device
  };

  const testVerification = () => {
    const payload = MiniKit.commands.verify(verifyPayload);
    setState(payload);
    return payload;
  };

  return (
    <main className=''>
      <h1>argiefy-club</h1>
      <Button className='' onClick={testVerification}>
        Verify World ID
      </Button>
      <p>{JSON.stringify(state)}</p>
    </main>
  );
}
