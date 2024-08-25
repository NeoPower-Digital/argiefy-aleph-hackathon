import { FC } from "react";
import ProfileCard from "./ProfileCard";
import BalanceAndActions from "./BalanceAndActions";
import { Separator } from "../ui/separator";
import TokensSection from "./TokensSection";

const WalletContainer: FC = () => {
  return (
    <div className="mt-4 space-y-4">
      <ProfileCard />

      <Separator />

      <BalanceAndActions />

      <TokensSection />
    </div>
  );
};

export default WalletContainer;
