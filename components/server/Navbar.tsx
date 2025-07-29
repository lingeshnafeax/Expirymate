import { getTranslations } from "next-intl/server";
import React from "react";
import ThemeToggle from "../client/ThemeToggle";

const Navbar = async () => {
  const t = await getTranslations("homePage.navBar");
  return (
    <div className="font-yatraOne flex w-full items-center justify-center py-8 text-3xl font-semibold">
      {t("title")}
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
