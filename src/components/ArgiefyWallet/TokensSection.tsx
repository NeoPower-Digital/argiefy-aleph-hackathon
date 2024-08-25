import { Coins } from "lucide-react";
import { Separator } from "../ui/separator";

const TokensSection = () => {
  return (
    <div className="space-y-2">
      <div>
        <p className="text-lg text-muted-foreground font-semibold">Tokens</p>

        <Separator />
      </div>

      <div className="flex gap-4">
        <div className="rounded-full border p-2 ">
          <Coins size={32} />
        </div>

        <div className="flex-1 text-left">
          <p className="text-lg font-bold">USDC</p>
          <p className="text-muted-foreground">250.36 USDC</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold">
            $300 <span className="text-muted-foreground">.24</span>
          </p>
          <p className="text-muted-foreground">($1.00)</p>
        </div>
      </div>
    </div>
  );
};

export default TokensSection;
