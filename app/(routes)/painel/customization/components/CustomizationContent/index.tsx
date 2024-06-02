"use client";
import React, { Suspense } from "react";
import { Establishment } from "@/app/models/establishment";
import { Section } from "./components/Section";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeSection } from "./components/ThemeSection";
import { SelectImage } from "@/app/template/SortableImage/components/ItemDialog/components/SelectImage";
import { establishmentService } from "@/app/services/establishment";
import env from "@/app/env";
import { toast } from "react-toastify";
import { themes } from "@/app/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CustomizationContentProps {
  data: Establishment;
}

const Preview = React.lazy(() =>
  import("@/app/assets/Preview").then((m) => ({ default: m.Preview }))
);

export const CustomizationContent: React.FC<CustomizationContentProps> = ({
  data,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { defaultValues, isSubmitting },
    setValue,
  } = useForm<{
    alert: string;
    themeGuid: string;
    icon?: string | File;
    installments: number;
  }>({
    defaultValues: {
      alert: data.alert,
      themeGuid: data.themeGuid,
      icon: data.icon && `${env.CDN_URL}/${data.icon}`,
      installments: data.installments,
    },
  });
  const values = watch();
  const themeGuid =
    values.themeGuid ?? themes["3ce01499-9159-42bc-a31f-3cbba37b24f1"];
  const isValueChanged =
    JSON.stringify(values) !== JSON.stringify(defaultValues);

  const handleSave = async () => {
    const { data } = await establishmentService.update(env.ESTABLISHMENT_ID, {
      alert: values.alert,
      themeGuid: values.themeGuid,
      icon: typeof values.icon === "object" ? values.icon : undefined,
      installments: values.installments,
    });

    toast.success("Configurações salvas");

    reset({
      alert: data.alert,
      icon: data.icon && `${env.CDN_URL}/${data.icon}`,
      themeGuid: data.themeGuid,
    });
  };

  return (
    <div className="py-24 px-8">
      <h1 className="font-bold text-2xl">Personalização</h1>
      <h3 className="font-medium text-sm">
        Personalize o site, com as cores pré-definidas no sistema
      </h3>

      <div className="flex flex-col gap-2 mt-8 w-full">
        <Section title="Logo" description="Utilize a logo da sua loja!">
          <SelectImage
            disableRemove
            size={{
              width: 90,
              height: 90,
            }}
            image={values.icon}
            setImage={(file) => {
              console.log(file);
              setValue("icon", file);
            }}
            className="w-full max-w-[90px] border-2 rounded-md"
          />
        </Section>
        <Section
          position="bottom"
          title="Frase acima"
          description="Edite a frase que aparece na parte de cima do seu site."
        >
          <Input
            {...register("alert")}
            className="w-full max-w-3xl bg-card"
            containerClassName="w-full max-w-3xl"
            type="text"
            placeholder="Frase acima"
          />
        </Section>
        <Section
          position="bottom"
          title="parcelas"
          description="Quantidade de parcelas para o pagamento da sua loja."
        >
          <Select
            onValueChange={(value) => {
              setValue("installments", Number(value));
            }}
            defaultValue={String(values.installments)}
          >
            <SelectTrigger className="bg-card">
              <SelectValue placeholder="Selecione o parcelamento" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((i) => (
                <SelectItem key={i} value={String(i)}>
                  {i}x {i === 1 && "(a vista)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Section>
        <ThemeSection
          themeGuid={values.themeGuid}
          setThemeGuid={(newThemeGuid) => {
            setValue("themeGuid", newThemeGuid);
          }}
        />

        <Button
          className="mr-auto mt-4"
          disabled={!isValueChanged || isSubmitting}
          onClick={handleSubmit(handleSave)}
        >
          {!isSubmitting ? "Salvar alterações" : "Salvando..."}
        </Button>
      </div>
      <Suspense fallback={<></>}>
        <Preview
          className="mx-auto w-[1000px] h-auto mt-4"
          theme={themes[themeGuid as keyof typeof themes]}
        />
      </Suspense>
    </div>
  );
};
