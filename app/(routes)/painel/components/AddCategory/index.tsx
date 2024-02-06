"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Edit, PlusCircle } from "lucide-react";
import FocusTrap from "focus-trap-react";
import { Form } from "@/app/components/Form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutationError } from "@/app/utils/hooks/useMutationError";
import { AddUserValidation } from "./validation";
import { categoryService } from "@/app/services/category";
import { useState } from "react";
import { queryClient } from "@/app/components/QueryProvider";
import { Category } from "@/app/models/category";
import { toast } from "react-toastify";

interface AddCategoryProps {
  categoryToEdit?: Category;
}

export const AddCategory: React.FC<AddCategoryProps> = ({ categoryToEdit }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(categoryToEdit?.name ?? "");

  const login = useMutationError({
    mutationFn: async (data: AddUserValidation) => {
      if (categoryToEdit) {
        return categoryService
          .edit(categoryToEdit.uuid, data.name)
          .then((data) => data.data);
      }

      return categoryService.create(data.name).then((data) => data.data);
    },
    onError: () => {
      // form.setFocus("email");
    },
    onSuccess: (user) => {
      if (categoryToEdit) {
        toast.success("Categoria editada com sucesso");
      } else {
        toast.success("Categoria criada com sucesso");
      }
      setIsOpen(false);
      setName("");
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const handleLogin = () => {
    login.mutate({
      name,
    });
  };

  const ActionButton = categoryToEdit ? (
    <Button className="w-full">
      <Edit className="mr-2 w-4 h-4" /> Editar
    </Button>
  ) : (
    <Button>
      <PlusCircle className="mr-2 w-4 h-4" /> ADICIONAR A CATEGORIA
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className={categoryToEdit ? "" : "ml-auto"}>
        {ActionButton}
      </DialogTrigger>
      <DialogContent>
        <FocusTrap>
          <Form.Container className={"grid gap-6 min-w-[380px]"}>
            <Form.Item>
              <div className="grid mt-9 after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
                <div className="flex items-center gap-3 mb-4 flex-col">
                  <h2 className="text-3xl font-bold text-primary">
                    {categoryToEdit ? "Editar" : "Nova"} categoria
                  </h2>
                </div>
                <div className="grid gap-3 mx-8">
                  <div className="grid gap-1">
                    <Input
                      className="h-12"
                      placeholder="Nome da categoria"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="h-12" onClick={handleLogin}>
                    {categoryToEdit ? "Editar" : "Confirmar"}
                  </Button>
                </div>
              </div>
            </Form.Item>
          </Form.Container>
        </FocusTrap>
      </DialogContent>
    </Dialog>
  );
};
