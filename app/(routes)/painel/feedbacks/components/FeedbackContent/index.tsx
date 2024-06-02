"use client";

import env from "@/app/env";
import { Feedback } from "@/app/models/feedback";
import { feedbackService } from "@/app/services/feedback";
import { SortableImageTemplate } from "@/app/template/SortableImage/SortableImage.template";

interface FeedbackContentProps {
  data: Feedback[];
}

const formatData = (data: Feedback[]) => {
  return data.map((item) => ({
    guid: item.uuid,
    name: item.name,
    image: `${env.CDN_URL}/${item.url}`,
    isActive: item.isActive,
    fields: {
      name: {
        value: item.name,
        name: "Nome",
      },
    },
  }));
};

export const FeedbackContent: React.FC<FeedbackContentProps> = ({ data }) => {
  return (
    <SortableImageTemplate
      showImage
      name="feedbacks"
      title="Feedbacks"
      description="Mostre valor aos seus produtos com feedbacks reais!"
      fetchData={() =>
        feedbackService
          .getAll(env.ESTABLISHMENT_ID)
          .then((res) => formatData(res.data))
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
      }}
      addButtonMessage="Adicionar Feedback"
      addItem={{
        onAddItem: async (item) => {
          await feedbackService.create(item.image, item.name);
        },
        successMessage: "Feedback criado com sucesso!",
      }}
      editItem={{
        onEditItem: async (guid, item) => {
          await feedbackService.update(guid, item.name, item.image);
        },
        successMessage: "Feedback editado com sucesso!",
      }}
      removeItem={{
        onRemoveItem: async (guid) => {
          await feedbackService.remove(guid);
        },
        successMessage: "Feedback excluído com sucesso!",
      }}
      onChangeVisibility={async (guid, isActive) => {
        await feedbackService.updateStatus(guid, isActive);
      }}
      updateItemPosition={async (positions) => {
        await feedbackService.updatePosition(positions);
      }}
      size={{
        width: 400,
        height: 400,
      }}
    />
  );
};
