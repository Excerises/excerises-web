/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  RowData,
  TableFeatures,
  TableOptions,
  useTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";
import { NoRecord } from "@/components/admin/no-record";
import { ReactNode } from "react";

export type DataTableProps<
  TFeatures extends TableFeatures,
  TData extends RowData,
> = TableOptions<TFeatures, TData> & {
  tableKey: string;
};

export default function DataTable<
  TFeatures extends TableFeatures,
  TData extends RowData,
>({
  emptyMessage,
  emptyAction,
  ...props
}: DataTableProps<TFeatures, TData> & {
  emptyMessage?: string;
  emptyAction?: ReactNode;
}) {
  const { tableKey } = props;
  const table = useTable<TFeatures, TData>({
    ...(props as any),
    key: tableKey,
  });

  if (props.data.length == 0) {
    return (
      <NoRecord message={emptyMessage || "No records found."}>
        {emptyAction}
      </NoRecord>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <table.FlexRender header={header} />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
