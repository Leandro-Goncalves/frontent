"use client";

import { useQuery } from "@tanstack/react-query";
import { AddCategory } from "../components/AddCategory";
import { categoryService } from "@/app/services/category";
import { CategoryItem } from "../components/CategoryItem";
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { queryClient } from "@/app/components/QueryProvider";

export default function Products() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.gelAllAuthenticated().then((v) => v.data),
  });

  const onDragEnd: OnDragEndResponder = async ({ source, destination }) => {
    if (!destination || !categories) return;

    const result = Array.from(categories);
    const [removed] = result.splice(source.index, 1);
    result.splice(destination.index, 0, removed);

    const guidArray = result?.map((category) => category.uuid);

    await categoryService.reorder(guidArray);
    queryClient.setQueriesData(["categories"], result);

    await new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 5000);
    });
  };
  if (isLoading) return "Loading...";

  return (
    <div className="px-7 pb-7 pt-20 w-full flex flex-col">
      <AddCategory />
      <div className="flex flex-col gap-4 mt-7">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col gap-4 mt-7"
              >
                {categories?.map((category, index) => (
                  <Draggable
                    key={category.uuid}
                    draggableId={category.uuid}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <CategoryItem
                          category={category}
                          dragProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}
