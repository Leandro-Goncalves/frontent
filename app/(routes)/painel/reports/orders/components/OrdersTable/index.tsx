"use client";
import {
  findSalesReturnDto,
  findSalesUser,
  reportsService,
} from "@/app/services/reports";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { SelectDate } from "./components/SelectDate";
import { createParser, useQueryState } from "nuqs";
import { ProductOrder } from "@/app/models/orders";
import { getSize } from "@/app/(routes)/itemDetails/components/Sizes";
import { OrderLine } from "./components/OrderLine";
import { ExportButton } from "../../../components/ExportButton";
import { useCookieState } from "@/app/utils/hooks/useCookieState";

export const columns: ColumnDef<findSalesUser>[] = [
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
    accessorKey: "products",
    header: "Pedido",
    cell: ({ row }) => (
      <OrderLine orders={row.getValue<ProductOrder[]>("products")} />
    ),
  },
  {
    accessorKey: "userName",
    header: "Usuário",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("userName")}</div>
    ),
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));

      return <div className="font-medium">{toCurrencyValue(amount)}</div>;
    },
  },
  {
    accessorKey: "freightValue",
    header: "Frete",
    cell: ({ row }) => {
      const freightValue = parseFloat(row.getValue("freightValue"));

      return <div className="font-medium">{toCurrencyValue(freightValue)}</div>;
    },
  },
];

interface OrdersTableProps {
  orders: findSalesReturnDto;
}

const parseAsIsoDateTimeWithoutHours = createParser({
  parse: (v) => {
    const date = new Date(v);

    if (Number.isNaN(date.valueOf())) {
      return null;
    }
    return date;
  },
  serialize: (v: Date) => v.toISOString(),
});

export const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {
  const [from, setFrom] = useQueryState("from", parseAsIsoDateTimeWithoutHours);
  const [to, setTo] = useQueryState("to", parseAsIsoDateTimeWithoutHours);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data } = useQuery({
    initialData: orders,
    queryKey: ["reportsOrders", pagination, from, to],
    refetchOnMount: false,
    queryFn: () =>
      reportsService
        .findSales({
          page: pagination.pageIndex,
          size: pagination.pageSize,
          startDate: from ? from.toISOString() : undefined,
          endDate: to ? to.toISOString() : undefined,
        })
        .then((r) => r.data),
  });

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

  const formatData = (
    data: findSalesUser[],
    hideColumns?: ("freightValue" | "products" | "total" | "userName")[]
  ) => {
    const shouldHide = (
      column: "freightValue" | "products" | "total" | "userName"
    ) => hideColumns?.includes(column) || false;
    return data.map(({ products, userName, total, freightValue }) => {
      const data: {
        Pedido?: string;
        Usuário?: string;
        Total?: number;
        Frete?: number;
      } = {
        Pedido: products
          .map(
            (p) =>
              `${p.quantity}x ${p.title}-${p.variant.name} (${
                getSize(p.sizeGuid)?.name
              })`
          )
          .join(", "),
        Usuário: userName,
        Total: total,
        Frete: freightValue,
      };
      if (shouldHide("freightValue")) delete data.Frete;
      if (shouldHide("products")) delete data.Pedido;
      if (shouldHide("total")) delete data.Total;
      if (shouldHide("userName")) delete data.Usuário;

      return data;
    });
  };

  const getFullData = async () => {
    const fullData: findSalesUser[] = [];

    const getData = async (page: number) => {
      const { data } = await reportsService.findSales({
        page: page,
        size: 10,
        startDate: from ? from.toISOString() : undefined,
        endDate: to ? to.toISOString() : undefined,
      });

      fullData.push(...data.results);

      if (data.currentPage < data.totalPages - 1) {
        await getData(data.currentPage + 1);
      }
    };

    await getData(0);

    return formatData(fullData);
  };

  const getSelectedData = async () => {
    const data2 = Object.keys(rowSelection).map((i: any) => data.results[i]);
    const hide = Object.keys(columnVisibility).filter(
      (column) => columnVisibility[column] === false
    );

    return formatData(data2, hide as any);
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4 pb-2">
        <SelectDate
          data={{ from, to }}
          onSetDate={(data) => {
            data.from && setFrom(data.from);
            data.to && setTo(data.to);
          }}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header?.toString()}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-2 pb-4">
        <ExportButton
          tableName="Vendas"
          fileName="Vendas"
          text="Exportar tudo"
          data={getFullData}
        />
        <ExportButton
          tableName="Vendas"
          fileName="Vendas"
          text="Exportar selecionados"
          data={getSelectedData}
          disabled={!Object.keys(rowSelection).length}
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Proximo
          </Button>
        </div>
      </div>
    </div>
  );
};
