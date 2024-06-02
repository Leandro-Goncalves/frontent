"use client";

import env from "@/app/env";
import { StoreCarouselPainel } from "@/app/models/storeCarousel";
import { storeCarouselService } from "@/app/services/storeCarousel";
import { SortableImageTemplate } from "@/app/template/SortableImage/SortableImage.template";

interface StoreCarouselContentProps {
  data: StoreCarouselPainel[];
}

const formatData = (data: StoreCarouselPainel[]) => {
  return data.map((item) => ({
    guid: item.uuid,
    name: item.title,
    image: `${env.CDN_URL}/${item.url}`,
    isActive: item.isActive,
    fields: {
      title: {
        value: item.title,
        name: "Titulo",
      },
    },
  }));
};

export const StoreCarouselContent: React.FC<StoreCarouselContentProps> = ({
  data,
}) => {
  return (
    <SortableImageTemplate
      showImage
      name="carousel"
      title="Carrossel"
      description="Essas imagens aparecerão nas informações da sua loja, cada imagem pode ter seu próprio título e isso mudará na página oficial. Portanto cuidado com nomes e pontuações. "
      fetchData={() =>
        storeCarouselService.getAll().then((res) => formatData(res.data))
      }
      initialData={formatData(data)}
      itemFields={{
        title: {
          placeholder: "Adicione um titulo",
          errors: {
            required: "O titulo é obrigatório",
            type: "O titulo deve ser um texto",
          },
        },
      }}
      addButtonMessage="Adicionar Carrossel"
      addItem={{
        onAddItem: async (item) => {
          await storeCarouselService.create(item.image, item.title);
        },
        successMessage: "Carousel criado com sucesso!",
      }}
      editItem={{
        onEditItem: async (guid, item) => {
          await storeCarouselService.update(guid, item.title, item.image);
        },
        successMessage: "Carousel editado com sucesso!",
      }}
      removeItem={{
        onRemoveItem: async (guid) => {
          await storeCarouselService.remove(guid);
        },
        successMessage: "Carousel excluído com sucesso!",
      }}
      onChangeVisibility={async (guid, isActive) => {
        await storeCarouselService.updateStatus(guid, isActive);
      }}
      updateItemPosition={async (positions) => {
        await storeCarouselService.updatePosition(positions);
      }}
      size={{
        width: 1174,
        height: 650,
      }}
    />
  );
};
