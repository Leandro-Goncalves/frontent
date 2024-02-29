import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ProductModel } from "../..";
import { Variant } from "./components/Variant";

interface VariantsProps {
  form: UseFormReturn<ProductModel, any>;
}

export const Variants: React.FC<VariantsProps> = ({ form }) => {
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="grid mt-9 after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
      <div className="flex flex-col">
        <Button
          className="self-start"
          onClick={() => {
            append({
              images: {
                0: undefined,
                1: undefined,
                2: undefined,
                3: undefined,
              },
              sizes: [],
            });
          }}
        >
          <PlusCircle size={18} className="mr-2" /> Adicionar variante
        </Button>

        <div className="flex flex-col gap-2 mt-4">
          {fields.map((variant, index) => (
            <Variant
              key={variant.id}
              form={form as any}
              index={index}
              onRemove={() => remove(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
