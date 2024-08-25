"use client";

import { useMediaQuery } from "@/lib/helpers/useMediaQuery";
import { Children, FC } from "react";

const Main: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <main className={`${!isDesktop && "pb-[60px]"} container px-4 max-w-md`}>
      {children}
    </main>
  );
};

export default Main;
