'use client';

import { Button } from "@/components/ui/Button";
import { IDKitWidget } from "@worldcoin/idkit";
import { MiniKit, ResponseEvent, VerificationLevel, VerifyCommandInput } from "@worldcoin/minikit-js";
import { useEffect } from "react";


export default function Home() {

  const verifyPayload: VerifyCommandInput = {
    action: "profile-human-validation",
    verification_level: VerificationLevel.Device,
  };


  const payload = MiniKit.commands.verify(verifyPayload);

  console.log(payload);


  const onSuccess = () => { }
  const handleVerify = () => { }

  const postData = async () => {
    const response = await fetch('https://1eed-186-125-134-194.ngrok-free.app/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: 'test' }),
    })
    console.log(response)
  }

  return (
    <main className="">
      <h1>argiefy-club</h1>
      <IDKitWidget
        app_id="app_39c0671f96ddf3ab0fd057fba96180ec" // obtained from the Developer Portal
        action="profile-human-validation" // obtained from the Developer Portal
        onSuccess={onSuccess} // callback when the modal is closed
        handleVerify={handleVerify} // callback when the proof is received
        verification_level={VerificationLevel.Device}
      >
        {({ open }) =>
          // This is the button that will open the IDKit modal
          <button onClick={open}>Verify with World ID</button>
        }
      </IDKitWidget>

      <Button className="" onClick={postData}>hi</Button>
    </main>
  );
}
