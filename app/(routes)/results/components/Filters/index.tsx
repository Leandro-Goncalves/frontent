"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Category } from "@/app/models/category";
import { Results } from "../../page";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Selector } from "../Selector";
import { Input } from "@/components/ui/input";
import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/(routes)/(home)/components/Catalog/components/Product";
import {
  filterProducts,
  formatProducts,
} from "@/app/utils/misc/formatProducts";
import { Products } from "@/app/models/products";
import { allSizesArray } from "@/app/(routes)/itemDetails/components/Sizes";

interface FiltersProps {
  installments: number;
  searchParams: Results["searchParams"];
  Products: Products[];
}
export const Filters: React.FC<FiltersProps> = ({
  installments,
  searchParams,
  Products,
}) => {
  const initialSize = useMemo(() => {
    if (!searchParams.sizes) return [];
    return Array.isArray(searchParams.sizes)
      ? searchParams.sizes
      : [searchParams.sizes];
  }, [searchParams.sizes]);
  const [min, setMin] = useState(Number(searchParams.min || 0));
  const [max, setMax] = useState(Number(searchParams.max || 500));
  const form = useForm<Results["searchParams"]>({
    defaultValues: {
      max: searchParams.max,
      min: searchParams.min,
      sizes: initialSize,
    },
  });
  const router = useRouter();

  const handleGoToCategory = useCallback(() => {
    const formData = form.getValues();
    const parsedData = queryString.stringify(formData);
    router.push(`/results?${parsedData}`);
  }, [form, router]);

  const products = useMemo(() => {
    const p = formatProducts(Products);
    return filterProducts(
      p,
      Number(searchParams.min ?? "0"),
      Number(searchParams.max ?? "500"),
      initialSize
    );
  }, [Products, searchParams, initialSize]);

  return (
    <>
      <div className="flex  gap-8 p-4 flex-col max-w-[900px] items-center mx-auto mb-4">
        <h2 className="text-2xl font-extrabold">FILTROS</h2>

        <div className="flex max-[800px]:flex-col gap-4 items-start">
          <div>
            <h3>Tamanho</h3>
            <ToggleGroup
              type="multiple"
              className="justify-start"
              onValueChange={(s) => {
                form.setValue("sizes", s);
              }}
              value={form.watch("sizes")}
            >
              {allSizesArray.map(({ guid, name }) => (
                <ToggleGroupItem
                  key={guid}
                  value={guid}
                  className="bg-[#fa9dc0] hover:text-white data-[state=on]:text-white data-[state=on]:bg-primary hover:bg-primary"
                >
                  {name.toLocaleUpperCase()}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          {/* <Selector
        placeholder="Categoria"
        options={categories.map((c) => c.name)}
        value={form.watch("c")}
        onChange={(c) => form.setValue("c", c)}
      /> */}

          <div>
            <h3>Preço</h3>
            <div className="flex gap-4">
              <NumericFormat
                decimalSeparator=","
                thousandSeparator="."
                prefix="R$ "
                placeholder="Mínimo:"
                value={min}
                customInput={Input}
                onValueChange={(e) => {
                  setMin(Number(e.value));
                }}
              />
              <NumericFormat
                decimalSeparator=","
                thousandSeparator="."
                prefix="R$ "
                placeholder="Máximo:"
                value={max}
                customInput={Input}
                onValueChange={(e) => {
                  setMax(Number(e.value));
                }}
              />
            </div>
            <Slider
              className="mt-6"
              value={[min, max]}
              minStepsBetweenThumbs={4}
              max={500}
              step={5}
              onValueChange={([min, max]) => {
                setMin(min);
                setMax(max);
              }}
              onValueCommit={([min, max]) => {
                form.setValue("min", String(min));
                form.setValue("max", String(max));
              }}
            />
          </div>
          <Button
            onClick={handleGoToCategory}
            className="w-full max-[800px]:max-w-[458px] mt-[25px] max-[800px]:mt-0 max-w-[200px]"
          >
            Aplicar Filtro
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 justify-items-center max-2xl:grid-cols-4 max-[1150px]:grid-cols-3 max-[880px]:grid-cols-2 max-[850px]:grid-cols-1 overflow-hidden">
        {products.map((product) => (
          <Product
            key={product.selectedVariant.guid}
            product={product}
            installments={installments}
            selectedVariant={product.selectedVariant}
          />
        ))}
      </div>
    </>
  );
};
