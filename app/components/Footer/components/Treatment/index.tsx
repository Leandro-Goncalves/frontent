import { MessageCircleHeart } from "@/app/assets/MessageCircleHeart";
import { sendWhatsappMessage } from "@/app/utils/misc/sendWhatsappMessage";

interface TreatmentProps {
  phone: string;
  className?: string;
}

export const Treatment: React.FC<TreatmentProps> = ({ phone, className }) => {
  return (
    <div className={className}>
      <p className="font-bold text-lg text-primary">Atendimento</p>
      <button
        onClick={() => {
          sendWhatsappMessage(phone, "Olá, gostaria de mais informações");
        }}
        className="my-1 text-sm font-bold text-foreground flex gap-2 items-center py-3 px-5 border border-primary rounded-full"
      >
        <MessageCircleHeart className="w-6 h-6" color="stroke-primary" /> Nosso
        WhatsApp
      </button>
      <p className="max-w-[252px] text-sm">
        Segunda a sexta das 9h as 18h, exceto feriados (horário de Brasilia)
      </p>
    </div>
  );
};
