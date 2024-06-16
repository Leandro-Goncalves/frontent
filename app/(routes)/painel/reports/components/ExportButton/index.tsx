import { handleExportJSON } from "@/app/utils/handleExport";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface ExportButtonProps<T> {
  text: string;
  data: T[] | (() => Promise<T[]>);
  tableName: string;
  fileName: string;
  disabled?: boolean;
}

export const ExportButton = <T,>({
  text,
  data,
  tableName,
  fileName,
  disabled = false,
}: ExportButtonProps<T>) => {
  const getData = async () => {
    if (typeof data === "function") {
      return data();
    }
    return data;
  };

  const handleClick = async () => {
    const data = await getData();

    handleExportJSON(data, 60, tableName, fileName, "xlsx");
  };

  return (
    <Button disabled={disabled} onClick={handleClick}>
      {text}
    </Button>
  );
};
