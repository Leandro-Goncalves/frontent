import { OrderStatus } from "@/app/models/orders";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface StatusOrderProps {
  status: OrderStatus;
}

export const StatusOrder: React.FC<StatusOrderProps> = ({ status }) => {
  if (status === OrderStatus.finished) {
    return <></>;
  }

  if (status === OrderStatus.success) {
    return (
      <div className="px-2 py-1 rounded-md bg-[#4bb543] flex items-center text-white">
        <CheckCircle2 className="mr-1 w-4 h-4" />
        <p className="text-sm font-bold">PAGAMENTO CONCLUÍDO</p>
      </div>
    );
  }

  if (status === OrderStatus.cancelled || status === OrderStatus.expired) {
    return (
      <div className="px-2 py-1 rounded-md bg-[#fe4a4a] flex items-center text-white">
        <XCircle className="mr-1 w-4 h-4" />
        <p className="text-sm font-bold">CANCELADO</p>
      </div>
    );
  }

  return (
    <div className="px-2 py-1 rounded-md bg-[#FFCC6D] flex items-center">
      <Clock className="mr-1 w-4 h-4" />
      <p className="text-sm font-bold">PAGAMENTO PENDENTE</p>
    </div>
  );
};
