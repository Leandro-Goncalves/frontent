import { feedbackService } from "@/app/services/feedback";
import { FeedbackContent } from "./components/FeedbackContent";
import env from "@/app/env";

const Page = async () => {
  const fabrics = await feedbackService
    .getAll(env.ESTABLISHMENT_ID)
    .catch(() => ({ data: [] }));

  return (
    <div className="w-full">
      <FeedbackContent data={fabrics.data} />
    </div>
  );
};

export default Page;
