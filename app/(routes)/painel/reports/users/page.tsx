import { reportsService } from "@/app/services/reports";
import { ClientsTable } from "./components/ClientsTable";

export default async function Products() {
  const users = await reportsService.findUsers({
    page: 0,
    size: 10,
  });

  return (
    <div className="px-7 pb-7 pt-20 w-full flex flex-col">
      <h1 className="font-bold text-2xl mb-4">Relatório de Clientes</h1>
      <ClientsTable users={users.data} />
    </div>
  );
}
