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

interface CurrencyInputProps extends NumberFormatBaseProps {
  error?: string;
}

export const CurrencyInput = React.forwardRef<any, CurrencyInputProps>(
  ({ onChange, error, ...props }) => {
    return (
      <NumberFormatBase
        {...props}
        value={props.value ?? 0}
        customInput={Input}
        error={error}
        format={(e) => currencyFormatter(e, true)}
      />
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
