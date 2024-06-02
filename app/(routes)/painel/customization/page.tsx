import env from "@/app/env";
import { establishmentService } from "@/app/services/establishment";
import { CustomizationContent } from "./components/CustomizationContent";

const Page = async () => {
  const establishment = await establishmentService.get(env.ESTABLISHMENT_ID);

  return (
    <div className="w-full">
      <CustomizationContent data={establishment.data} />
    </div>
  );
};

export default Page;
