import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DoubtsProps {}

const doubts = [
  {
    question: "Qual o tecido utilizado nos pijamas?",
    answer:
      "Suede. Um tecido leve, fluido e que não esquenta. Muito confortável, de textura agradável e macia, ideal para pijamas.",
  },
  {
    question: "Qual o tamanho das peças?",
    answer: "varia do 36 ao 60 dependendo do modelo.",
  },
  {
    question: "Possui loja física?",
    answer:
      "Sim, possuímos um espaço físico (Rua José Alves, 210 - Francisco Garófalo , Mococa-SP), que fica ao dispor das nossas Cacauzetes de Segunda a Sexta, das 9h ás 18h. Sábado das 9h30 ás 15h.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer:
      "Pix, dinheiro em espécie, débito e crédito (parcelamos em até 10x sem juros).",
  },
  {
    question: "Quais as formas de entrega?",
    answer:
      "Enviamos para todo Brasil, via delivery, correios e transportadora.",
  },
  {
    question: "Cobram taxa de entrega?",
    answer:
      "Todas as entregas de MOCOCA-SP são gratuítas e as compras acima de R$500,00 também. Cotamos os melhores fretes para todo Brasil.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "Trabalhamos com pronta entrega e nossos envios via correios ou transportadora são diários.",
  },
];

export const Doubts: React.FC<DoubtsProps> = () => {
  return (
    <Accordion type="multiple" className="border-t-[1px]">
      {doubts.map((doubt) => (
        <AccordionItem value={doubt.question} key={doubt.question}>
          <AccordionTrigger>{doubt.question}</AccordionTrigger>
          <AccordionContent>{doubt.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
