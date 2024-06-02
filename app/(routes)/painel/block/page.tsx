import { BlockContent } from "./components/BlockContent";
import { blockService } from "@/app/services/block";

const Page = async () => {
  const { data } = await blockService.getAll();

  return (
    <div className="w-full">
      <BlockContent data={data} />
    </div>
  );
};

export default Page;
