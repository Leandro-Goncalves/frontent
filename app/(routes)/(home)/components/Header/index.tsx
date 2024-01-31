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
      <Content phone={establishment.phone} alert={establishment.alert} />
    </div>
  );
};
