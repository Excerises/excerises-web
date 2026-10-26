"use client";

import AdminLayout from "@/components/admin/layout";
import Paginator from "@/components/admin/paginator";
import TopFilter from "@/components/admin/top-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/ui/table/data-table";
import { User } from "@/types/model";
import {
  ColumnDef,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDeleteUser, useGetUsers } from "@/hooks/api/user/use-user-query";
import { getApiErrorMessage } from "@/network/api";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

export default function UsersPage() {
  const {
    query: usersQuery,
    pagination,
    debounceSearch,
    search,
    setSearch,
  } = useGetUsers();
  const router = useRouter();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const deleteUser = useDeleteUser();

  const filteredUsers = useMemo(() => {
    return (usersQuery.data?.data || []).filter((u) =>
      `${u.email}${u.name}`
        .toLowerCase()
        .includes(debounceSearch.toLowerCase()),
    );
  }, [usersQuery.data?.data, debounceSearch]);

  const features = tableFeatures({
    rowPaginationFeature: rowPaginationFeature,
    paginatedRowModel: createPaginatedRowModel(),
  });

  const handleDelete = (user: User) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;

    const target = userToDelete;
    setUserToDelete(null);
    deleteUser.mutation.mutate(
      { userId: target.id },
      {
        onSuccess: () => {
          toast.add({
            type: "success",
            title: "User deleted",
            description: `"${target.name}" has been deleted.`,
          });
        },
        onError: (error) => {
          toast.add({
            type: "error",
            title: "Delete failed",
            description: getApiErrorMessage(error),
          });
        },
      },
    );
  };

  const columns = useMemo<Array<ColumnDef<typeof features, User>>>(
    () => [
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
        header: "Last Login",
        cell: (info) => (
          <span className="text-muted-foreground">
            {info.getValue() ? String(info.getValue()) : "Never"}
          </span>
        ),
      },
      {
        header: "Actions",
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
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/users/${user.id}`)}
                >
                  Detail
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push(`/admin/users/${user.id}/edit`)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    router.push(`/admin/users/${user.id}/change-password`)
                  }
                >
                  Change Password
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return (
    <AdminLayout breadcrumbs={[["Master Data"], ["User"]]}>
      <TopFilter
        searchPlaceholder="Search users..."
        searchValue={search}
        onSearchChange={setSearch}
      />
      <Card>
        <CardContent>
          {usersQuery.isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredUsers}
              features={features}
              tableKey="users-table"
              state={{
                pagination: {
                  pageIndex: pagination.page - 1,
                  pageSize: pagination.limit,
                },
              }}
            />
          )}
        </CardContent>
      </Card>
      <Paginator
        totalPage={Math.ceil(filteredUsers.length / pagination.limit)}
        currentPage={pagination.page}
        onCurrentPageChange={pagination.setPage}
        perPage={pagination.limit}
        onPerPageChange={pagination.setLimit}
      />
      <ConfirmDialog
        open={userToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setUserToDelete(null);
        }}
        title="Delete User?"
        description={`Are you sure you want to delete "${userToDelete?.name ?? ""}"? This action cannot be undone.`}
        cancelText="Cancel"
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={handleConfirmDelete}
      />
    </AdminLayout>
  );
}
