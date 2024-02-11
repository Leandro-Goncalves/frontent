"use client";

import { Order, OrderStatus } from "@/app/models/orders";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CancelOrderButton } from "../CancelOrderButton";
import { useMemo } from "react";
import { ArchiveRestore, Truck } from "lucide-react";
import { FinishedOrderButton } from "../FinishedOrderButton";

interface OrderViewCardProps {
  order: Order;
  isDelivery: boolean;
  isCancelled: boolean;
  isFinished: boolean;
}

export const OrderViewCard: React.FC<OrderViewCardProps> = ({
  order,
  isDelivery,
  isCancelled,
  isFinished,
}) => {
  const Status = useMemo(() => {
    if (isCancelled) return <></>;
    if (isFinished) return <></>;

    if (isDelivery) {
      return (
        <div className="px-2 py-1 rounded-md bg-[#FFCC6D] flex items-center text-black">
          <Truck className="mr-1 w-4 h-4" />
          <p className="text-sm font-bold">ESPERANDO ENTREGA</p>
        </div>
      );
    }

    return (
      <div className="px-2 py-1 rounded-md bg-[#FFCC6D] flex items-center text-black">
        <ArchiveRestore className="mr-1 w-4 h-4" />
        <p className="text-sm font-bold">ESPERANDO RETIRADA</p>
      </div>
    );
  }, [isDelivery, isCancelled, isFinished]);

  return (
    <div className="group rounded-lg overflow-hidden border-[#DC024F] cursor-pointer border-[2px] border-opacity-10">
      <div className="flex p-4 bg-[#DC024F] bg-opacity-10 flex-col items-start">
        <div className="flex w-full justify-between align-top mb-2 max-[500px]:flex-col max-[500px]:gap-2">
          <p className="text-sm font-normal text-start px-2 py-1 bg-[#EAAEBF] rounded-md">
            PEDIDO N° {order.guid.split("-").slice(0, 2).join("-")}
          </p>
          {Status}
        </div>
        <div className="flex w-full">
          <div className="mr-6">
            <p className="text-sm font-bold text-start">PEDIDO REALIZADO</p>
            <p className="text-sm font-medium">
              {format(order.createdAt, "d 'de' LLLL 'de' yyyy", {
                locale: ptBR,
              })}
            </p>
          </div>
          <div className="mr-auto">
            <p className="text-sm font-bold text-start">TOTAL</p>
            <p className="text-sm font-medium">
              {toCurrencyValue(order.total)}
            </p>
          </div>
          <div className="mt-auto flex gap-4">
            {![OrderStatus.finished, OrderStatus.cancelled].includes(
              order.status
            ) && <CancelOrderButton orderId={order.guid} />}

            {![OrderStatus.finished, OrderStatus.cancelled].includes(
              order.status
            ) && <FinishedOrderButton orderId={order.guid} />}
          </div>
        </div>
      </div>
      {order.products.map((product, index) => (
        <div
          key={product.id}
          className="p-4 text-start border-t-[2px] border-[#DC024F] border-opacity-10 group-hover:border-opacity-100 transition-all"
          style={{
            borderTopWidth: index === 0 ? 0 : 2,
          }}
        >
          <div>
            <p className="text-sm font-medium">
              x{product.quantity} - {product.title}
            </p>
            <p className="text-sm font-medium">
              {toCurrencyValue(product.unit_price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
