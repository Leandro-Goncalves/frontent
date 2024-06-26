import { checkoutService } from "@/app/services/checkount";
import { PageContent } from "./components/PageContent";

const Page = async () => {
  const { data: orders } = await checkoutService.getAllOrders().catch(() => ({
    data: {
      delivery: [],
      takeout: [],
      cancelled: [],
      finished: [],
    },
  }));
  return (
    <div className="w-full">
      <PageContent ordersInitial={orders} />
    </div>
  );
};

export default Page;
