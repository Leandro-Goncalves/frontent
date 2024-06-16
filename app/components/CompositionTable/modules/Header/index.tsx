import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTable } from "../Root";
import { flexRender } from "@tanstack/react-table";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
  const table = useTable();

  return (
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
  );
};
