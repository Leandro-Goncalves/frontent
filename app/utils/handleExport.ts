import { format } from "date-fns";
import * as XLSX from "xlsx";

export const handleExportJSON = (
  json: any[],
  maxSize: number,
  tableName: string,
  fileName: string,
  fileType: "xlsx" | "csv"
) => {
  const worksheet = XLSX.utils.json_to_sheet(json);

  const wb = XLSX.utils.book_new();

  const tableWidth = calculateTableWidth(worksheet, maxSize);

  worksheet["!cols"] = tableWidth;

  XLSX.utils.book_append_sheet(wb, worksheet, tableName);

  handleExport(wb, fileName, fileType);
};

export const handleExportTable = (
  id: string,
  maxSize: number,
  tableName: string,
  fileName: string,
  fileType: "xlsx" | "csv"
) => {
  const tableElt = document.getElementById(id);
  if (!tableElt) {
    console.error(`Element with id ${id} not found`);
    return;
  }

  const table = removeClassToTable(tableElt, "xlsx-remove");
  const workbook = XLSX.utils.table_to_book(table);

  const wb = XLSX.utils.book_new();
  const ws = workbook.Sheets.Sheet1;

  const tableWidth = calculateTableWidth(ws, maxSize);

  ws["!cols"] = tableWidth;

  XLSX.utils.book_append_sheet(wb, ws, tableName);

  handleExport(wb, fileName, fileType);
};

const handleExport = (
  wb: XLSX.WorkBook,
  fileName: string,
  fileType: string
) => {
  const date = format(new Date(), "ddMMyyyyhhmm");
  XLSX.writeFile(wb, `${fileName}-${date}.${fileType}`);
};

const removeClassToTable = (table: HTMLElement, className: string) => {
  const cloneElement = table?.cloneNode(true) as HTMLElement;

  const elementsToRemove = cloneElement?.getElementsByClassName(className);
  const elementsToRemoveArray = Array.from(elementsToRemove);

  if (elementsToRemoveArray) {
    elementsToRemoveArray.forEach((element) => {
      element.remove();
    });
  }

  return cloneElement;
};

const calculateTableWidth = (worksheet: XLSX.WorkSheet, maxSize: number) => {
  const JSONTable = XLSX.utils.sheet_to_json<string | number[]>(worksheet, {
    header: 1,
    raw: true,
    rawNumbers: true,
  });
  const maxRowSize = Math.max(...JSONTable.map((row) => row.length));
  const wchArray = Array.from({ length: maxRowSize }).map((_, rowIndex) => {
    const row = Array.from({ length: JSONTable.length }).map(
      (_, i) => String(JSONTable[i][rowIndex] ?? "").length
    );

    return { wch: Math.max(...row) > maxSize ? maxSize : Math.max(...row) };
  });

  return wchArray;
};
