import { cn } from "@/lib/utils";
import { ChevronRight, Tag } from "lucide-react";
import { FC } from "react";
import ResponsiveDialog from "./ui/ResponsiveDialog";

interface BenefitCardProps {
  title: string;
  description: string;
  icon?: React.ReactElement;
  bgColor: string;
}

const BenefitCard: FC<BenefitCardProps> = ({
  title,
  description,
  icon,
  bgColor,
}) => {
  return (
    <ResponsiveDialog
      title={`${title} benefit Details`}
      closeButtonLabel="Close"
      trigger={
        <div className="flex gap-2 items-center">
          <div
            className={cn("rounded-full border p-3")}
            style={{ backgroundColor: bgColor }}
          >
            <Tag className="text-muted-foreground" size={24} />
          </div>

          <div className="flex-1 flex flex-col text-left">
            <p className="text-muted-foreground">{title}</p>
            <p className="text-xl font-bold">{description}</p>
          </div>

          <ChevronRight />
        </div>
      }
    />
  );
};

export default BenefitCard;
