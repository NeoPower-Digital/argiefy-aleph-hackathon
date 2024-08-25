import { FC, useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import BalanceAndActions from "./BalanceAndActions";
import { Separator } from "../ui/separator";
import TokensSection from "./TokensSection";
import { getWalletBalance } from "@/lib/actions/programmableWallet";

interface WalletContainerProps {
  wallet: CircleWallet;
}

const WalletContainer: FC<WalletContainerProps> = ({ wallet }) => {
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[] | null>(
    null
  );

  useEffect(() => {
    const asyncFunction = async () => {
      const walletBalanceResponse: { data: { tokenBalances: TokenBalance[] } } =
        await getWalletBalance(wallet.id);

      console.log(walletBalanceResponse);

      setTokenBalances(walletBalanceResponse.data.tokenBalances);
    };

    asyncFunction();
  }, [wallet.id]);

  return (
    <div className="mt-4 space-y-4">
      <ProfileCard />

      <Separator />

      <BalanceAndActions address={wallet.address} />

      {tokenBalances && <TokensSection tokenBalances={tokenBalances} />}
    </div>
  );
};

export default WalletContainer;
