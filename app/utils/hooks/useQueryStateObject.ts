import { useMemo } from "react";
import { useQueryParams } from "./useQueryParams";

export const useQueryStateObject = <T extends object>(params: (keyof T)[]) => {
  const queryParams = useQueryParams();

  const object = useMemo<Record<keyof T, string>>(() => {
    const obj: any = {};
    params.forEach((param) => {
      const value = queryParams.get(param as string);
      obj[param] = value;
    });
    return obj;
  }, [params, queryParams]);

  const setSingleValue = <P extends keyof T>(key: P, value: T[P]) => {
    if (!value) {
      queryParams.delete(key as string);
      return;
    }
    queryParams.set(key as string, String(value));
  };

  let asd = 0;

  const setValue = (value: T) => {
    console.log(value);
    Object.entries(value).forEach(([key, newValue]) => {
      console.log(key, newValue);
      setTimeout(() => setSingleValue(key as any, newValue), asd * 2000);
      asd++;
    });
  };

  return [object, setValue] as const;
};
