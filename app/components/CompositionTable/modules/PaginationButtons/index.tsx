import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

interface PaginationButtonsProps {
  table: Table<any>;
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  table,
}) => {
  return (
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
  );
};
