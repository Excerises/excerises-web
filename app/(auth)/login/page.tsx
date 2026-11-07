"use client";

import AuthLayout from "@/components/auth/layout";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form/form-control";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { useLogin, useLoginForm } from "@/hooks/api/auth/use-login";
import { getError } from "@/lib/error";
import Link from "next/link";

export default function LoginPage() {
  const { mutation } = useLogin();
  const { control, handleSubmit, setError } = useLoginForm();

  const onLogin = handleSubmit(async (v) => {
    try {
      await mutation.mutateAsync(v);
    } catch (err) {
      setError("password", { message: getError(err) });
    }
  });

  return (
    <AuthLayout
      title="Sign In"
      description="Welcome back! Enter your credentials to sign in."
    >
      <form onSubmit={onLogin}>
        <div className="space-y-4 mb-10">
          <FormControl
            control={control}
            name="email"
            label="Email"
            required
            render={({ field }) => (
              <Input placeholder="Email" {...field} type="email" />
            )}
          />
          <FormControl
            control={control}
            name="password"
            label="Password"
            required
            render={({ field }) => <InputPassword {...field} />}
          />
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
