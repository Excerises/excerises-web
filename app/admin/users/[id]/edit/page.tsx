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
import { useState } from "react";
import {
  ArrowLeft,
  AtSign,
  Lightbulb,
  Loader2,
  Pencil,
  ShieldCheck,
  UserRound,
  UserRoundX,
} from "lucide-react";

function initials(name: string) {
  const clean = name.trim();
  if (!clean) return "??";
  return clean
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function UserEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const user = mockUsers.find((u) => String(u.id) === params.id);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Edit"]]}>
        <Card className="mx-auto w-full max-w-md">
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-muted">
              <UserRoundX className="size-6 text-muted-foreground" />
            </span>
            <div className="space-y-1">
              <p className="font-medium">User tidak ditemukan</p>
              <p className="text-sm text-muted-foreground">
                Data yang mau diubah sudah tidak tersedia.
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

    const nextErrors: { name?: string; email?: string } = {};
    if (!name.trim()) nextErrors.name = "Nama wajib diisi.";
    if (!email.trim()) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Format email tidak valid.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    console.log("Update user", {
      id: user.id,
      name: name.trim(),
      email: email.trim(),
    });
    setSaving(false);
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["User"], ["Edit"]]}>
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
                  <Pencil className="size-5 text-primary" />
                </span>
                <div>
                  <CardTitle>Edit user</CardTitle>
                  <CardDescription>
                    Update profile information for {user.name}.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <form onSubmit={handleSubmit} noValidate>
              <CardContent>
                <Field>
                  <Label htmlFor="name">
                    <UserRound className="size-3.5 text-muted-foreground" />
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama lengkap"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>
                <Field>
                  <Label htmlFor="email">
                    <AtSign className="size-3.5 text-muted-foreground" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </Field>
                <Field>
                  <Label>Role</Label>
                  <div>
                    <Badge variant={isAdmin ? "default" : "secondary"}>
                      {isAdmin ? (
                        <ShieldCheck className="size-3" />
                      ) : null}
                      {user.role.toUpperCase()}
                    </Badge>
                  </div>
                  <FieldDescription>
                    Role tidak bisa diubah dari halaman ini. Hubungi superadmin
                    untuk perubahan hak akses.
                  </FieldDescription>
                </Field>

                <div className="flex flex-wrap gap-x-8 gap-y-2 rounded-lg bg-muted/60 px-4 py-3 text-sm">
                  <div>
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Member since
                    </p>
                    <p className="tabular-nums">{user.created_at ?? "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      Last login
                    </p>
                    <p className="tabular-nums">{user.last_login ?? "-"}</p>
                  </div>
                </div>
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
                  {saving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : null}
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  Tampilan nama di daftar dan detail.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarFallback className="bg-primary/10 font-semibold text-primary">
                    {initials(name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {name.trim() || "Nama belum diisi"}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {email.trim() || "email@contoh.com"}
                  </p>
                  <Badge
                    variant={isAdmin ? "default" : "secondary"}
                    className="mt-1.5 text-[11px]"
                  >
                    {user.role.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="size-4 text-muted-foreground" />
                  <CardTitle className="text-sm">Tips cepat</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc space-y-1.5 pl-5">
                  <li>Gunakan nama lengkap sesuai identitas member.</li>
                  <li>Pastikan email aktif untuk notifikasi akun.</li>
                  <li>
                    Perubahan tersimpan langsung terlihat di halaman detail.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}