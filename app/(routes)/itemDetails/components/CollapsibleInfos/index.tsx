import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CollapsibleInfosProps {
  productDescription: string;
}

export const CollapsibleInfos: React.FC<CollapsibleInfosProps> = ({
  productDescription,
}) => {
  return (
    <div>
      <Accordion
        type="single"
        collapsible
        className="border-t-[1px] mt-[92px] border p-8 rounded-2xl max-sm:p-4"
      >
        <AccordionItem value="description">
          <AccordionTrigger className="font-extrabold text-sm uppercase">
            descrição
          </AccordionTrigger>
          <AccordionContent>{productDescription}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
