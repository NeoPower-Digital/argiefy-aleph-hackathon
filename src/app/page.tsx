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

  useEffect(() => {
    if (!MiniKit.isInstalled()) {
      return;
    }

    MiniKit.subscribe(ResponseEvent.MiniAppVerifyAction, async (response) => {
      //   if (payload.status === "error") {
      //   return console.log("Error payload", payload);
      // }

      console.log(response)

      // Verify the proof in the backend 
      const verifyResponse = await fetch("https://1eed-186-125-134-194.ngrok-free.app/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: response,
        })

      });
      console.log(verifyResponse);
    });

    return () => {
      // Clean up on unmount
      MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
    };
  }, []);

  // const onSuccess = () => { }
  // const handleVerify = () => { }

  const postData = async () => {
    const response = await fetch('https://1eed-186-125-134-194.ngrok-free.app/api/verify', {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: 'test' }),
    });
    console.log(response)
  }

  return (
    <main className="">
      <h1>argiefy-club</h1>
      {/* <IDKitWidget
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
      </IDKitWidget> */}

      <Button className="" onClick={postData}>hi</Button>
    </main>
  );
}
