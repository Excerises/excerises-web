import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toast";
import { AppProvider } from "@/context/app-context";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Excerises - Know your fitness level and train smarter.",
  description:
    "Excerises uses machine learning to predict your fitness level and generate personalized training recommendations so every workout moves you forward, safely and efficiently.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background">
        <AppProvider>
          <RootContent>{children}</RootContent>
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}

export function RootContent({ children }: { children?: ReactNode }) {
  return children;
}
