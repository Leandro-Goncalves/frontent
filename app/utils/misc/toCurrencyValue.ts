export const toCurrencyValue = (
  n: number,
  showCurrencySymbol = true
): string => {
  const valueToUse = isNaN(n) ? 0 : n;

  return valueToUse.toLocaleString("pt-br", {
    style: showCurrencySymbol ? "currency" : "decimal",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
