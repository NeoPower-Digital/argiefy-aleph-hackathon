import React, { FC, HTMLAttributes, ReactElement } from "react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/Button";

export interface SectionHeaderProps {
  title: ReactElement;
  titleIcon: ReactElement;
  ctaTitle?: string;
  ctaIcon?: ReactElement;
  onCtaClick?: () => void;
  hideSeparator?: boolean;
}

const SectionHeader: FC<SectionHeaderProps> = ({
  title,
  titleIcon,
  ctaTitle,
  ctaIcon,
  onCtaClick,
  hideSeparator,
}) => {
  return (
    <div className="space-y-2">
      {hideSeparator ? <></> : <Separator />}

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          {titleIcon} {title}
        </div>

        {ctaTitle || ctaIcon ? (
          <Button
            variant="ghost"
            className="text-muted-foreground flex gap-2 items-center p-0 hover:bg-transparent"
            onClick={onCtaClick}
          >
            {ctaTitle} {ctaIcon}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const HomeSectionHeader = React.forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> &
  Omit<SectionHeaderProps, "title"> & { title: string }
>(({ title, titleIcon, ...props }) => (
  <SectionHeader
    title={<p className="text-md text-muted">{title}</p>}
    titleIcon={<div className="text-muted-foreground">{titleIcon}</div>}
    {...props}
  />
));

export { HomeSectionHeader, SectionHeader };
