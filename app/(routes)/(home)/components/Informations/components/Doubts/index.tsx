import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DoubtsProps {}

const doubts = [
  {
    question: "Quais são os tecidos mais confortáveis para pijamas?",
    answer:
      "Recomendamos tecidos como algodão, flanela e modal, pois são macios, respiráveis e ideais para uma boa noite de sono.",
  },

  {
    question: "Como escolher o tamanho correto de pijama?",
    answer:
      "Sugerimos que consulte nossa tabela de tamanhos, geralmente disponível online, e leve em consideração suas medidas para encontrar o pijama que ofereça o ajuste perfeito.",
  },

  {
    question: "Vocês têm opções de pijamas para todas as estações do ano?",
    answer:
      "Sim, oferecemos uma variedade de pijamas leves para o verão e opções mais quentes para o inverno. Assim, você pode encontrar a peça perfeita independentemente da estação.",
  },

  {
    question:
      "É possível personalizar ou gravar nomes nos pijamas como presente?",
    answer:
      "Sim, oferecemos serviços de personalização, incluindo a opção de gravar nomes. Isso torna os pijamas um presente único e especial.",
  },

  {
    question:
      "Como cuidar adequadamente dos pijamas para garantir durabilidade?",
    answer:
      "Recomendamos lavar os pijamas de acordo com as instruções de cuidado na etiqueta, geralmente em água fria, para preservar as cores e a textura. Evite o uso de alvejantes e seque as peças ao ar livre ou em temperatura baixa.",
  },
];

export const Doubts: React.FC<DoubtsProps> = () => {
  return (
    <Accordion type="single" collapsible className="border-t-[1px]">
      {doubts.map((doubt) => (
        <AccordionItem value={doubt.question} key={doubt.question}>
          <AccordionTrigger>{doubt.question}</AccordionTrigger>
          <AccordionContent>{doubt.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
