import React from "react";
import { toCurrencyValue } from "@/app/utils/misc/toCurrencyValue";
import { Input } from "@/components/ui/input";
import { NumberFormatBase, NumberFormatBaseProps } from "react-number-format";

const currencyFormatter = (value: any, prefix: boolean): string => {
  if (Number(value) === undefined) return "";
  const valueToUse = value === 0 ? 0 : value / 100;
  const amount = toCurrencyValue(valueToUse, prefix);
  return `${amount}`;
};

export const CurrencyInput = React.forwardRef<any, NumberFormatBaseProps>(
  ({ onChange, ...props }) => {
    return (
      <NumberFormatBase
        {...props}
        value={props.value ?? 0}
        customInput={Input}
        format={(e) => currencyFormatter(e, true)}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
