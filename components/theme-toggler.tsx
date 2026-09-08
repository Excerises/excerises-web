"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";

    setTheme(nextTheme);
  }

  return (
    <Button variant="ghost" size="icon-sm" type="button" onClick={toggleTheme}>
      {isDark ? (
        <MoonIcon className="size-4" />
      ) : (
        <SunIcon className="size-4" />
      )}
    </Button>
  );
}
