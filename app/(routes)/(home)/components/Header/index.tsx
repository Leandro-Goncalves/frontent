import env from "@/app/env";
import { establishmentService } from "@/app/services/establishment";
import { Content } from "./content";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = async () => {
  const { data: establishment } = await establishmentService.get(
    env.ESTABLISHMENT_ID
  );

  return (
    <div>
      {establishment.alert && (
        <p className="py-2 px-4 text-center bg-[#DC024F] text-white text-xs font-semibold italic">
          {establishment.alert}
        </p>
      )}
      <Content phone={establishment.phone} />
    </div>
  );
};
