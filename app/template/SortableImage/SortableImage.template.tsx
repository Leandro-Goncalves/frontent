"use client";
import { Input } from "@/components/ui/input";
import { ItemDialog } from "./components/ItemDialog";
import { Prettify } from "@/app/utils/types/FunctionMap";
import { useMemo, useState } from "react";
import { QuickScore } from "quick-score";
import { useQuery } from "@tanstack/react-query";
import { CardsArea } from "./components/CardsArea";
import { queryClient } from "@/app/components/QueryProvider";

export type ActiveType = "toggle" | "radio";

export interface itemField {
  placeholder: string;
  type?: "string" | "number";
  errors?: {
    required?: string;
    type?: string;
  };
}

type Modify1<T extends Record<string, itemField>> = {
  [I in keyof T]: T[I]["type"] extends "number" ? number : string;
};
export type ItemToReturn<
  T extends Record<string, itemField>,
  I extends boolean = true
> = Prettify<
  (I extends true
    ? {
        image: File;
      }
    : {}) &
    Modify1<T>
>;

export type ItemToReturnImageNullable<
  T extends Record<string, itemField>,
  I extends boolean = true
> = Prettify<
  (I extends true
    ? {
        image?: File;
      }
    : {}) &
    Modify1<T>
>;

export type Item<showImage extends boolean = true> = (showImage extends true
  ? { image: string }
  : {}) & {
  guid: string;
  name: string;
  isActive?: boolean;
  fields: Record<
    string,
    {
      name: string;
      value: any;
    }
  >;
};

interface SortableImageTemplateProps<
  F extends Record<string, itemField>,
  ShowImage extends boolean
> {
  name: string;
  title: string;
  description: string;
  itemFields?: F;
  activeType?: ActiveType;

  showImage: ShowImage;

  addButtonMessage: string;
  addItem?: {
    onAddItem?: (item: ItemToReturn<F, ShowImage>) => Promise<void>;
    successMessage?: string;
  };
  editItem?: {
    onEditItem?: (
      guid: string,
      item: ItemToReturnImageNullable<F, ShowImage>
    ) => Promise<void>;
    successMessage?: string;
  };
  removeItem?: {
    onRemoveItem?: (guid: string) => Promise<void>;
    successMessage?: string;
  };
  onChangeVisibility?: (guid: string, isActive: boolean) => Promise<void>;
  fetchData: () => Promise<Item<ShowImage>[]>;
  initialData?: Item<ShowImage>[];
  updateItemPosition: (guids: string[]) => void;
  size: {
    width: number;
    height: number;
  };
}

export const SortableImageTemplate = <
  F extends Record<string, itemField>,
  I extends boolean
>({
  name,
  title,
  description,
  itemFields,
  addItem,
  editItem,
  addButtonMessage,
  removeItem,
  onChangeVisibility,
  fetchData,
  initialData,
  updateItemPosition,
  size,
  showImage,
  activeType,
}: SortableImageTemplateProps<F, I>) => {
  const [search, setSearch] = useState("");

  const { data, refetch } = useQuery([name], fetchData, {
    initialData,
  });

  const filteredItems = useMemo(() => {
    const items = data ?? [];
    const fieldsToSearch = Object.keys(itemFields ?? {}).map(
      (key) => `fields.${key}.value`
    );

    const qs = new QuickScore(items, fieldsToSearch);

    if (!search) return items;
    const results = qs.search(search);
    const resultsItems = results.map(({ item }) => item);

    return items.filter((item) => resultsItems.includes(item));
  }, [itemFields, data, search]);

  return (
    <div className="py-24 px-8">
      <h1 className="font-bold text-2xl">{title}</h1>
      <h3 className="font-medium text-sm">{description}</h3>

      <div className="flex gap-2 mt-8 w-full">
        <Input
          autoFocus
          id="search"
          placeholder="Pesquisar item"
          type="text"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          className="h-12"
          containerClassName="w-full max-w-md"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {addItem && (
          <ItemDialog
            showImage={showImage}
            itemFields={itemFields}
            onAddItem={async (item) => {
              if (addItem.onAddItem) {
                await addItem.onAddItem(item).then(() => refetch());
              }
            }}
            successMessage={addItem.successMessage}
            addButtonMessage={addButtonMessage}
            size={size}
          />
        )}
      </div>

      <CardsArea<F>
        activeType={activeType}
        showImage={showImage}
        filteredItems={filteredItems as any}
        addButtonMessage={addButtonMessage}
        itemFields={itemFields}
        editItem={editItem}
        removeItem={removeItem}
        onChangeVisibility={onChangeVisibility}
        refetch={refetch}
        items={(data ?? []) as any}
        updateItemPosition={(items) => {
          updateItemPosition(items.map((i) => i.guid));
          queryClient.setQueryData([name], items);
        }}
        size={size}
      />
    </div>
  );
};
