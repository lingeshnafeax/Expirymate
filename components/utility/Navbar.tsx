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
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import useTheme from "@/hooks/useTheme";
import useSignOut from "@/hooks/api/useSignOut";
import Link from "next/link";
import AppIcon from "../icons/AppIcon";

const Navbar = () => {
  const t = useTranslations("navBar");
  const pathName = usePathname();
  const { data } = useUser();
  const { mutateAsync: signOut } = useSignOut();
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
      <div className="flex items-center space-x-2">
        <AppIcon />
        <Link className="text-3xl font-semibold lg:text-4xl" href="/">
          {t("title")}
        </Link>
      </div>
      {isLoggedIn ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AvatarTypography name={data?.user.name} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-md w-56 sm:text-lg" align="end">
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
              className="flex items-center justify-between space-x-2"
            >
              <Label htmlFor="airplane-mode " className="text-md sm:text-lg">
                {t("menu.menus.darkMode")}
              </Label>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={switchTheme}
                id="airplane-mode"
              />
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                signOut();
              }}
            >
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
