import { Coins } from "lucide-react";
import { Separator } from "../ui/separator";
import { FC } from "react";

interface TokensSectionProps {
  tokenBalances: TokenBalance[];
}

const TokensSection: FC<TokensSectionProps> = ({ tokenBalances }) => {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-lg text-muted-foreground font-semibold">Tokens</p>

        <Separator />
      </div>

      {tokenBalances.map((tokenBalance, index) => (
        <div className="flex gap-4" key={index}>
          <div className="rounded-full border p-2 ">
            <Coins size={32} />
          </div>

          <div className="flex-1 text-left">
            <p className="text-lg font-bold">{tokenBalance.token.symbol}</p>
            <p className="text-muted-foreground">
              {tokenBalance.amount} {tokenBalance.token.symbol}
            </p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold">
              ${tokenBalance.amount}
              {/* <span className="text-muted-foreground">.24</span> */}
            </p>
            <p className="text-muted-foreground">($1.00)</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokensSection;
