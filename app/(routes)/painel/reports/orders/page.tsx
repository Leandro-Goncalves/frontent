import { reportsService } from "@/app/services/reports";
import { OrdersTable } from "./components/OrdersTable";

export default async function Products() {
  const orders = await reportsService.findSales({ page: 0, size: 10 });

  return (
    <div className="px-7 pb-7 pt-20 w-full flex flex-col">
      <h1 className="font-bold text-2xl">Relatório de pedidos</h1>
      <OrdersTable orders={orders.data} />
    </div>
  );
}
