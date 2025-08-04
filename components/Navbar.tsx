"use client";
import ThemeToggle from "./ThemeToggle";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarTypography from "./AvatarTypography";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import useTheme from "@/hooks/useTheme";

const Navbar = () => {
  const t = useTranslations("navBar");
  const pathName = usePathname();
  const { logOutUser, data } = useUser();
  const { switchTheme, theme } = useTheme();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!data) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [pathName, data]);

  return (
    <div className="font-rampartOne relative flex w-full items-center justify-between py-5 lg:py-10">
      <h3 className="text-3xl font-semibold lg:text-5xl">{t("title")}</h3>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AvatarTypography name={data?.user.name} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
              {t("menu.title", { name: data?.user.name || "John Doe" })}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>{t("menu.menus.profile")}</DropdownMenuItem>
              <DropdownMenuItem>{t("menu.menus.settings")}</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
              }}
              className="flex items-center space-x-2"
            >
              <Switch
                checked={theme === "dark"}
                onCheckedChange={switchTheme}
                id="airplane-mode"
              />
              <Label htmlFor="airplane-mode">{t("menu.menus.darkMode")}</Label>
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={logOutUser}>
              {t("menu.menus.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <ThemeToggle />
      )}
    </div>
  );
};

export default Navbar;
