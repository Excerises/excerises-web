import Link from "next/link";
import { Apple, Play } from "lucide-react";

type StoreButtonsProps = {
  dark?: boolean;
}

export default function StoreButtons({ dark = false }: StoreButtonsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link
        href="#download"
        className={`flex items-center gap-3 rounded-xl px-5 py-3 transition-transform hover:-translate-y-0.5 ${
          dark
            ? "bg-white text-zinc-950 hover:bg-zinc-100"
            : "bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        }`}
      >
        <Play className="size-7 fill-current" />
        <span className="text-left leading-tight">
          <span className="block text-[11px] uppercase opacity-70">
            Get it on
          </span>
          <span className="block text-base font-semibold">Google Play</span>
        </span>
      </Link>
      <Link
        href="#download"
        className={`flex items-center gap-3 rounded-xl px-5 py-3 transition-transform hover:-translate-y-0.5 ${
          dark
            ? "border border-white/30 bg-transparent text-white hover:bg-white/10"
            : "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50 dark:border-white/20 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
        }`}
      >
        <Apple className="size-7 fill-current" />
        <span className="text-left leading-tight">
          <span className="block text-[11px] uppercase opacity-70">
            Download on the
          </span>
          <span className="block text-base font-semibold">App Store</span>
        </span>
      </Link>
    </div>
  );
}
