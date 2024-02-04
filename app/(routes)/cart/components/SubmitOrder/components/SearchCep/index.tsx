import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PackageCheck } from "lucide-react";
import { freightService } from "@/app/services/freight";
import { useState } from "react";
import { useCart } from "@/app/states/cart.state";
import { PatternFormat } from "react-number-format";
import { CepItem } from "../CepItem";
import { Icons } from "@/components/icons";

interface SearchCepProps {
  setSelectedFreight: React.Dispatch<React.SetStateAction<any>>;
  selectedFreight: any;
  selectedCEP: string;
  setSelectedCEP: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchCep: React.FC<SearchCepProps> = ({
  selectedFreight,
  setSelectedFreight,
  selectedCEP,
  setSelectedCEP,
}) => {
  const [freights, setFreights] = useState<any[]>([]);
  const cart = useCart((state) => state.cart);
  const [isFetching, setIsFetching] = useState(false);

  const handleCalculateFreight = async () => {
    if (selectedCEP.length !== 8 || isFetching) return;
    setIsFetching(true);
    try {
      const { data: freightList } = await freightService.calculate({
        from: "13736815",
        to: selectedCEP,
        products: cart.map(({ product, quantity }) => ({
          id: product.uuid,
          quantity,
          width: 30,
          height: 5,
          length: 40,
          weight: 10,
        })),
      });
      setFreights(freightList);
    } finally {
      setIsFetching(false);
      setSelectedFreight(undefined);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex gap-2">
        <PatternFormat
          className="w-full"
          format="#####-###"
          allowEmptyFormatting
          mask="_"
          customInput={Input}
          value={selectedCEP}
          onValueChange={(e) => setSelectedCEP(e.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCalculateFreight();
            }
          }}
        />
        <Button
          onClick={handleCalculateFreight}
          disabled={selectedCEP.length !== 8 || isFetching}
        >
          {isFetching && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Calcular
        </Button>
      </div>

      {freights.length > 0 && (
        <p className="text-sm font-bold flex gap-1 text-black items-center mt-6 mb-3">
          <PackageCheck /> Escolha o seu frete favorito
        </p>
      )}

      {freights.map((freight) => (
        <CepItem
          key={freight.id}
          freight={freight}
          onClick={(freights) => setSelectedFreight(freights)}
          isSelected={selectedFreight?.id === freight.id}
        />
      ))}
    </div>
  );
};
