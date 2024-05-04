"use client";
import { Order } from "@/app/models/orders";
import { IconInput } from "@/components/ui/iconInput";
import { Package, Search } from "lucide-react";
import { QuickScore } from "quick-score";
import { useMemo, useState } from "react";
import { OrderCard } from "../OrderCard";

interface OrdersContainerProps {
  orders: Order[];
}

export const OrdersContainer: React.FC<OrdersContainerProps> = ({ orders }) => {
  const [search, setSearch] = useState("");

  const ordersFiltered = useMemo(() => {
    if (!search) return orders;
    const qs = new QuickScore(orders, ["guid"]);

    const results = qs.search(search);
    return results.map(({ item }) => item);
  }, [orders, search]);

  return (
    <div className="max-w-[1200px] mx-auto p-4 pt-16">
      <div className="flex items-center mb-5">
        <Package className="ml-2" />
        <h2 className="text-base font-bold mr-auto">Meus pedidos</h2>
        <IconInput
          icon={<Search className="w-5 h-5" />}
          className="max-w-[700px] bg-transparent border-foreground w-full"
          placeholder="O que você procura?"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-4">
        {ordersFiltered.map((order) => (
          <OrderCard key={order.guid} order={order} />
        ))}
      </div>
    </div>
  );
};
