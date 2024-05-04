import { Input } from "@/components/ui/input";
import { allSizesArray } from "@/app/(routes)/itemDetails/components/Sizes";
import {
  FieldArrayWithId,
  UseFormReturn,
  useFieldArray,
} from "react-hook-form";
import { ProductModel } from "../../../..";
import { CurrencyInput } from "@/app/components/CurrencyInput";
import { ImageButton } from "../ImageButton";
import { Button } from "@/components/ui/button";
import { Star, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Size } from "../Size";
import { cn } from "@/lib/utils";

interface VariantProps {
  form: UseFormReturn<ProductModel, any>;
  index: number;
  onRemove: () => void;
}

export const Variant: React.FC<VariantProps> = ({ form, index, onRemove }) => {
  const {
    register,
    setValue,
    control,
    watch,
    formState: { errors },
  } = form;
  const variant = watch(`variants.${index}`);
  const images = watch(`variants.${index}.images`);

  const { fields, append, update } = useFieldArray({
    control,
    name: `variants.${index}.sizes`,
  });

  return (
    <div className="border-2 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <Button
          id="favorite"
          className="bg-transparent hover:bg-transparent"
          size="icon"
          onClick={() => {
            setValue(`variants.${index}.isFavorite`, !variant.isFavorite);
          }}
        >
          <Star
            className={cn(
              "transition-colors",
              variant.isFavorite
                ? "text-[#ffb753] fill-[#ffb753]"
                : "text-foreground"
            )}
          />
        </Button>
        <Label htmlFor="favorite">Favorito</Label>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Label htmlFor="variant-name">Nome</Label>
          <Input
            id="variant-name"
            placeholder="Nome"
            {...register(`variants.${index}.name`)}
            error={errors?.variants?.[index]?.name?.message}
          />
        </div>
        <div>
          <Label htmlFor="variant-value">Valor</Label>
          <CurrencyInput
            id="variant-value"
            placeholder="Valor"
            value={Number(variant.price ?? 0) * 100}
            onValueChange={({ value }) =>
              setValue(`variants.${index}.price`, Number(value) / 100, {
                shouldValidate: true,
              })
            }
            error={errors?.variants?.[index]?.price?.message}
          />
        </div>
        <div>
          <Label htmlFor="variant-promotional-price">Valor promocional</Label>
          <CurrencyInput
            id="variant-promotional-price"
            placeholder="Valor promocional"
            value={Number(variant.promotionalPrice ?? 0) * 100}
            onValueChange={({ value }) => {
              setValue(
                `variants.${index}.promotionalPrice`,
                Number(value) / 100,
                {
                  shouldValidate: true,
                }
              );
            }}
            error={errors?.variants?.[index]?.promotionalPrice?.message}
          />
        </div>
        <Button size={"icon"} onClick={onRemove} className="mt-6">
          <Trash size={24} />
        </Button>
      </div>
      <p className="font-bold text-sm text-primary mt-9">Tamanhos</p>
      <div className="flex gap-2 mt-2 items-center">
        {allSizesArray.map((size) => (
          <Size
            key={size.guid}
            value={
              variant.sizes?.find((s) => s.sizeGuid === size.guid)?.quantity ??
              0
            }
            setValue={(value) => {
              const fIndex = fields.findIndex((v) => v.sizeGuid === size.guid);
              if (fIndex === -1) {
                append({
                  sizeGuid: size.guid,
                  quantity: value,
                });
                return;
              }
              update(fIndex, { sizeGuid: size.guid, quantity: value });
            }}
            size={size.name}
          />
        ))}
        {errors?.variants?.[index]?.sizes?.message && (
          <p className="text-red-700  text-sm">
            {errors?.variants?.[index]?.sizes?.message}
          </p>
        )}
      </div>
      <p className="font-bold text-sm text-primary mt-9 mb-4">
        Carregar imagens
      </p>
      <div className="grid grid-cols-4 items-center">
        <ImageButton
          image={images["0"]}
          setImage={(image) => {
            setValue(`variants.${index}.images`, {
              ...images,
              "0": image,
            });
          }}
        />
        <ImageButton
          image={images["1"]}
          setImage={(image) => {
            setValue(`variants.${index}.images`, {
              ...images,
              "1": image,
            });
          }}
        />
        <ImageButton
          image={images["2"]}
          setImage={(image) => {
            setValue(`variants.${index}.images`, {
              ...images,
              "2": image,
            });
          }}
        />
        <ImageButton
          image={images["3"]}
          setImage={(image) => {
            setValue(`variants.${index}.images`, {
              ...images,
              "3": image,
            });
          }}
        />
      </div>
    </div>
  );
};
