"use client";

import { FC } from "react";
import Benefits from "./Benefits";
import ButtonClaim from "./ButtonClaim";
import ProfileHeader from "./ProfileHeader";
import { ISuccessResult } from "@worldcoin/minikit-js";

interface ArgiefyClubProps {
  isVerified: boolean;
  handleClick: () => void;
  isMiniKit: boolean;
  onSuccessIdKit: (payload: ISuccessResult) => void;
}

const ArgiefyClub: FC<ArgiefyClubProps> = ({ isVerified, handleClick, isMiniKit, onSuccessIdKit }) => {
  return (
    <>
      <div className="space-y-4">
        <ProfileHeader />
        <ButtonClaim isVerified={isVerified} handleClick={handleClick} isMiniKit={isMiniKit} onSuccessIdKit={onSuccessIdKit} />
        <div>Claim rewards section</div>

        <Benefits />
      </div>
    </>
  );
};

export default ArgiefyClub;
