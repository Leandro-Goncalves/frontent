"use client";

import { Doubts } from "@/app/models/doubts";
import { doubtsService } from "@/app/services/doubts";
import { SortableImageTemplate } from "@/app/template/SortableImage/SortableImage.template";

interface DoubtsContentProps {
  data: Doubts[];
}

const formatData = (data: Doubts[]) => {
  return data.map((item) => ({
    guid: item.guid,
    name: item.question,
    fields: {
      question: {
        value: item.question,
        name: "Pergunta",
      },
      answer: {
        value: item.answer,
        name: "Resposta",
      },
    },
  }));
};

export const DoubtsContent: React.FC<DoubtsContentProps> = ({ data }) => {
  return (
    <SortableImageTemplate
      showImage={false}
      name="doubts"
      title="Duvidas"
      description="Aqui aparece as dúvidas que estão no site, troque de posição, edite ou delete."
      fetchData={() =>
        doubtsService.getAll().then((res) => formatData(res.data))
      }
      initialData={formatData(data)}
      itemFields={{
        question: {
          placeholder: "Adicione uma pergunta",
          errors: {
            required: "A pergunta é obrigatória",
            type: "A pergunta deve ser um texto",
          },
        },
        answer: {
          placeholder: "Adicione uma resposta",
          errors: {
            required: "A resposta é obrigatória",
            type: "A resposta deve ser um texto",
          },
        },
      }}
      addButtonMessage="Adicionar Pergunta"
      addItem={{
        onAddItem: async (item) => {
          await doubtsService.create(item.question, item.answer);
        },
        successMessage: "Pergunta criada com sucesso!",
      }}
      editItem={{
        onEditItem: async (guid, item) => {
          await doubtsService.update(guid, item.question, item.answer);
        },
        successMessage: "Pergunta editada com sucesso!",
      }}
      removeItem={{
        onRemoveItem: async (guid) => {
          await doubtsService.remove(guid);
        },
        successMessage: "Pergunta excluída com sucesso!",
      }}
      updateItemPosition={async (positions) => {
        await doubtsService.updatePosition(positions);
      }}
      size={{
        width: 227,
        height: 254,
      }}
    />
  );
};
