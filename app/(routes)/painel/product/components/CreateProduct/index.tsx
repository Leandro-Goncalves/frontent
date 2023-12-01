"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateProduct } from "./hooks/useCreateProduct";
import { Button } from "@/components/ui/button";
import { CurrencyInput } from "@/app/components/CurrencyInput";
import { Products } from "@/app/models/products";
import { Textarea } from "@/components/ui/textarea";

interface CreateProductProps {
  product?: Products;
}

export const CreateProduct: React.FC<CreateProductProps> = ({ product }) => {
  const isEditing = !!product;
  const { handleCreate, isLoading, setValue, price, register, dialog } =
    useCreateProduct(product);

  return (
    <Dialog open={dialog.isOpen} onOpenChange={dialog.setIsOpen}>
      <DialogTrigger asChild>
        <Button>{isEditing ? "Editar" : "Adicionar"} produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={handleCreate()}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          <DialogHeader>
            <DialogTitle>Adicionar produto</DialogTitle>
          </DialogHeader>
          <Input type="text" placeholder="Nome" {...register("name")} />
          <Textarea
            placeholder="Descrição"
            rows={4}
            style={{ resize: "none" }}
            {...register("description")}
          />

          <CurrencyInput
            spellCheck={false}
            {...register("price")}
            value={price * 100}
            onValueChange={(v) => {
              const value = (v.floatValue ?? 0) / 100;
              setValue("price", value, {
                shouldValidate: value != 0,
              });
            }}
          />

          <Input
            type="number"
            placeholder="Quantidade"
            {...register("quantity", { valueAsNumber: true })}
          />

          <DialogFooter>
            <Button type="submit" isLoading={isLoading}>
              {isEditing ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
