import { useState } from "react";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    alert(`Halo ${email}`);
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}
