"use client";
import React from "react";
import ThemeToggle from "../client/ThemeToggle";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const t = useTranslations("homePage.navBar");
  const pathName = usePathname();
  if (pathName === "/") {
    return null;
  }
  return (
    <div className="font-rampartOne flex w-full items-center justify-between p-10 text-5xl font-semibold">
      {t("title")}
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
