import { Order, OrderStatus } from "@/app/models/orders";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { StatusOrder } from "./components/StatusOrder";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { categoryService } from "@/app/services/category";
import env from "@/app/env";
import Swal from "sweetalert2";
import { allSizesArray } from "@/app/(routes)/itemDetails/components/Sizes";
import { AddProductDTO, useCart } from "@/app/states/cart.state";
import { Progress } from "@/components/ui/progress";
import { RemainTimeProgress } from "./components/RemainTimeProgress";

interface OrderCardProps {
  order: Order;
}

type alertDataObjectFunction = (
  isTakeout: boolean,
  trackId?: string,
  isFixedFee?: boolean
) => Record<OrderStatus, { text: string; color: string; textColor?: string }>;

const alertDataObject: alertDataObjectFunction = (
  isTakeout,
  trackId,
  isFixedFee
) => {
  const paymentSuccessText = () => {
    if (isTakeout) {
      return "aguardando retirada";
    }

    if (trackId) {
      return "clique aqui para rastrear sua encomenda";
    }

    if (isFixedFee) {
      return "dentro de alguns dias voce receberá sua encomenda";
    }

    return "dentro de alguns dias voce receberá o código de rastreio.";
  };
  return {
    [OrderStatus.success]: {
      text: `Pagamento concluído, ${paymentSuccessText()}`,
      color: "#4bb543",
      textColor: "text-white",
    },
    [OrderStatus.pending]: {
      text: "Pagamento pendente, clique no card para pagar (o pedido sera cancelado em 30 minutos)",
      color: "#FFCC6D",
    },
    [OrderStatus.finished]: {
      text: `Pagamento finalizado, obrigado por comprar conosco`,
      color: "#4bb543",
      textColor: "text-white",
    },
    cancelled: {
      text: "Seu pedido foi cancelado, clique no card para recolocar no carrinho",
      color: "#fe4a4a",
      textColor: "text-white",
    },
  };
};

export const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const alertData = alertDataObject(
    (order as any).freightId === undefined,
    order.tracking,
    (order as any).isFixedFee
  )[order.status];
  const { addProduct } = useCart();

  const successAction = (trackId?: string) => {
    if (trackId) {
      window.open(
        `https://app.melhorrastreio.com.br/app/melhorenvio/${trackId}`
      );
    }
  };

  const pendingAction = () => {
    window.open(order.paymentLink);
  };

  const canceledAction = async () => {
    const { data: categories } = await categoryService.gelAll(
      env.ESTABLISHMENT_ID
    );

    let state: "success" | "partial" | "failed" = "success";
    const productsToAdd: AddProductDTO[] = [];
    const allProductsArray = categories.flatMap((c) => c.Products);

    order.products.forEach((orderProduct) => {
      const product = allProductsArray.find(
        (product) => product.uuid === orderProduct.id
      );

      if (product) {
        const selectedVariant = product.variants.find(
          (v) => v.guid === orderProduct.variant.guid
        );
        if (selectedVariant) {
          const size = selectedVariant.size.find(
            (s: any) => s.sizeUuid === orderProduct.sizeGuid
          );
          const { name: sizeName, guid: sizeGuid } =
            allSizesArray.find((s) => s.guid === (size as any).sizeUuid) ?? {};
          if (size && sizeName && sizeGuid) {
            if (size.quantity >= orderProduct.quantity) {
              productsToAdd.push({
                product: {
                  ...product,
                  variants: product.variants.map((v) => ({
                    ...v,
                    size: v.size.map((s) => {
                      const correctSize = allSizesArray.find(
                        (s2) => s2.guid === (s as any).sizeUuid
                      );
                      return {
                        name: correctSize?.name ?? s.name,
                        quantity: s.quantity,
                        uuid: correctSize?.guid ?? s.uuid,
                      };
                    }),
                  })),
                },
                quantity: orderProduct.quantity,
                variant: {
                  ...selectedVariant,
                  size: selectedVariant.size.map((s) => {
                    const correctSize = allSizesArray.find(
                      (s2) => s2.guid === (s as any).sizeUuid
                    );
                    return {
                      name: correctSize?.name ?? s.name,
                      quantity: s.quantity,
                      uuid: correctSize?.guid ?? s.uuid,
                    };
                  }),
                },
                size: {
                  name: sizeName,
                  quantity: orderProduct.quantity,
                  uuid: sizeGuid,
                },
              });
            } else {
              console.log("partial 0");
              state = "partial";
            }
          } else {
            console.log("partial 1");
            state = "partial";
          }
        } else {
          console.log("partial 2");
          state = "partial";
        }
      } else {
        console.log("partial 3");
        state = "partial";
      }
    });

    if (productsToAdd.length === 0) {
      state = "failed";
      await Swal.fire({
        icon: "error",
        title: "Itens não disponíveis",
        text: "Os itens do seu pedido não estão mais disponíveis",
      });
    }

    if ((state as any) === "partial") {
      await Swal.fire({
        icon: "warning",
        title: "Itens não disponíveis",
        text: "Alguns dos itens do seu pedido não estão mais disponíveis",
      });
    }

    productsToAdd.forEach((p) => {
      addProduct(p);
    });
  };

  const handleClick = () => {
    if (order.status === OrderStatus.pending) pendingAction();
    if (order.status === OrderStatus.cancelled) canceledAction();
    if (order.status === OrderStatus.success) successAction(order.tracking);
  };

  return (
    <button
      className="group rounded-lg overflow-hidden border-[#DC024F] cursor-pointer border-[2px] border-opacity-10 hover:border-opacity-100 transition-all"
      onClick={handleClick}
    >
      {alertData && (
        <div className={cn(`p-4 bg-[${alertData.color}]`)}>
          <p className={cn("text-base font-medium", alertData.textColor)}>
            {alertData.text}
          </p>
          <RemainTimeProgress order={order} />
        </div>
      )}
      <div className="flex p-4 bg-[#DC024F] bg-opacity-10 flex-col items-start">
        <div className="flex w-full justify-between align-top mb-2 max-[500px]:flex-col max-[500px]:gap-2">
          <p className="text-sm font-normal text-start px-2 py-1 bg-[#EAAEBF] rounded-md">
            PEDIDO N° {order.guid.split("-").slice(0, 2).join("-")}
          </p>
          <StatusOrder status={order.status} />
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
        </div>
      </div>
      {order.products.map((product, index) => {
        const size = allSizesArray.find((s) => s.guid === product.sizeGuid);

        return (
          <div
            key={product.id}
            className="p-4 text-start border-t-[2px] border-[#DC024F] border-opacity-10 group-hover:border-opacity-100 transition-all"
            style={{
              borderTopWidth: index === 0 ? 0 : 2,
            }}
          >
            <div>
              <p className="text-sm font-medium">
                x{product.quantity} ({size?.name.toLocaleUpperCase()}){" "}
                {product.title} - {product.variant.name}
              </p>
              <p className="text-sm font-medium">
                {toCurrencyValue(product.unit_price)}
              </p>
            </div>
          </div>
        );
      })}
    </button>
  );
};
