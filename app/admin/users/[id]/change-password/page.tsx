"use client";

import AdminLayout from "@/components/admin/layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { mockUsers } from "@/mockups/users";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  ShieldCheck,
  UserRoundX,
} from "lucide-react";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const user = mockUsers.find((u) => String(u.id) === params.id);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const checks = useMemo(
    () => [
      {
        label: "Minimal 8 karakter",
        met: password.length >= 8,
      },
      {
        label: "Kombinasi huruf besar & kecil",
        met: /[a-z]/.test(password) && /[A-Z]/.test(password),
      },
      {
        label: "Mengandung angka atau simbol",
        met: /[\d\W_]/.test(password),
      },
      {
        label: "Konfirmasi cocok",
        met: password.length > 0 && password === confirmPassword,
      },
    ],
    [password, confirmPassword],
  );

  const strength = checks.slice(0, 3).filter((c) => c.met).length;
  const strengthLabel =
    password.length === 0
      ? "Belum diisi"
      : strength <= 1
        ? "Lemah"
        : strength === 2
          ? "Cukup"
          : "Kuat";

  if (!user) {
    return (
      <AdminLayout
        breadcrumbs={[["Master Data"], ["User"], ["Change Password"]]}
      >
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <UserRoundX className="size-6 text-muted-foreground" />
            </span>
            <div className="space-y-1">
              <p className="font-medium">User tidak ditemukan</p>
              <p className="text-sm text-muted-foreground">
                Password tidak bisa diubah karena datanya tidak ada.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin/users")}
            >
              <ArrowLeft className="size-4" />
              Kembali ke daftar
            </Button>
          </CardContent>
        </Card>
      </AdminLayout>
    );
  }

  const isAdmin = user.role === "admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setSaving(true);
    console.log("Change password for", user.id);
    setSaving(false);
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <AdminLayout
      breadcrumbs={[["Master Data"], ["User"], ["Change Password"]]}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-[1fr_320px]">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                  <KeyRound className="size-5 text-primary" />
                </span>
                <div>
                  <CardTitle>Change password</CardTitle>
                  <CardDescription>
                    Set a new password for this account.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-3.5 py-3">
                <Avatar className="size-10">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {initials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{user.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <Badge variant={isAdmin ? "default" : "secondary"}>
                  {isAdmin ? <ShieldCheck className="size-3" /> : null}
                  {user.role.toUpperCase()}
                </Badge>
              </div>
            </CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <CardContent>
                <Field>
                  <Label htmlFor="password">New password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimal 8 karakter"
                      autoComplete="new-password"
                      aria-invalid={Boolean(error)}
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute top-1/2 right-1.5 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                  {password.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-1.5 flex-1 gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className={
                              i < strength
                                ? strength <= 1
                                  ? "flex-1 rounded-full bg-destructive"
                                  : "flex-1 rounded-full bg-primary"
                                : "flex-1 rounded-full bg-muted"
                            }
                          />
                        ))}
                      </div>
                      <span
                        className={
                          strength <= 1 && password.length > 0
                            ? "text-xs font-medium text-destructive"
                            : "text-xs text-muted-foreground"
                        }
                      >
                        {strengthLabel}
                      </span>
                    </div>
                  )}
                </Field>
                <Field>
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Ulangi password baru"
                      autoComplete="new-password"
                      aria-invalid={Boolean(error)}
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute top-1/2 right-1.5 -translate-y-1/2"
                    >
                      {showConfirm ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </Button>
                  </div>
                </Field>

                <ul className="grid gap-1.5 rounded-lg bg-muted/60 px-4 py-3 text-sm sm:grid-cols-2">
                  {checks.map((c) => (
                    <li
                      key={c.label}
                      className={
                        c.met
                          ? "flex items-center gap-2 text-foreground"
                          : "flex items-center gap-2 text-muted-foreground"
                      }
                    >
                      <span
                        className={
                          c.met
                            ? "flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
                            : "flex size-4 items-center justify-center rounded-full bg-muted text-transparent ring-1 ring-border"
                        }
                      >
                        <Check className="size-3" />
                      </span>
                      {c.label}
                    </li>
                  ))}
                </ul>

                {error && (
                  <div role="alert">
                    <FieldError>{error}</FieldError>
                  </div>
                )}
                <FieldDescription>
                  User harus login ulang di semua perangkat setelah password
                  diganti.
                </FieldDescription>
              </CardContent>
              <Separator className="my-2" />
              <CardFooter className="flex flex-wrap justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="size-4 animate-spin" /> : null}
                  {saving ? "Saving..." : "Update password"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="size-4 text-muted-foreground" />
                <CardTitle className="text-sm">Security tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <ul className="list-disc space-y-1.5 pl-5">
                <li>Gunakan minimal 12 karakter untuk akun admin.</li>
                <li>Hindari password yang dipakai di layanan lain.</li>
                <li>Kirim password baru lewat kanal aman, bukan chat grup.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}