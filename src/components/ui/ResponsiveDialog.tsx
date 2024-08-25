"use client";

import * as React from "react";

import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { useMediaQuery } from "@/lib/helpers/useMediaQuery";
import { Button } from "./button";

interface ResponsiveDialogProps {
  title: string;
  description?: string;
  trigger: React.ReactNode;
  children?: React.ReactNode;
  closeButtonLabel: string;
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  title,
  description,
  trigger,
  children,
  closeButtonLabel,
}) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">{trigger}</DialogTrigger>

        <DialogContent className="max-h-[70vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>

          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      <DrawerTrigger className="w-full">{trigger}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>

        {children && (
          <div className="mb-2 max-h-[70vh] overflow-auto px-4">{children}</div>
        )}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">{closeButtonLabel}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
