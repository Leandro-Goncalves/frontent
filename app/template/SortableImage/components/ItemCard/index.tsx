import Image from "next/image";
import {
  ActiveType,
  Item,
  ItemToReturnImageNullable,
  itemField,
} from "../../SortableImage.template";
import { VisibilitySwitch } from "@/app/(routes)/painel/components/CategoryItem/components/VisibilitySwitch";
import { ItemDialog } from "../ItemDialog";
import { RemoveButton } from "@/app/(routes)/cart/components/ActionsCart/components/RemoveButton";
import { Button } from "@/components/ui/button";
import { Menu, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import { LoadingIndicator } from "./components/LoadingIndicator";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ItemCardProps<
  F extends Record<string, itemField> = Record<string, itemField>
> {
  activeType?: ActiveType;
  item: Item;
  addButtonMessage: string;
  itemFields?: F;
  removeItem?: {
    onRemoveItem?: (guid: string) => Promise<void>;
    successMessage?: string;
  };
  editItem?: {
    onEditItem?: (
      guid: string,
      item: ItemToReturnImageNullable<F>
    ) => Promise<void>;
    successMessage?: string;
  };
  onChangeVisibility?: (guid: string, isActive: boolean) => Promise<void>;
  refetch: () => void;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
  size: {
    width: number;
    height: number;
  };
  showImage: boolean;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  item,
  addButtonMessage,
  itemFields,
  editItem,
  removeItem,
  onChangeVisibility,
  refetch,
  dragHandleProps,
  size,
  showImage,
  activeType,
}) => {
  const { image, name, guid } = item;
  const isRadio = activeType === "radio";
  const isActive = item.isActive === true;
  const [isLoading, setIsLoading] = useState(false);

  const fields: Record<string, any> = {};
  Object.entries(item.fields).map(([key, value]) => {
    if (itemFields && key in itemFields) {
      fields[key] = value.value;
    }
  });

  return (
    <div
      className={cn(
        "w-full p-4 border-4 border-card flex bg-card rounded-xl relative overflow-hidden",
        {
          "border-primary": isActive && isRadio,
        }
      )}
    >
      {isLoading && <LoadingIndicator />}
      <div className="p-2 flex items-center" {...dragHandleProps}>
        <Menu />
      </div>
      {showImage && (
        <Image
          alt={name}
          src={image}
          width={size.width}
          height={size.height}
          style={{
            maxWidth: 300,
            width: "100%",
          }}
        />
      )}
      <div className="my-5 flex flex-col gap-2 w-full ml-4">
        {Object.entries(item.fields).map(([key, { name, value }]) => (
          <p key={key} className="font-medium text-md">
            {name}: {value}
          </p>
        ))}
        <div className="mt-auto w-full flex justify-between items-end">
          <div className="flex gap-2">
            {editItem && (
              <ItemDialog
                showImage={showImage}
                addButtonMessage={addButtonMessage}
                itemToEdit={{
                  image: item.image,
                  fields: fields,
                }}
                itemFields={itemFields}
                successEditMessage={editItem.successMessage}
                onEditItem={async (item) => {
                  await editItem.onEditItem?.(guid, item).then(() => refetch());
                }}
                size={size}
              />
            )}

            {removeItem && (
              <RemoveButton
                title="Remover item"
                handleRemove={async () => {
                  if (removeItem.onRemoveItem) {
                    setIsLoading(true);
                    await removeItem
                      .onRemoveItem(guid)
                      .then(() => refetch())
                      .finally(() => setIsLoading(false));
                    removeItem.successMessage &&
                      toast.success(removeItem.successMessage);
                  }
                }}
                removeButton={
                  <Button className="w-full px-3">
                    <Trash className="w-4 h-4" />
                  </Button>
                }
              />
            )}
          </div>
          {item.isActive !== undefined && !isRadio && (
            <VisibilitySwitch
              isVisible={item.isActive}
              onVisibilityChange={async () => {
                if (onChangeVisibility) {
                  setIsLoading(true);
                  await onChangeVisibility(guid, !item.isActive)
                    .then(() => refetch())
                    .finally(() => setIsLoading(false));
                }
              }}
            />
          )}
        </div>
      </div>
      {item.isActive !== undefined && isRadio && (
        <div>
          <VisibilitySwitch
            isVisible={item.isActive}
            onVisibilityChange={async () => {
              if (onChangeVisibility) {
                setIsLoading(true);
                await onChangeVisibility(guid, !item.isActive)
                  .then(() => refetch())
                  .finally(() => setIsLoading(false));
              }
            }}
          />
        </div>
      )}
    </div>
  );
};
