"use client";
import { getSize } from "@/app/(routes)/itemDetails/components/Sizes";
import { ProductOrder } from "@/app/models/orders";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { AccordionHeader } from "@radix-ui/react-accordion";
import { useState } from "react";

interface OrderLineProps {
  orders: ProductOrder[];
}

export const OrderLine: React.FC<OrderLineProps> = ({ orders }) => {
  const firstOrder = orders.slice(0, 2);
  const lastOrders = orders.slice(2, orders.length);

  if (lastOrders.length > 0) {
    console.log(orders);
  }

  const [showMore, setShowMore] = useState("");

  return (
    <div>
      {firstOrder.map(({ id, quantity, title, variant, sizeGuid }, i) => (
        <div key={`${id}-${i}`}>
          <p>
            {quantity}x {title}-{variant.name} ({getSize(sizeGuid)?.name})
          </p>
        </div>
      ))}
      {lastOrders.length > 0 && (
        <Accordion
          type="single"
          collapsible
          value={showMore}
          onValueChange={setShowMore}
        >
          <AccordionItem value="more" className="border-b-0 w-auto">
            <AccordionContent className="p-0">
              <div>
                {lastOrders.map(
                  ({ id, quantity, title, variant, sizeGuid }, i) => (
                    <div key={`${id}-${i}`}>
                      {quantity}x {title}-{variant.name} (
                      {getSize(sizeGuid)?.name})
                    </div>
                  )
                )}
              </div>
            </AccordionContent>
            <AccordionHeader asChild>
              <AccordionTrigger
                className={cn(
                  "p-0 pt-1",
                  showMore ? "max-w-[8rem]" : "max-w-[7rem]"
                )}
              >
                {showMore ? "Mostrar menos" : "Mostrar mais"}
              </AccordionTrigger>
            </AccordionHeader>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};
