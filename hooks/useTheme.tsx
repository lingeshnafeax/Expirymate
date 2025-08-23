"use client";
import { useEffect, useState } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    let initial: "light" | "dark";
    if (saved === "dark" || saved === "light") {
      initial = saved;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      initial = prefersDark ? "dark" : "light";
    }
    setTheme(initial);
  }, []);

  const switchTheme = () => {
    if (!theme) return;
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (!theme) return;

    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");

    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#18181b" : "#fafafa",
      );
    }
  }, [theme]);

  return { theme, setTheme, switchTheme };
};

export default useTheme;
