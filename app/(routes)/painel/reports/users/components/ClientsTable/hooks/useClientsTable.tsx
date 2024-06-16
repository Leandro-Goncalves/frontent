import { findUsers, findUsersReturnDto } from "@/app/services/reports";
import { useCookieState } from "@/app/utils/hooks/useCookieState";
import { formatDocument } from "@/app/utils/misc/formatDocument";
import { formatPhoneNumber } from "@/app/utils/misc/formatPhoneNumber";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ColumnDef,
  OnChangeFn,
  PaginationState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

export const columns: ColumnDef<findUsers>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Usuário",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => {
      return <div>{row.getValue("email")}</div>;
    },
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => {
      return <div>{formatPhoneNumber(row.getValue("phone"))}</div>;
    },
  },
  {
    accessorKey: "cpf",
    header: "Documento",
    cell: ({ row }) => {
      return <div>{formatDocument(row.getValue("cpf"))}</div>;
    },
  },
];

interface useClientsTableProps {
  setPagination: OnChangeFn<PaginationState>;
  data: findUsersReturnDto;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

export const useClientsTable = ({
  pagination,
  setPagination,
  data,
}: useClientsTableProps) => {
  const [columnVisibility, setColumnVisibility] =
    useCookieState<VisibilityState>("ColumnVisibility", {});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: data.results,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (old) => {
      if (typeof old === "function") {
        setColumnVisibility(old(columnVisibility));
        return;
      }
      setColumnVisibility(old);
    },
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    rowCount: data.totalItems,
    onPaginationChange: setPagination,
    state: {
      pagination,
      columnVisibility,
      rowSelection,
    },
  });

  return { table, rowSelection, columnVisibility };
};
