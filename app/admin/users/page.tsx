"use client";

import AdminLayout from "@/components/admin/layout";
import Paginator from "@/components/admin/paginator";
import TopFilter from "@/components/admin/top-filter";
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
import { mockUsers } from "@/mockups/users";
import { User } from "@/types/model";
import { ColumnDef, tableFeatures } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

export default function UsersPage() {
  const users: User[] = mockUsers;
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
      cell: () => {
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
      <TopFilter searchPlaceholder="Search users..." />
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
      <Paginator totalPage={1} />
    </AdminLayout>
  );
}
