"use client";

import Benefits from "./Benefits";
import ButtonClaim from "./ButtonClaim";
import ProfileHeader from "./ProfileHeader";

const ArgiefyClub = () => {
  return (
    
      <div classname="space-y-4">
      <ProfileHeader/>
      <ButtonClaim />
      <div>Claim rewards section</div>

      <Benefits />
    </div>

  );
};

export default ArgiefyClub;
