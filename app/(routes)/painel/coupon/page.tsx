import { Cupom } from "@/app/models/cupom";
import { PageContent } from "./components/PageContent";
import { couponService } from "@/app/services/cupom";

const Page = async () => {
  const coupon = await couponService.listAll();

  return (
    <div className="w-full h-[100vh] overflow-auto">
      <PageContent cupons={coupon.data} />
    </div>
  );
};

export default Page;
