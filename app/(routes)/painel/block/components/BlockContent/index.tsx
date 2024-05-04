"use client";

import { queryClient } from "@/app/components/QueryProvider";
import { Block } from "@/app/models/block";
import { blockService } from "@/app/services/block";
import { SortableImageTemplate } from "@/app/template/SortableImage/SortableImage.template";
import { useConfirm } from "@/components/AlertDialogProvider";

interface BlockContentProps {
  data: Block[];
}

const formatData = (data: Block[]) => {
  return data.map((item) => ({
    guid: item.guid,
    name: item.name,
    isActive: item.isActive,
    fields: {
      name: {
        value: item.name,
        name: "Nome",
      },
      description: {
        value: item.description,
        name: "Descrição",
      },
      link: {
        value: item.link,
        name: "Link",
      },
      buttonText: {
        value: item.buttonText,
        name: "Texto do botão",
      },
    },
  }));
};

export const BlockContent: React.FC<BlockContentProps> = ({ data }) => {
  const confirm = useConfirm();
  return (
    <SortableImageTemplate
      activeType="radio"
      showImage={false}
      name="block"
      title="TELA DE BLOQUEIO"
      description="Todo"
      fetchData={() =>
        blockService.getAll().then((res) => formatData(res.data))
      }
      initialData={formatData(data)}
      itemFields={{
        name: {
          placeholder: "Adicione um nome",
          errors: {
            required: "O nome é obrigatório",
            type: "O nome deve ser um texto",
          },
        },
        description: {
          placeholder: "Adicione uma descrição",
          errors: {
            required: "A descrição é obrigatória",
            type: "A descrição deve ser um texto",
          },
        },
        link: {
          placeholder: "Adicione um link",
          errors: {
            required: "O link é obrigatório",
            type: "O link deve ser um texto",
          },
        },
        buttonText: {
          placeholder: "Adicione um texto para o botão",
          errors: {
            required: "O texto é obrigatório",
            type: "O texto deve ser um texto",
          },
        },
      }}
      addButtonMessage="Adicionar Bloqueio"
      addItem={{
        onAddItem: async (item) => {
          await blockService.create(item);
        },
        successMessage: "Bloqueio criado com sucesso!",
      }}
      editItem={{
        onEditItem: async (guid, item) => {
          await blockService.update(guid, item);
        },
        successMessage: "Bloqueio editado com sucesso!",
      }}
      removeItem={{
        onRemoveItem: async (guid) => {
          await blockService.remove(guid);
        },
        successMessage: "Bloqueio excluído com sucesso!",
      }}
      onChangeVisibility={async (guid, isActive) => {
        if (isActive) {
          const isConfirmed = await confirm({
            title: "Ativar bloqueio",
            body: "Deseja ativar o bloqueio?",
            cancelButton: "Cancelar",
            actionButton: "Ativar",
          });

          if (!isConfirmed) return;
        }
        await blockService.updateStatus(guid, isActive);
        await queryClient.invalidateQueries(["blockAlert"]);
      }}
      updateItemPosition={async (positions) => {
        await blockService.updatePosition(positions);
      }}
      size={{
        width: 369,
        height: 231,
      }}
    />
  );
};
