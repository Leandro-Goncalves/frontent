"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { useMemo, useState } from "react";
import { SelectImage } from "./components/SelectImage";
import { ItemToReturn, itemField } from "../../SortableImage.template";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodTypeAny, z } from "zod";
import { Icons } from "@/components/icons";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";

interface Item {
  image: string;
  fields?: Record<string, any>;
}

interface ItemDialogProps {
  showImage: boolean;
  itemToEdit?: Item;
  itemFields?: Record<string, itemField>;
  onAddItem?: (item: any) => Promise<void>;
  onEditItem?: (item: any) => Promise<void>;
  successMessage?: string;
  successEditMessage?: string;
  addButtonMessage: string;
  size: {
    width: number;
    height: number;
  };
}

export const ItemDialog = ({
  showImage,
  itemToEdit,
  itemFields,
  onAddItem,
  successMessage,
  addButtonMessage,
  onEditItem,
  successEditMessage,
  size,
}: ItemDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        form.reset();
      }, 100);
    } else {
      form.reset(
        itemToEdit
          ? {
              ...itemToEdit.fields,
              image: itemToEdit.image,
            }
          : {}
      );
    }
    setOpen(open);
  };

  const formatItemFieldsToFormSchema = useMemo(() => {
    const objectToReturn: Record<string, ZodTypeAny> = {};

    Object.entries(itemFields ?? {}).map(([key, value]) => {
      const errors = value.errors;
      if (errors && (errors.required || errors.type)) {
        objectToReturn[key] =
          value.type === "number"
            ? z.number({
                required_error: errors.required,
                invalid_type_error: errors.type,
              })
            : z
                .string({
                  required_error: errors.required,
                  invalid_type_error: errors.type,
                })
                .min(3, {
                  message: "mínimo de 3 caracteres",
                });
      } else {
        objectToReturn[key] = z.any();
      }
    });
    return objectToReturn;
  }, [itemFields]);
  const formSchema = z.object({
    ...(showImage
      ? {
          image: z
            .instanceof(File, { message: "Selecione uma imagem" })
            .or(z.string({ required_error: "Selecione uma imagem" })),
        }
      : {}),
    ...formatItemFieldsToFormSchema,
  });

  const form = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: itemToEdit
      ? {
          ...itemToEdit.fields,
          image: itemToEdit.image,
        }
      : {},
  });

  const image = form.watch("image");

  const onSubmit = async (data: any) => {
    if (typeof data.image === "string") {
      delete data.image;
    }

    if (itemToEdit) {
      await onEditItem?.(data);
      successEditMessage && toast.success(successEditMessage);
    } else {
      await onAddItem?.(data);
      successMessage && toast.success(successMessage);
    }

    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {itemToEdit ? (
          <Button className="w-full px-3">
            <Edit className="w-4 h-4" />
          </Button>
        ) : (
          <Button className="h-12">+ {addButtonMessage}</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <div className="grid mt-9 after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
          <p className="text-lg font-bold text-primary mb-5">
            {itemToEdit ? "Editar" : "Adicionar"} item
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {showImage && (
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <SelectImage
                            name={field.name}
                            onBlur={field.onBlur}
                            contentRef={field.ref}
                            disabled={field.disabled}
                            setImage={field.onChange}
                            image={image}
                            size={size}
                            className="w-auto mx-auto max-h-[300px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              <div
                className={cn("flex gap-4 flex-col", {
                  "mt-8": showImage,
                })}
              >
                {Object.entries(itemFields ?? {}).map(
                  ([name, { placeholder }]) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} placeholder={placeholder} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                )}
              </div>

              <Button
                type="submit"
                className="mt-8 w-full"
                size={"lg"}
                disabled={
                  Object.keys(form.formState.errors).length > 0 ||
                  form.formState.isSubmitting
                }
              >
                {form.formState.isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {itemToEdit ? "Salvar" : "Confirmar"}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
