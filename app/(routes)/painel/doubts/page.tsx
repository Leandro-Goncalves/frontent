import { doubtsService } from "@/app/services/doubts";
import { DoubtsContent } from "./components/DoubtsContent";

const Page = async () => {
  const doubts = await doubtsService.getAll().catch(() => ({ data: [] }));

  return (
    <div className="w-full">
      <DoubtsContent data={doubts.data} />
    </div>
  );
};

export default Page;
