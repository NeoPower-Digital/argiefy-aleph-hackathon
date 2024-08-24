"use client";

import Benefits from "./Benefits";
import ButtonClaimMatecito from "./ButtonClaimMatecito";
import ProfileHeader from "./ProfileHeader";

const ArgiefyClub = () => {
  return (
    <div className="space-y-4">
      <ProfileHeader />

      <ButtonClaimMatecito />

      <Benefits />
    </div>
  );
};

export default ArgiefyClub;
