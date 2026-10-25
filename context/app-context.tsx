/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { AuthProvider, useAuth } from "./auth-context";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/logo";

export function useAppEntry() {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const { user, isLoaded } = useAuth();

  async function resolve() {
    if (!isLoaded) {
      return;
    }

    if (user && user.role == "admin" && pathname.startsWith("/login")) {
      router.replace("/admin");
    } else if (
      (!user || user.role !== "admin") &&
      pathname.startsWith("/admin")
    ) {
      router.replace("/login");
    }

    await new Promise((res) => setTimeout(res, 400));

    setIsReady(true);
  }

  useEffect(() => {
    resolve();
  }, [isLoaded, user, pathname]);

  return { isReady };
}

export function AppProvider({ children }: { children?: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class">
          <TooltipProvider>
            <AppContent>{children}</AppContent>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function AppContent({ children }: { children?: ReactNode }) {
  const { isReady } = useAppEntry();

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen w-screen overflow-hidden fixed top-0 left-0">
        <Logo fill={false} width={80} height={80} className="animate-bounce" />
      </div>
    );
  }

  return children;
}
