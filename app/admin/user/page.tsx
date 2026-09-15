"use client";

import AdminLayout from "@/components/admin/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/ui/table/data-table";
import { User } from "@/types/model";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export default function UsersPage() {
  const users: User[] = [
    {
      id: "1",
      name: "Admin Utama",
      email: "admin@fitnessapp.id",
      role: "admin",
      last_login: "2026-09-15 08:30:00",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-01-10 09:00:00",
      updated_at: "2026-09-15 08:30:00",
    },
    {
      id: "2",
      name: "Budi Santoso",
      email: "budi.santoso@gmail.com",
      role: "user",
      last_login: "2026-09-14 18:22:10",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-02-05 10:15:00",
      updated_at: "2026-09-14 18:22:10",
    },
    {
      id: "3",
      name: "Siti Aminah",
      email: "siti.aminah@gmail.com",
      role: "user",
      last_login: "2026-09-14 07:05:44",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-02-12 14:30:00",
      updated_at: "2026-09-14 07:05:44",
    },
    {
      id: "4",
      name: "Andi Pratama",
      email: "andi.pratama@yahoo.co.id",
      role: "user",
      last_login: "2026-09-13 20:11:32",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-03-01 08:45:00",
      updated_at: "2026-09-13 20:11:32",
    },
    {
      id: "5",
      name: "Dewi Lestari",
      email: "dewi.lestari@gmail.com",
      role: "user",
      last_login: "2026-09-13 06:48:19",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-03-18 11:20:00",
      updated_at: "2026-09-13 06:48:19",
    },
    {
      id: "6",
      name: "Rizky Ramadhan",
      email: "rizky.ramadhan@gmail.com",
      role: "user",
      last_login: "2026-09-12 19:33:07",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-04-02 13:10:00",
      updated_at: "2026-09-12 19:33:07",
    },
    {
      id: "7",
      name: "Putri Ayu",
      email: "putri.ayu@gmail.com",
      role: "user",
      last_login: "2026-09-12 05:15:52",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-04-20 09:55:00",
      updated_at: "2026-09-12 05:15:52",
    },
    {
      id: "8",
      name: "Fajar Nugroho",
      email: "fajar.nugroho@gmail.com",
      role: "admin",
      last_login: "2026-09-11 21:02:41",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-05-07 15:40:00",
      updated_at: "2026-09-11 21:02:41",
    },
    {
      id: "9",
      name: "Intan Permata",
      email: "intan.permata@gmail.com",
      role: "user",
      last_login: "2026-09-11 08:27:36",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-06-11 10:05:00",
      updated_at: "2026-09-11 08:27:36",
    },
    {
      id: "10",
      name: "Hendra Gunawan",
      email: "hendra.gunawan@gmail.com",
      role: "user",
      last_login: "2026-09-10 17:44:29",
      profile: [],
      login_logs: [],
      notifications: [],
      created_at: "2026-07-03 12:25:00",
      updated_at: "2026-09-10 17:44:29",
    },
  ];
  const features = tableFeatures({});
  const columns: Array<ColumnDef<typeof features, User>> = [
    {
      accessorKey: "name",
      header: "User",
      cell: (info) => (
        <div className="flex flex-col">
          <strong>{info.row.original.name}</strong>
          <span className="text-muted-foreground text-xs">
            {info.row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (info) => {
        const role = info.row.original.role;

        return (
          <Badge
            variant={role == "admin" ? "default" : "secondary"}
            className="text-xs"
          >
            {role.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "last_login",
      header: "Terakhir Login",
      cell: (info) => (
        <span className="text-muted-foreground">{String(info.getValue())}</span>
      ),
    },
    {
      header: "Aksi",
      accessorKey: "options",
      cell: (info) => {
        const user = info.row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button type="button" size="icon-xs" variant="ghost">
                  <MoreHorizontalIcon className="size-4" />
                </Button>
              }
            />
            <DropdownMenuContent className="w-auto">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Change Password</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["User"]]}>
      <Card>
        <CardContent>
          <DataTable
            columns={columns}
            data={users}
            features={features}
            tableKey="users-table"
          />
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
