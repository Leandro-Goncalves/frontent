import { checkoutService } from "@/app/services/checkount";
import { PageContent } from "./components/PageContent";

const Page = async () => {
  const { data: orders } = await checkoutService.getAllOrders();
  return (
    <div className="w-full h-[100vh] overflow-auto">
      <PageContent ordersInitial={orders} />
    </div>
  );
};

export default Page;
