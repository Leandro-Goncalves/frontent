"use client";
import { Establishment } from "@/app/models/establishment";
import { Section } from "../../../customization/components/CustomizationContent/components/Section";
import { SelectImage } from "@/app/template/SortableImage/components/ItemDialog/components/SelectImage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { establishmentService } from "@/app/services/establishment";
import env from "@/app/env";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface OurStoryContentProps {
  data: Establishment;
}

export const OurStoryContent: React.FC<OurStoryContentProps> = ({ data }) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { defaultValues, isSubmitting },
    setValue,
  } = useForm<{
    storyText?: string;
    storyImage?: string | File;
  }>({
    defaultValues: {
      storyText: data.storyText,
      storyImage: data.storyImage && `${env.CDN_URL}/${data.storyImage}`,
    },
  });
  const values = watch();

  const isValueChanged =
    JSON.stringify(values) !== JSON.stringify(defaultValues);

  const handleSave = async () => {
    const { data } = await establishmentService.updateStory(
      env.ESTABLISHMENT_ID,
      {
        storyImage:
          typeof values.storyImage === "object" ? values.storyImage : undefined,
        storyText: values.storyText,
      }
    );

    toast.success("Configurações salvas");

    reset({
      storyImage: data.storyImage && `${env.CDN_URL}/${data.storyImage}`,
      storyText: data.storyText,
    });
  };

  return (
    <div className="py-24 px-8">
      <h1 className="font-bold text-2xl">Nossa História</h1>
      <h3 className="font-medium text-sm">
        Adicione a história de vocês e de como tudo começou!
      </h3>

      <div className="flex flex-col gap-2 mt-8 w-full">
        <Section title="Imagem" description="Todo">
          <SelectImage
            disableRemove
            size={{
              width: 90,
              height: 90,
            }}
            image={values.storyImage}
            setImage={(file) => {
              setValue("storyImage", file);
            }}
            className="w-full max-w-[90px] border-2 rounded-md"
          />
        </Section>
        <Section position="bottom" title="Texto" description="Todo">
          <Textarea
            autoResize
            {...register("storyText")}
            className="w-full bg-card resize-none max-h-[318px]"
            placeholder="Frase acima"
          />
        </Section>

        <Button
          className="mr-auto mt-4"
          disabled={!isValueChanged || isSubmitting}
          onClick={handleSubmit(handleSave)}
        >
          {!isSubmitting ? "Salvar alterações" : "Salvando..."}
        </Button>
      </div>
    </div>
  );
};
