import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/constant/app";
import ThemeToggler from "@/components/theme-toggler";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative block size-9 overflow-hidden rounded-xl">
            <Image
              src="/logo.png"
              alt={APP_NAME}
              fill
              className="object-cover"
            />
          </span>
          <span className="text-lg font-bold tracking-tight">{APP_NAME}</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="transition-colors hover:text-foreground"
          >
            How It Works
          </Link>
          <Link href="#news" className="transition-colors hover:text-foreground">
            News
          </Link>
          <Link
            href="#download"
            className="transition-colors hover:text-foreground"
          >
            Download
          </Link>
        </nav>
        <ThemeToggler />
      </div>
    </header>
  );
}
