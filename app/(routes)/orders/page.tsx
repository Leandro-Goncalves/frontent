import { checkoutService } from "@/app/services/checkount";
import { PrivateRouteHOC } from "@/app/utils/misc/PrivateRouteHOC";
import { OrdersContainer } from "./components/OrdersContainer";

export const revalidate = 0;

export default async function Orders() {
  return PrivateRouteHOC(async () => {
    const { data: orders } = await checkoutService.getOrders();
    return <OrdersContainer orders={orders} />;
  });
}
