"use client";

import AuthLayout from "@/components/auth/layout";
import { Button } from "@/components/ui/button";
import FormGroup from "@/components/ui/form/form-group";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/auth/use-login";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthLayout
      title="Sign In"
      description="Welcome back! Enter your credentials to sign in."
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="space-y-4 mb-10">
          <FormGroup label="Email" required>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              type="email"
              required
            />
          </FormGroup>
          <FormGroup label="Password" required>
            <div className="relative">
              <Input
                placeholder="Password"
                className="pr-10"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                className="absolute top-0 bottom-0 right-0 w-10 flex items-center justify-center outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="size-4" />
                ) : (
                  <EyeOffIcon className="size-4" />
                )}
              </button>
            </div>
          </FormGroup>
          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-primary text-sm">
              Forgot password?
            </Link>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
}
