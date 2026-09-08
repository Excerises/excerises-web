"use client";

import { APP_NAME } from "@/constant/app";
import Logo from "../logo";
import ThemeToggler from "../theme-toggler";

export default function AuthHeader() {
  return (
    <div className="h-16 p-5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-6 relative">
          <Logo />
        </div>
        <div className="font-semibold text-xl text-primary">{APP_NAME}</div>
      </div>
      <ThemeToggler />
    </div>
  );
}
