import { Table } from "@/components/ui/table";
import { Table as ITable } from "@tanstack/react-table";
import { createContext, useContext } from "react";

interface RootProps<T> {
  table: ITable<T>;
  children: React.ReactNode;
}

const TableContext = createContext<ITable<any>>({} as ITable<any>);

export const useTable = <T,>() => {
  return useContext(TableContext);
};

export const Root = <T,>({ children, table }: RootProps<T>) => {
  return (
    <Table>
      <TableContext.Provider value={table}>{children}</TableContext.Provider>
    </Table>
  );
};
