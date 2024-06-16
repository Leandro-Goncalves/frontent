"use client";
import {
  findUsers,
  findUsersReturnDto,
  reportsService,
} from "@/app/services/reports";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CompositionTable } from "@/app/components/CompositionTable";
import { useClientsTable } from "./hooks/useClientsTable";
import { ExportButton } from "../../../components/ExportButton";
import { formatDocument } from "@/app/utils/misc/formatDocument";
import { formatPhoneNumber } from "@/app/utils/misc/formatPhoneNumber";

interface OrdersTableProps {
  users: findUsersReturnDto;
}

export const ClientsTable: React.FC<OrdersTableProps> = ({ users }) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data } = useQuery({
    initialData: users,
    queryKey: ["reportsUsers", pagination],
    refetchOnMount: false,
    queryFn: () =>
      reportsService
        .findUsers({
          page: pagination.pageIndex,
          size: pagination.pageSize,
        })
        .then((r) => r.data),
  });

  const { table, columnVisibility, rowSelection } = useClientsTable({
    setPagination,
    pagination,
    data,
  });

  const formatData = (
    data: findUsers[],
    hideColumns?: ("name" | "email" | "phone" | "cpf")[]
  ) => {
    const shouldHide = (column: "name" | "email" | "phone" | "cpf") =>
      hideColumns?.includes(column) || false;
    return data.map(({ name, email, phone, cpf }) => {
      const data: {
        Usuário?: string;
        "E-mail"?: string;
        Telefone?: string;
        Documento?: string;
      } = {
        Usuário: name,
        "E-mail": email,
        Telefone: formatPhoneNumber(phone),
        Documento: formatDocument(cpf),
      };
      if (shouldHide("name")) delete data.Usuário;
      if (shouldHide("email")) delete data["E-mail"];
      if (shouldHide("phone")) delete data.Telefone;
      if (shouldHide("cpf")) delete data.Documento;

      return data;
    });
  };

  const getFullData = async () => {
    const fullData: findUsers[] = [];

    const getData = async (page: number) => {
      const { data } = await reportsService.findUsers({
        page: page,
        size: 50,
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
      <div className="flex items-center gap-2 pb-4">
        <ExportButton
          tableName="Clientes"
          fileName="Clientes"
          text="Exportar tudo"
          data={getFullData}
        />
        <ExportButton
          tableName="Clientes"
          fileName="Clientes"
          text="Exportar selecionados"
          data={getSelectedData}
          disabled={!Object.keys(rowSelection).length}
        />
        <CompositionTable.Columns table={table} />
      </div>
      <div className="rounded-md border">
        <CompositionTable.Root table={table}>
          <CompositionTable.Header />
          <CompositionTable.Body />
        </CompositionTable.Root>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <CompositionTable.PaginationButtons table={table} />
      </div>
    </div>
  );
};
