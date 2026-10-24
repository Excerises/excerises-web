import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  function handleLogout() {
    router.replace("/login");
  }

  return {
    handleLogout,
  };
}
