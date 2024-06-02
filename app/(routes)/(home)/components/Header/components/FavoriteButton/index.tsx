import { Heart } from "lucide-react";
import { useFavorites } from "@/app/states/favorites.state";
import { IconButton } from "../IconButton";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {}

export const FavoriteButton: React.FC<FavoriteButtonProps> = () => {
  const routes = useRouter();
  const favorites = useFavorites((state) => state.favorites);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          badge={favorites.length}
          icon={<Heart className="w-6 h-6 text-foreground" />}
          onClick={() => {}}
          title="Favoritos"
        />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <p className="text-sm font-bold">Favoritos</p>
        <div className="flex flex-col items-start">
          {favorites.map((item) => (
            <Button
              variant="link"
              key={item.uuid}
              className="p-0"
              onClick={() => {
                routes.push(
                  `/itemDetails/${item.uuid}?v=${item.selectedVariant.guid}`
                );
              }}
            >
              <p className="text-sm overflow-ellipsis whitespace-nowrap overflow-hidden max-w-[300px]">
                {item.name}
              </p>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
