"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Matecito from "../../public/matecito.svg";
import FingerPrint from "../../public/fingerPrint.svg";
import { Button } from "./ui/button";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import { handleVerifyIdKit } from "@/lib/utils/worldcoin";
import ResponsiveDialog from "./ui/ResponsiveDialog";

interface ButtonClaimProps {
  isVerified: boolean;
  handleClick: () => void;
  isMiniKit: boolean;
  onSuccessIdKit: (payload: ISuccessResult) => void;
}

const worldcoinAppId = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`;

const IncognitoActions = {
  ARGIEFY_CLUB_LOGIN:
    process.env.NEXT_PUBLIC_WORLDCOIN_LOGIN_ACTION_NAME || "argiefy-club-login",
};

const ButtonClaim: FC<ButtonClaimProps> = ({
  isVerified,
  handleClick,
  isMiniKit,
  onSuccessIdKit,
}) => {
  {
    if (!isMiniKit)
      return isVerified ? (
        <ResponsiveDialog
          title="Claim Daily Matecito"
          closeButtonLabel=""
          trigger={
            <Button className="w-full max-w-md p-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors">
              <div className="flex items-center justify-center space-x-2">
                <Image
                  width={20}
                  height={20}
                  src={Matecito}
                  alt="Matecito Icon"
                />
                <div className="text-lg font-medium">Claim Daily Matecito</div>
              </div>
            </Button>
          }
        >
          Here's your Matecito!
        </ResponsiveDialog>
      ) : (
        <IDKitWidget
          app_id={worldcoinAppId} // obtained from the Developer Portal
          action={IncognitoActions.ARGIEFY_CLUB_LOGIN} // obtained from the Developer Portal
          onSuccess={onSuccessIdKit} // callback when the modal is closed
          handleVerify={handleVerifyIdKit} // callback when the proof is received
          verification_level={VerificationLevel.Orb}
        >
          {({ open }) => (
            <>
              <Button
                className="w-full max-w-md mt-4 p-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors"
                onClick={open}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Image
                    width={20}
                    height={20}
                    src={FingerPrint}
                    alt="Fingerprint Icon"
                  />
                  <div className="text-lg font-medium">Verify Identity</div>
                </div>
              </Button>
            </>
          )}
        </IDKitWidget>
      );
  }

  return (
    <Button
      className="w-full max-w-md mt-4 p-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors"
      onClick={handleClick}
    >
      {isVerified ? (
        <div className="flex items-center justify-center space-x-2">
          <Image width={20} height={20} src={Matecito} alt="Matecito Icon" />
          <div className="text-lg font-medium">Claim Daily Matecito</div>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Image
            width={20}
            height={20}
            src={FingerPrint}
            alt="Fingerprint Icon"
          />
          <div className="text-lg font-medium">Verify Identity</div>
        </div>
      )}
    </Button>
  );
};

export default ButtonClaim;
