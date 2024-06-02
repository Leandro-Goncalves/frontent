import { PageContent } from "./components/PageContent";
import { couponService } from "@/app/services/cupom";

const Page = async () => {
  const coupon = await couponService.listAll().catch(() => ({ data: [] }));

  return (
    <div className="w-full">
      <PageContent cupons={coupon.data} />
    </div>
  );
};

export default Page;
