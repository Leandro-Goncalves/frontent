"use client";

import env from "@/app/env";
import { CarouselPainel } from "@/app/models/carousel";
import { carouselService } from "@/app/services/carousel";
import {
  Item,
  SortableImageTemplate,
} from "@/app/template/SortableImage/SortableImage.template";
import { useMemo } from "react";

interface CarouselContentProps {
  data: CarouselPainel[];
}

const formatData = (data: CarouselPainel[]) => {
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
      ...(item.link
        ? {
            link: {
              value: item.link,
              name: "Link",
            },
          }
        : {}),
    },
  }));
};

export const CarouselContent: React.FC<CarouselContentProps> = ({ data }) => {
  return (
    <SortableImageTemplate
      showImage
      name="carousel"
      title="Carrossel"
      description="Crie carrosséis personalizados e adicione links!"
      fetchData={() =>
        carouselService
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
        link: {
          placeholder: "Adicione um link",
        },
      }}
      addButtonMessage="Adicionar Carrossel"
      addItem={{
        onAddItem: async (item) => {
          await carouselService.create(item.image, item.name, item.link);
        },
        successMessage: "Carousel criado com sucesso!",
      }}
      editItem={{
        onEditItem: async (guid, item) => {
          await carouselService.update(guid, item.name, item.image, item.link);
        },
        successMessage: "Carousel editado com sucesso!",
      }}
      removeItem={{
        onRemoveItem: async (guid) => {
          await carouselService.remove(guid);
        },
        successMessage: "Carousel excluído com sucesso!",
      }}
      onChangeVisibility={async (guid, isActive) => {
        await carouselService.updateStatus(guid, isActive);
      }}
      updateItemPosition={async (positions) => {
        await carouselService.updatePosition(positions);
      }}
      size={{
        width: 533,
        height: 220,
      }}
    />
  );
};
