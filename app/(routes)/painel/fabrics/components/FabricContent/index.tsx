"use client";

import env from "@/app/env";
import { FabricsPanel } from "@/app/models/fabrics";
import { fabricsService } from "@/app/services/fabrics";
import { SortableImageTemplate } from "@/app/template/SortableImage/SortableImage.template";

interface FabricContentProps {
  data: FabricsPanel[];
}

const formatData = (data: FabricsPanel[]) => {
  return data.map((item) => ({
    guid: item.guid,
    name: item.name,
    image: `${env.CDN_URL}/${item.url}`,
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
    },
  }));
};

export const FabricContent: React.FC<FabricContentProps> = ({ data }) => {
  return (
    <SortableImageTemplate
      showImage
      name="fabrics"
      title="nossos tecidos"
      description="Adicione os modelos que você trabalha atualmente para que seus clientes conheçam e reordene da forma que preferir para dar mais destaque a um produto específico"
      fetchData={() =>
        fabricsService.getAll().then((res) => formatData(res.data))
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
      }}
      addButtonMessage="Adicionar Tecido"
      addItem={{
        onAddItem: async (item) => {
          await fabricsService.create(item.image, item.name, item.description);
        },
        successMessage: "Tecido criado com sucesso!",
      }}
      editItem={{
        onEditItem: async (guid, item) => {
          await fabricsService.update(
            guid,
            item.name,
            item.description,
            item.image
          );
        },
        successMessage: "Tecido editado com sucesso!",
      }}
      removeItem={{
        onRemoveItem: async (guid) => {
          await fabricsService.remove(guid);
        },
        successMessage: "Tecido excluído com sucesso!",
      }}
      onChangeVisibility={async (guid, isActive) => {
        await fabricsService.updateStatus(guid, isActive);
      }}
      updateItemPosition={async (positions) => {
        await fabricsService.updatePosition(positions);
      }}
      size={{
        width: 227,
        height: 254,
      }}
    />
  );
};
