import { useGetProfile } from "@/hooks/api/profile/use-get-profile";
import { api } from "@/network/api";
import { User } from "@/types/model";
import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContext = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoaded: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const queryClient = useQueryClient();

  const {
    query: { isPending, data },
  } = useGetProfile();

  useEffect(() => {
    if (isPending || isLoaded) {
      return;
    }

    const timeout = setTimeout(async () => {
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isPending]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(data?.data || null);
  }, [data?.data]);

  const logout = async () => {
    // Backend tidak punya endpoint logout — bersihkan token di sisi klien
    await api.setToken("access", undefined);
    await api.setToken("refresh", undefined);
    // Buang cache agar data user sebelumnya tidak bocor ke sesi berikutnya
    queryClient.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoaded,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
