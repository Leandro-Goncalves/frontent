import {
  ActiveType,
  Item,
  ItemToReturnImageNullable,
  itemField,
} from "../../SortableImage.template";
import { ItemCard } from "../ItemCard";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

interface CardsAreaProps<F extends Record<string, itemField>> {
  activeType?: ActiveType;
  showImage: boolean;
  filteredItems: Item[];
  items: Item[];
  addButtonMessage: string;
  itemFields?: F;
  editItem?: {
    onEditItem?: (
      guid: string,
      item: ItemToReturnImageNullable<F>
    ) => Promise<void>;
    successMessage?: string;
  };
  removeItem?: {
    onRemoveItem?: (guid: string) => Promise<void>;
    successMessage?: string;
  };
  onChangeVisibility?: (guid: string, isActive: boolean) => Promise<void>;
  refetch: () => void;
  updateItemPosition: (item: Item[]) => void;
  size: {
    width: number;
    height: number;
  };
}

export const CardsArea = <F extends Record<string, itemField>>({
  filteredItems,
  addButtonMessage,
  refetch,
  editItem,
  itemFields,
  onChangeVisibility,
  removeItem,
  items,
  updateItemPosition,
  size,
  showImage,
  activeType,
}: CardsAreaProps<F>) => {
  const onDragEnd: OnDragEndResponder = async ({ source, destination }) => {
    if (!destination) return;

    const startGuid = filteredItems[source.index].guid;
    const endGuid = filteredItems[destination.index].guid;
    if (startGuid === endGuid) return;

    const startIndex = items.findIndex((item) => item.guid === startGuid);
    const endIndex = items.findIndex((item) => item.guid === endGuid);
    if (startIndex < 0 || endIndex < 0) return;

    const result = Array.from(items);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    updateItemPosition(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mt-8 flex flex-col gap-4"
          >
            <>
              {filteredItems.map((item, index) => (
                <Draggable
                  key={item.guid}
                  draggableId={item.guid}
                  index={index}
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <ItemCard
                        activeType={activeType}
                        item={item}
                        addButtonMessage={addButtonMessage}
                        itemFields={itemFields}
                        editItem={editItem as any}
                        removeItem={removeItem}
                        onChangeVisibility={onChangeVisibility}
                        refetch={refetch}
                        dragHandleProps={provided.dragHandleProps}
                        size={size}
                        showImage={showImage}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
