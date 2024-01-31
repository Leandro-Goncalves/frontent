"use client";

import { Order } from "@/app/models/orders";
import { OrderFilter } from "../OrderFilter";
import { OrderViewCard } from "../OrderViewCard";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkoutService, getAllOrdersReturn } from "@/app/services/checkount";

interface PageContentProps {
  ordersInitial: getAllOrdersReturn;
}

export const PageContent: React.FC<PageContentProps> = ({ ordersInitial }) => {
  const [selectedFilter, setSelectedFilter] = useState<
    "delivery" | "takeout" | "canceled" | "completed"
  >("delivery");

  const { data: orders } = useQuery({
    initialData: ordersInitial,

    queryKey: ["allOrders"],
    queryFn: () => checkoutService.getAllOrders().then((r) => r.data),
  });

  const selectedOrders = useMemo(() => {
    if (selectedFilter === "delivery") {
      return orders.delivery;
    }

    if (selectedFilter === "takeout") {
      return orders.takeout;
    }

    if (selectedFilter === "canceled") {
      return orders.cancelled;
    }

    return [];
  }, [selectedFilter, orders]);

  return (
    <div className="py-24 px-16">
      <OrderFilter
        delivery={orders.delivery.length}
        takeout={orders.takeout.length}
        canceled={orders.cancelled.length}
        completed={0}
        onChangeFilter={setSelectedFilter}
        selectedFilter={selectedFilter}
      />
      <div className="flex flex-col gap-4 mt-7">
        {selectedOrders.map((o) => (
          <OrderViewCard
            key={o.guid}
            order={o}
            isDelivery={selectedFilter === "delivery"}
            isCancelled={selectedFilter === "canceled"}
          />
        ))}
      </div>
    </div>
  );
};
