import { Inbox, Plane, Send } from "lucide-react";
import { Button } from "../ui/button";
import { FC, useMemo } from "react";

interface BalanceAndActionsProps {
  address: string;
  tokenBalances: TokenBalance[] | null;
}

const BalanceAndActions: FC<BalanceAndActionsProps> = ({
  address,
  tokenBalances,
}) => {
  const handleReceive = () => {
    navigator?.clipboard?.writeText(address);
  };

  const totalBalance = useMemo(
    () => tokenBalances?.reduce((acc, token) => acc + +token.amount, 0),
    [tokenBalances]
  );

  return (
    <div className="space-y-4 px-2">
      <div>
        <p className="text-muted-foreground text-lg">Your balance</p>
        <p className="text-3xl font-bold">${totalBalance}</p>
      </div>

      <div className="flex gap-4 w-full max-w-md">
        <Button className="w-48 gap-2" onClick={handleReceive}>
          <Inbox /> Receive
        </Button>
        <Button className="w-48 gap-2">
          <Send /> Send
        </Button>
      </div>
    </div>
  );
};

export default BalanceAndActions;
