import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/constant/app";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <span className="flex items-center gap-2 font-semibold text-foreground">
          <span className="relative block size-7 overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt={APP_NAME}
              fill
              className="object-cover"
            />
          </span>
          {APP_NAME}
        </span>
        <nav className="flex items-center gap-5">
          <Link href="#features" className="hover:text-foreground">
            Features
          </Link>
          <Link href="#news" className="hover:text-foreground">
            News
          </Link>
          <Link href="#download" className="hover:text-foreground">
            Download
          </Link>
        </nav>
        <p>© 2026 {APP_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}
