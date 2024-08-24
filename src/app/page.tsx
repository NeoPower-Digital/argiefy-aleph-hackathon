"use client";

import { Button } from "@/components/ui/Button";
import { IDKitWidget } from "@worldcoin/idkit";
import {
  MiniKit,
  ResponseEvent,
  VerificationLevel,
  VerifyCommandInput,
} from "@worldcoin/minikit-js";
import { useEffect } from "react";

export default function Home() {
  const verify = () => {
    const verifyPayload: VerifyCommandInput = {
      action: "profile-human-validation",
      verification_level: VerificationLevel.Device,
    };

    MiniKit.commands.verify(verifyPayload);
  };

  // useEffect(() => {
  //   if (!MiniKit.isInstalled()) {
  //     return;
  //   }

  //   MiniKit.subscribe(ResponseEvent.MiniAppVerifyAction, async (response) => {
  //     if (response.status === "error") {
  //       return console.log("Error payload", response);
  //     }

  //     // Verify the proof in the API
  //     await fetch("/api/verify", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         payload: response,
  //       }),
  //     });
  //   });

  //   return () => {
  //     // Clean up on unmount
  //     MiniKit.unsubscribe(ResponseEvent.MiniAppVerifyAction);
  //   };
  // }, []);

  return (
    <main>
      <h1>argiefy-club</h1>

      <Button className="" onClick={verify}>
        Verify
      </Button>
    </main>
  );
}
