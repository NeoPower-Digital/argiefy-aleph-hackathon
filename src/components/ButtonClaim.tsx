"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Matecito from "../../public/matecito.svg";
import FingerPrint from "../../public/fingerPrint.svg";

export default function Component() {
  const [isVerified, setIsVerified] = useState(false);

  const handleClick = () => {
    // TO DO: Verificacion con World ID 
    setIsVerified(true);
  };

  return (
    <Button
      className="w-full max-w-md mt-4 p-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center justify-center transition-colors"
      onClick={handleClick}
    >
      {isVerified ? (
        <div className="flex items-center justify-center space-x-2">
          <Image
            width={20}
            height={20}
            src={Matecito}
            alt="Matecito Icon"
          />
          <div className="text-lg font-medium">Claim Daily Matecito</div>
        </div>
      ) : (
        <div className="flex items-center justify-center space-x-2">
          <Image width={20} height={20} src={FingerPrint} alt="Fingerprint Icon" />
          <div className="text-lg font-medium">Verify Identity</div>
        </div>
      )}
    </Button>
  );
}
