"use client";
import useTheme from "@/hooks/useTheme";
import { MoonIcon, SunIcon } from "lucide-react";
import React from "react";

const ThemeToggle = () => {
  const { switchTheme, theme } = useTheme();
  return (
    <div
      onClick={switchTheme}
      className="right:5 absolute right-5 cursor-pointer transition-all duration-300 ease-in-out sm:right-10"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </div>
  );
};

export default ThemeToggle;
