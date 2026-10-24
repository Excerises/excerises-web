import { useGetProfile } from "@/hooks/api/profile/use-get-profile";
import { User } from "@/types/model";
import { usePathname, useRouter } from "next/navigation";
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
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
