import { FabricContent } from "./components/FabricContent";
import { fabricsService } from "@/app/services/fabrics";

const Page = async () => {
  const fabrics = await fabricsService.getAll().catch(() => ({ data: [] }));

  return (
    <div className="w-full h-[100vh] overflow-auto">
      <FabricContent data={fabrics.data} />
    </div>
  );
};

export default Page;
