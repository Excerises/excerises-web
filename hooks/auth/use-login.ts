import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    toast.add({
      title: "Success",
      description: `Hello ${email}`,
      type: "success",
    });

    router.push("/admin");
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
