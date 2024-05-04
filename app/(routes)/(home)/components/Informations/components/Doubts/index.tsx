import { doubtsService } from "@/app/services/doubts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DoubtsProps {}
export const Doubts: React.FC<DoubtsProps> = async () => {
  const doubts = await doubtsService.getAll();

  return (
    <Accordion type="multiple" className="border-t-[1px]">
      {doubts.data.map((doubt) => (
        <AccordionItem value={doubt.question} key={doubt.question}>
          <AccordionTrigger>{doubt.question}</AccordionTrigger>
          <AccordionContent>{doubt.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
