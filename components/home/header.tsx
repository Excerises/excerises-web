"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APP_NAME } from "@/constant/app";
import ThemeToggler from "@/components/theme-toggler";
import Logo from "../logo";
import { useAuth } from "@/context/auth-context";
import { AuthDropdown } from "../auth/auth-dropdown";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#news", label: "News" },
  { href: "/#download", label: "Download" },
];

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string>("/");
  const [prevIsHome, setPrevIsHome] = useState(isHome);

  if (isHome !== prevIsHome) {
    setPrevIsHome(isHome);
    setActiveSection("/");
  }

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1)).filter(
      Boolean,
    );

    const update = () => {
      // Section aktif = section terakhir yang posisinya sudah melewati header
      const offset = 96;
      let current = "/";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = `#${id}`;
        }
      }
      setActiveSection(current);
    };

    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // Section #news (dst) baru mount setelah data fetch selesai — pantau perubahan DOM
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [isHome]);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative block size-9 overflow-hidden rounded-xl">
            <Logo />
          </span>
          <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`transition-colors hover:text-foreground ${
                  isActive ? "text-yellow-500" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center justify-end gap-4">
          <ThemeToggler />
          {user && <AuthDropdown />}
        </div>
      </div>
    </header>
  );
}
