"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, PlusCircle, Star } from "lucide-react";
import FocusTrap from "focus-trap-react";
import { Form } from "@/app/components/Form";
import { Input } from "@/components/ui/input";
import { useMutationError } from "@/app/utils/hooks/useMutationError";
import { categoryService } from "@/app/services/category";
import { useEffect, useState } from "react";
import { queryClient } from "@/app/components/QueryProvider";
import { Image, Products } from "@/app/models/products";
import { cn } from "@/lib/utils";
import { Variants } from "./components/Variants";
import { useForm } from "react-hook-form";
import { productService } from "@/app/services/products";
import { v4 as uuidV4 } from "uuid";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddProductValidation } from "./validation";
import env from "@/app/env";
import { toast } from "react-toastify";

interface ProductDialogProps {
  productToEdit?: Products;
  categoryId: string;
}

export interface ProductModel {
  name: string;
  description: string;
  variants: Array<{
    guid?: string;
    name?: string;
    price?: number;
    promotionalPrice?: number;
    isFavorite?: boolean;
    images: {
      0: File | string | undefined;
      1: File | string | undefined;
      2: File | string | undefined;
      3: File | string | undefined;
    };
    sizes?: Array<{
      sizeGuid: string;
      quantity: number;
    }>;
  }>;
}

export interface ProductModelWithoutImage {
  name: string;
  description: string;
  isFavorite?: boolean;
  variants: Array<{
    guid?: string;
    name?: string;
    price?: number;
    promotionalPrice?: number;
    sizes?: Array<{
      sizeGuid: string;
      quantity: number;
    }>;
  }>;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  productToEdit,
  categoryId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVariantTab, setIsVariantTab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadQuantity, setUploadQuantity] = useState<
    | {
        quantity: number;
        total: number;
      }
    | undefined
  >();

  const form = useForm<ProductModel>({
    resolver: zodResolver(AddProductValidation),
    defaultValues: {
      ...productToEdit,
      variants: productToEdit?.variants.map((variant) => ({
        guid: (variant as any).uuid,
        name: variant.name,
        price: variant.price,
        promotionalPrice: variant.promotionalPrice,
        isFavorite: (variant as any).isFavorite,
        sizes: (variant as any).size.map((s: any) => ({
          sizeGuid: s.sizeUuid,
          quantity: s.quantity,
        })),
        images: {
          0: variant.Image[0]?.imageId,
          1: variant.Image[1]?.imageId,
          2: variant.Image[2]?.imageId,
          3: variant.Image[3]?.imageId,
        },
      })),
    },
  });

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
    getValues,
  } = form;

  const product = useMutationError({
    mutationFn: async (data: ProductModelWithoutImage) => {
      if (productToEdit) {
        return productService
          .update(productToEdit.uuid, data)
          .then((data) => data.data);
      }

      return productService.create(data).then((data) => data.data);
    },
    onError: () => {
      // form.setFocus("email");
    },
    onSuccess: (user) => {
      if (productToEdit) {
        toast.success("Produto editado com sucesso");
      } else {
        toast.success("Produto criado com sucesso");
      }
    },
  });

  const urlToObject = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    return file;
  };

  const handleLogin = () => {
    handleSubmit(
      async (data) => {
        try {
          setIsLoading(true);
          const dataWithGuid = {
            ...data,
            variants: data.variants.map((variant) => ({
              ...variant,
              guid: variant.guid ?? uuidV4(),
            })),
          };

          const dataToSend: ProductModelWithoutImage = {
            ...dataWithGuid,
            variants: dataWithGuid.variants.map((variant) => ({
              guid: variant.guid,
              name: variant.name,
              price: variant.price,
              promotionalPrice: variant.promotionalPrice,
              sizes: variant.sizes,
              isFavorite: variant.isFavorite,
            })),
          };

          const productReturn = await product.mutateAsync(dataToSend);

          const variantsWithImage = dataWithGuid.variants.filter((v) =>
            Object.values(v.images).some((v) => v !== undefined)
          );

          setUploadQuantity({
            quantity: 0,
            total: variantsWithImage.length,
          });

          for await (let variant of variantsWithImage) {
            const imagesArray = Object.values(variant.images).filter(
              (v) => v !== undefined
            ) as (File | string)[];

            const imagesPromise = imagesArray.map(async (image) => {
              if (typeof image === "string") {
                return await urlToObject(`${env.CDN_URL}/${image}`);
              }

              return image;
            });

            const imagesArrayFormatted = await Promise.all(imagesPromise);

            await productService
              .updateImage(variant.guid, imagesArrayFormatted)
              .then(() => {
                setUploadQuantity((v) => ({
                  total: v?.total ?? 0,
                  quantity: (v?.quantity ?? 0) + 1,
                }));
              });
          }
          setUploadQuantity(undefined);

          await categoryService.link([productReturn.uuid], categoryId);

          setIsLoading(false);
          setIsOpen(false);
          reset();
          queryClient.invalidateQueries(["categories"]);
        } catch {
          setIsLoading(false);
          setUploadQuantity(undefined);
        }
      },
      (err) => {
        if (!err.description && !err.name) {
          setIsVariantTab(true);
        }
      }
    )();
  };

  useEffect(() => {
    if (productToEdit) {
      reset({
        ...productToEdit,
        variants: productToEdit?.variants.map((variant) => ({
          guid: (variant as any).uuid,
          name: variant.name,
          price: variant.price,
          promotionalPrice: variant.promotionalPrice,
          isFavorite: (variant as any).isFavorite,
          sizes: (variant as any).size.map((s: any) => ({
            sizeGuid: s.sizeUuid,
            quantity: s.quantity,
          })),
          images: {
            0: variant.Image[0]?.imageId,
            1: variant.Image[1]?.imageId,
            2: variant.Image[2]?.imageId,
            3: variant.Image[3]?.imageId,
          },
        })),
      });
    }
  }, [reset, productToEdit]);

  const ActionButton = productToEdit ? (
    <Button className="w-6 h-6" variant="outline" size="icon">
      <Edit size={14} />
    </Button>
  ) : (
    <Button>NOVO PRODUTO</Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={productToEdit ? "" : "ml-auto"}>
        {ActionButton}
      </DialogTrigger>
      <DialogContent className="max-w-[900px] max-h-[900px] overflow-y-auto">
        <FocusTrap>
          <Form.Container className={"grid gap-6 min-w-[380px]"}>
            <div>
              <Button
                onClick={() => setIsVariantTab(false)}
                variant={"link"}
                className={cn(
                  "font-bold border-b-2 hover:no-underline rounded-none",
                  !isVariantTab && "border-primary"
                )}
              >
                Detalhes do produto
              </Button>
              <Button
                onClick={() => setIsVariantTab(true)}
                variant={"link"}
                className={cn(
                  "font-bold border-b-2 hover:no-underline rounded-none",
                  isVariantTab && "border-primary"
                )}
              >
                Estampas
              </Button>
            </div>
            {isVariantTab ? (
              <Variants form={form} />
            ) : (
              <div className="grid after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
                <div className="grid gap-3 mx-8">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    className="h-12"
                    placeholder="Nome"
                    type="text"
                    {...register("name")}
                    error={errors.name?.message}
                  />

                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    className="h-12"
                    placeholder="Descrição"
                    type="text"
                    {...register("description")}
                    error={errors.description?.message}
                  />
                  <Button
                    type="submit"
                    className="h-12"
                    onClick={handleLogin}
                    isLoading={isLoading}
                    loadingText={
                      uploadQuantity &&
                      `${uploadQuantity.quantity} de ${uploadQuantity.total}`
                    }
                  >
                    {productToEdit ? "Salvar" : "Confirmar"}
                  </Button>
                </div>
              </div>
            )}
          </Form.Container>
        </FocusTrap>
      </DialogContent>
    </Dialog>
  );
};
