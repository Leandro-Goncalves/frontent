import { Block } from "@/app/models/block";
import { blockService } from "@/app/services/block";
import { Content } from "./Content";

interface ComingSoonProps {}

export const ComingSoon: React.FC<ComingSoonProps> = async () => {
  const block = (await blockService.getActive().then((b) => b.data)) as Block;
  return <Content block={block} />;
};
