"use client";
import React from "react";
import { Establishment } from "@/app/models/establishment";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Section } from "../../../customization/components/CustomizationContent/components/Section";
import { CurrencyInput } from "@/app/components/CurrencyInput";
import { Form } from "@/components/ui/form";
import { toast } from "react-toastify";

interface DeliveryContentProps {}

export const DeliveryContent: React.FC<DeliveryContentProps> = () => {
  const form = useForm<{
    mococaFee: number;
  }>({
    defaultValues: {
      mococaFee: 0,
    },
  });

  const values = form.watch();
  const isSubmitting = form.formState.isSubmitting;

  const isValueChanged =
    JSON.stringify(values) !== JSON.stringify(form.formState.defaultValues);

  const handleSave = async ({ mococaFee }: { mococaFee: number }) => {
    console.log("data", mococaFee);
    // const { data } = await establishmentService.update(env.ESTABLISHMENT_ID, {
    //   alert: values.alert,
    //   themeGuid: values.themeGuid,
    //   icon: typeof values.icon === "object" ? values.icon : undefined,
    //   installments: values.installments,
    // });

    toast.success("Configurações salvas");

    form.reset({
      mococaFee,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
        <div className="py-24 px-8">
          <h1 className="font-bold text-2xl">Delivery e retirada</h1>

          <div className="flex flex-col gap-2 mt-8 w-full">
            <Section
              position="bottom"
              title="Entrega para Mococa"
              description="Defina o valor da taxa de entrega para Mococa"
            >
              <CurrencyInput
                className="w-full mt-4"
                containerClassName="w-full max-w-3xl"
                type="text"
                placeholder="Valor da taxa"
                value={Number(values.mococaFee ?? 0) * 100}
                onValueChange={({ value }) =>
                  form.setValue("mococaFee", Number(value) / 100, {
                    shouldValidate: true,
                  })
                }
              />
            </Section>

            <Button
              className="mr-auto mt-4"
              disabled={!isValueChanged || isSubmitting}
              type="submit"
            >
              {!isSubmitting ? "Salvar alterações" : "Salvando..."}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
