import { Form as FormC } from "@/app/components/Form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FocusTrap from "focus-trap-react";
import { useForm } from "react-hook-form";
import { CupomValidation, cupomValidation } from "./validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Cupom, CupomType, DiscountType } from "@/app/models/cupom";
import { DatePicker } from "@/components/ui/date-picker";
import { NumericFormat } from "react-number-format";
import { isAfter } from "date-fns";
import { useMutationError } from "@/app/utils/hooks/useMutationError";
import { couponService } from "@/app/services/cupom";
import { queryClient } from "@/app/components/QueryProvider";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CupomDialogProps {
  cupomToEdit?: Cupom;
}

const InputLabel: React.FC<{
  label: string;
  description?: string;
  children?: React.ReactNode;
}> = ({ label, description, children }) => {
  return (
    <FormItem
      style={{
        overflow: "hidden",
      }}
    >
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export const CupomDialog: React.FC<CupomDialogProps> = ({ cupomToEdit }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<CupomValidation>({
    resolver: zodResolver(cupomValidation),
  });

  const coupon = useMutationError({
    mutationFn: async (data: CupomValidation) => {
      if (cupomToEdit) {
        return couponService.update(cupomToEdit.guid, data);
      }
      return couponService.create(data as any);
    },
    onSuccess: () => {
      if (cupomToEdit) {
        toast.success("Cupom editado com sucesso!");
      } else {
        toast.success("Cupom criado com sucesso!");
      }
      setOpen(false);
      queryClient.invalidateQueries(["cupons"]);
      form.reset();
    },
  });

  const initialDate = form.watch("initialDate");
  const finalDate = form.watch("finalDate");
  const discountType = form.watch("discountType");
  const isUnlimited = form.watch("isUnlimited");

  const isPercentage = discountType === DiscountType.PERCENTAGE;

  const onSubmit = async (cupom: CupomValidation) => {
    await coupon.mutateAsync(cupom);
  };

  const handleOpen = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setOpen(open);
  };

  useEffect(() => {
    if (!open) return;
    form.reset(
      cupomToEdit
        ? {
            ...cupomToEdit,
            minimumValue: cupomToEdit.minimumValue ?? 0,
            maxDiscount: cupomToEdit.maxDiscount ?? 0,
            initialDate: cupomToEdit.initialDate
              ? new Date(cupomToEdit.initialDate)
              : undefined,
            finalDate: cupomToEdit.finalDate
              ? new Date(cupomToEdit.finalDate)
              : undefined,
          }
        : {
            cupomType: CupomType.GENERAL,
            discountType: DiscountType.PERCENTAGE,
            discountValue: 0,
            quantity: 0,
          }
    );
  }, [cupomToEdit, open]); // eslint-disable-line

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger>
        {cupomToEdit ? (
          <Button className="w-full">
            <Edit className="w-4 h-4 mr-2" /> Editar
          </Button>
        ) : (
          <Button>+ NOVO CUPOM</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <FocusTrap>
          <FormC.Container className={"grid gap-6 min-w-[380px]"}>
            <FormC.Item>
              <Form {...form}>
                <div className="grid mt-9 after:content-[' '] after:absolute after:top-0 after:h-[8px] after:w-[70%] after:left-[50%] after:bg-primary after:transform after:translate-x-[-50%] after:rounded">
                  <div className="flex items-center gap-3 mb-4 flex-col">
                    <h2 className="text-3xl font-bold text-primary">
                      NOVO CUPOM
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <InputLabel label="Código de desconto">
                          <Input placeholder="EX: 5OFFCACAU" {...field} />
                        </InputLabel>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discountValue"
                      render={({ field }) => (
                        <InputLabel label="Valor do desconto">
                          <NumericFormat
                            customInput={Input}
                            placeholder={isPercentage ? "10%" : "R$ 10"}
                            allowNegative={false}
                            suffix={isPercentage ? "%" : undefined}
                            prefix={!isPercentage ? "R$ " : undefined}
                            value={field.value}
                            onValueChange={({ floatValue }) => {
                              if (!floatValue) {
                                field.onChange(0);
                                return;
                              }

                              if (isPercentage) {
                                field.onChange(
                                  floatValue > 100 ? 100 : floatValue
                                );
                              }

                              field.onChange(floatValue);
                            }}
                          />
                        </InputLabel>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cupomType"
                      render={({ field }) => (
                        <InputLabel label="Tipo de desconto">
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={CupomType.GENERAL}
                                id={CupomType.GENERAL}
                              />
                              <Label htmlFor={CupomType.GENERAL}>
                                Uso geral
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={CupomType.UNIQUE}
                                id={CupomType.UNIQUE}
                              />
                              <Label htmlFor={CupomType.UNIQUE}>
                                Uso único
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={CupomType.FIRST}
                                id={CupomType.FIRST}
                              />
                              <Label htmlFor={CupomType.FIRST}>
                                Primeiro pedido
                              </Label>
                            </div>
                          </RadioGroup>
                        </InputLabel>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <InputLabel label="Tipo de benefício">
                          <RadioGroup
                            defaultValue={field.value}
                            onValueChange={(v) => {
                              form.setValue("discountValue", 0);
                              form.setValue("maxDiscount", 0);
                              field.onChange(v);
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={DiscountType.PERCENTAGE}
                                id={DiscountType.PERCENTAGE}
                              />
                              <Label htmlFor={DiscountType.PERCENTAGE}>
                                Porcentagem (%)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={DiscountType.AMOUNT}
                                id={DiscountType.AMOUNT}
                              />
                              <Label htmlFor={DiscountType.AMOUNT}>
                                Desconto fixo (R$)
                              </Label>
                            </div>
                          </RadioGroup>
                        </InputLabel>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="initialDate"
                      render={({ field }) => (
                        <InputLabel label="Data inicial">
                          <DatePicker
                            placeholder="dd/mm/yy"
                            selected={field.value}
                            onSelect={(v) => {
                              field.onChange(v === undefined ? null : v);
                              if (finalDate && v && isAfter(v, finalDate)) {
                                form.setValue("finalDate", v);
                              }
                            }}
                            disabled={{
                              before: new Date(),
                            }}
                          />
                        </InputLabel>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="finalDate"
                      render={({ field }) => (
                        <InputLabel label="Data Final">
                          <DatePicker
                            placeholder="dd/mm/yy"
                            selected={field.value}
                            onSelect={(v) => {
                              field.onChange(v === undefined ? null : v);
                            }}
                            disabled={{
                              before: initialDate ? initialDate : new Date(),
                            }}
                          />
                        </InputLabel>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="minimumValue"
                      render={({ field }) => (
                        <InputLabel label="Valor mínimo do pedido">
                          <NumericFormat
                            customInput={Input}
                            placeholder={"R$ 0"}
                            allowNegative={false}
                            prefix={"R$ "}
                            value={field.value}
                            onValueChange={({ floatValue }) => {
                              field.onChange(!floatValue ? 0 : floatValue);
                            }}
                          />
                        </InputLabel>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxDiscount"
                      disabled={!isPercentage}
                      render={({ field }) => (
                        <InputLabel label="Valor máximo de desconto">
                          <TooltipProvider>
                            <Tooltip
                              open={isPercentage ? false : undefined}
                              delayDuration={0}
                            >
                              <TooltipTrigger>
                                <NumericFormat
                                  disabled={!isPercentage}
                                  customInput={Input}
                                  placeholder={"R$ 0"}
                                  allowNegative={false}
                                  prefix={"R$ "}
                                  value={field.value}
                                  onValueChange={({ floatValue }) => {
                                    field.onChange(
                                      !floatValue ? 0 : floatValue
                                    );
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Valor máximo so é aplicado se o tipo de
                                  desconto for porcentagem
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </InputLabel>
                      )}
                    />

                    <div
                      style={{
                        display: "grid",
                        transition: "grid-template-rows 0.5s ease",
                        gridTemplateRows: isUnlimited ? "0fr" : "1fr",
                      }}
                    >
                      <FormField
                        control={form.control}
                        name="quantity"
                        render={({ field }) => (
                          <InputLabel label="Quantidade de cupons disponível">
                            <NumericFormat
                              disabled={isUnlimited}
                              customInput={Input}
                              value={field.value}
                              onValueChange={({ floatValue }) => {
                                if (floatValue === undefined) {
                                  field.onChange(0);
                                  return;
                                }
                                field.onChange(floatValue);
                              }}
                            />
                          </InputLabel>
                        )}
                      />
                    </div>

                    <div />

                    <FormField
                      control={form.control}
                      name="isUnlimited"
                      render={({ field }) => (
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="isUnlimited"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label
                            htmlFor="isUnlimited"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Cupom ilimitado
                          </label>
                        </div>
                      )}
                    />
                  </div>
                  <div className="gap-3 mx-8 flex ml-auto mt-4">
                    <Button
                      type="submit"
                      className="h-12 decoration-transparent"
                      onClick={() => {
                        setOpen(false);
                      }}
                      variant={"link"}
                    >
                      cancelar
                    </Button>
                    <Button
                      disabled={form.formState.isSubmitting || !open}
                      type="submit"
                      className="h-12"
                      onClick={form.handleSubmit(onSubmit)}
                    >
                      {cupomToEdit ? "SALVAR" : "CADASTRAR"}
                    </Button>
                  </div>
                </div>
              </Form>
            </FormC.Item>
          </FormC.Container>
        </FocusTrap>
      </DialogContent>
    </Dialog>
  );
};
