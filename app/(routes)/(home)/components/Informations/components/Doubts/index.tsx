import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DoubtsProps {}

const doubts = [
  {
    question: "Qual o tecido dos pijamas?",
    answer:
      "Suede. Um tecido macio, confortável, de textura muito agradável. Ideal para pijamas, pois possui boa elasticidade, promovendo muita comodidade na hora do sono ou no seu dia-a-dia. Não dá bolinhas e não encolhe após as lavagens. Estampas são em sublimação digital.",
  },
  {
    question: "Quais tamanhos vocês trabalham?",
    answer:
      "Atendemos desde o infantil feminino, vestindo 02 a 10 anos quanto o adulto feminino, vestindo do 36 ao tamanho 60 (plus size).",
  },
  {
    question: "Não trabalham com produtos masculinos?",
    answer: "No momento, não. Atendemos apenas o público feminino.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer: "Pix (5% de desconto), boleto, cartão de crédito e débito.",
  },
  {
    question: "Quais as formas de envio?",
    answer:
      "Trabalhamos com Delivery atendendo toda região de Mococa-SP, e enviamos com as melhores taxas via correios ou transportadora para todo Brasil.",
  },
  {
    question: "Qual o prazo de envio?",
    answer:
      "Realizamos envios diariamente, ou seja, seu pedido é enviado com menos de 24hrs úteis após confirmação de pagamento.",
  },
  {
    question: "Sobre o Delivery",
    answer:
      "Trabalhamos com delivery de segunda à sábado em dois horários: 11:30hrs / 17:30hrs.",
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
