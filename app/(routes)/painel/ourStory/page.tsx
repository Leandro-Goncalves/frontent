import env from "@/app/env";
import { establishmentService } from "@/app/services/establishment";
import { OurStoryContent } from "./components/OurStoryContent";

const Page = async () => {
  const establishment = await establishmentService.get(env.ESTABLISHMENT_ID);

  return (
    <div className="w-full">
      <OurStoryContent data={establishment.data} />
    </div>
  );
};

export default Page;
