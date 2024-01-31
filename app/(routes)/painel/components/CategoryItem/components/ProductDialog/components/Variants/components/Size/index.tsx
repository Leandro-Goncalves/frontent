import { Input } from "@/components/ui/input";
import { NumberFormatBase } from "react-number-format";

interface SizeProps {
  size: string;
  value: number;
  setValue: (value: number) => void;
}

export const Size: React.FC<SizeProps> = ({ setValue, size, value }) => {
  return (
    <div className="flex gap-1 items-center">
      <p className="font-bold text-sm text-primary uppercase">{size}</p>
      <NumberFormatBase
        value={Number(value) ?? 0}
        onValueChange={({ value }) => setValue(Number(value))}
        customInput={Input}
        className="h-8 w-14 text-center"
      />
    </div>
  );
};
