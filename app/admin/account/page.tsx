"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/layout";
import Paginator from "@/components/admin/paginator";
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
import DataTable from "@/components/ui/table/data-table";
import { mockLoginLogs } from "@/mockups/login-logs";
import { mockUsers } from "@/mockups/users";
import { UserLoginLogs } from "@/types/model";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { cn } from "cn";

type AccountTab = "profile" | "login-logs";

const tabs: Array<{ id: AccountTab; label: string }> = [
  { id: "profile", label: "Edit Akun" },
  { id: "login-logs", label: "Login Logs" },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [name, setName] = useState(mockUsers[0].name);
  const [email, setEmail] = useState(mockUsers[0].email);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [notice, setNotice] = useState<string | null>(null);

  const features = tableFeatures({});
  const columns: Array<ColumnDef<typeof features, UserLoginLogs>> = [
    {
      accessorKey: "device",
      header: "Perangkat",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <strong>{info.row.original.device}</strong>
          {info.row.index === 0 && (
            <Badge variant="default" className="text-xs">
              SESI INI
            </Badge>
          )}
        </div>
      ),
    },
    {
      accessorKey: "ip_address",
      header: "IP Address",
      cell: (info) => (
        <span className="text-muted-foreground">{String(info.getValue())}</span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Waktu Login",
      cell: (info) => (
        <span className="text-muted-foreground">{String(info.getValue())}</span>
      ),
    },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);

    const nextErrors: { name?: string; email?: string } = {};
    if (!name.trim()) nextErrors.name = "Nama wajib diisi.";
    if (!email.trim()) {
      nextErrors.email = "Email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = "Format email tidak valid.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setNotice("Perubahan akun berhasil disimpan.");
  }

  return (
    <AdminLayout breadcrumbs={[["Account"]]}>
      <div className="flex gap-1 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Akun</CardTitle>
            <CardDescription>
              Perbarui nama dan email akun Anda.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Field>
                <Label htmlFor="account-name">Nama</Label>
                <Input
                  id="account-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                />
                {errors.name && <FieldError>{errors.name}</FieldError>}
              </Field>
              <Field>
                <Label htmlFor="account-email">Email</Label>
                <Input
                  id="account-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                />
                {errors.email && <FieldError>{errors.email}</FieldError>}
              </Field>
              <Field>
                <Label>Role</Label>
                <div>
                  <Badge
                    variant={
                      mockUsers[0].role === "admin" ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {mockUsers[0].role.toUpperCase()}
                  </Badge>
                </div>
                <FieldDescription>
                  Role akun tidak dapat diubah dari halaman ini.
                </FieldDescription>
              </Field>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Terakhir Login</span>
                  <span className="text-sm text-muted-foreground">
                    {mockUsers[0].last_login ?? "-"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium">Terdaftar Sejak</span>
                  <span className="text-sm text-muted-foreground">
                    {mockUsers[0].created_at}
                  </span>
                </div>
              </div>
              {notice && (
                <p className="text-sm text-muted-foreground">{notice}</p>
              )}
            </CardContent>
          </form>
          <CardFooter className="pt-4">
            <Button type="submit" size="sm">
              Simpan Perubahan
            </Button>
          </CardFooter>
        </Card>
      )}

      {activeTab === "login-logs" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Login Logs</CardTitle>
              <CardDescription>
                Riwayat perangkat yang pernah masuk ke akun Anda.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                columns={columns}
                data={mockLoginLogs}
                features={features}
                tableKey="account-login-logs-table"
              />
            </CardContent>
          </Card>
          <Paginator totalPage={1} />
        </>
      )}
    </AdminLayout>
  );
}
