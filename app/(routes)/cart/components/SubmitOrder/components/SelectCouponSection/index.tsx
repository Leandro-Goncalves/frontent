import { couponService } from "@/app/services/cupom";
import { useCart } from "@/app/states/cart.state";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Info, X } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

interface SelectCouponSectionProps {}

export const SelectCouponSection: React.FC<SelectCouponSectionProps> = () => {
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const addCoupon = useCart((state) => state.addCoupon);
  const coupon = useCart((state) => state.coupon);
  const removeCoupon = useCart((state) => state.removeCoupon);
  const cart = useCart((state) => state.cart);

  const subtotal = cart.reduce(
    (total, { variant, quantity }) =>
      total + (variant.promotionalPrice || variant.price) * quantity,
    0
  );

  const payToReachMinValue = useMemo(() => {
    if (!coupon || !coupon.minimumValue) return 0;

    return coupon.minimumValue - subtotal;
  }, [coupon, subtotal]);

  const handleApplyCoupon = async () => {
    setCouponLoading(true);
    await couponService
      .get(couponCode)
      .then((res) => {
        addCoupon(res.data);
        toast.success("Cupom aplicado com sucesso!");
        setCouponCode("");
      })
      .catch((e) => {
        if (e.response.data?.message) {
          toast.error(e.response.data.message);
        }
      });
    setCouponLoading(false);
  };

  return (
    <div>
      <p className="text-sm font-bold text-primary">Cupom:</p>
      {coupon ? (
        <div className="mt-2">
          <div className="flex justify-between items-center pt-">
            <p className="text-lg font-bold">{coupon.code}</p>
            <Button
              size={"icon"}
              className="rounded-full w-8 h-8"
              onClick={removeCoupon}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          {payToReachMinValue > 0 && (
            <div>
              <p className="text-sm font-bold text-red-600 my-1 flex items-center">
                <Info className="w-4 h-4 inline mr-2" />
                Falta {toCurrencyValue(payToReachMinValue)} para você poder
                utilizar o cupom
              </p>
              <Progress value={(subtotal / (coupon.minimumValue ?? 0)) * 100} />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2">
          <div className="flex gap-2 w-full">
            <Input
              containerClassName={"w-full"}
              value={couponCode}
              width={"full"}
              onChange={(e) => {
                setCouponCode(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApplyCoupon();
                }
              }}
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={couponLoading}
              className="w-[105px]"
            >
              Aplicar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
