import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useTable } from "../Root";
import { flexRender } from "@tanstack/react-table";

interface BodyProps {
  emptyText?: string;
}

export const Body: React.FC<BodyProps> = ({
  emptyText = "Nenhum resultado.",
}) => {
  const table = useTable();
  const columns = table.getAllColumns();

  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            {emptyText}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
