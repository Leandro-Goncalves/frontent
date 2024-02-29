import { DiscountType } from "@/app/models/cupom";
import { useCart } from "@/app/states/cart.state";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { useMemo } from "react";

interface OrderIndicatorsProps {
  fee?: number;
}

export const OrderIndicators: React.FC<OrderIndicatorsProps> = ({ fee }) => {
  const { cart, coupon } = useCart();

  const subtotal = cart.reduce(
    (total, { variant, quantity }) =>
      total + (variant.promotionalPrice || variant.price) * quantity,
    0
  );

  const discount = useMemo(() => {
    if (!coupon) return 0;
    let discountValue;

    if (coupon.discountType === DiscountType.PERCENTAGE) {
      discountValue = subtotal * (coupon.discountValue / 100);
    } else {
      discountValue = coupon.discountValue;
    }

    if (!coupon.maxDiscount) return discountValue;

    return discountValue > coupon.maxDiscount
      ? coupon.maxDiscount
      : discountValue;
  }, [coupon, subtotal]);

  const subtotalAndDiscount = subtotal - discount;
  const orderTotal =
    (fee ?? 0) + (subtotalAndDiscount < 0 ? 0 : subtotalAndDiscount);

  return (
    <div>
      <div className="flex justify-between">
        <p className="text-base font-medium">Subtotal</p>
        <p className="text-base font-bold">{toCurrencyValue(subtotal)}</p>
      </div>
      {fee && (
        <div className="flex justify-between">
          <p className="text-base font-medium">Frete</p>
          <p className="text-base font-bold">{toCurrencyValue(fee)}</p>
        </div>
      )}
      {coupon && (
        <div className="flex justify-between text-red-500">
          <p className="text-base font-medium">cupom de desconto</p>
          <p className="text-base font-bold">-{toCurrencyValue(discount)}</p>
        </div>
      )}
      <div className="flex justify-between">
        <p className="text-base font-medium">Total do pedido </p>
        <p className="text-base font-bold">{toCurrencyValue(orderTotal)}</p>
      </div>
    </div>
  );
};
