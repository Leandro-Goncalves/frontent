import { useQueryParams } from "./useQueryParams";

type useQueryStateReturn = [string | null, (value?: string) => void];

export const useQueryState = (key: string): useQueryStateReturn => {
  const queryParams = useQueryParams();
  const value = queryParams.get(key);

  const setValue = (value?: string) => {
    if (!value) {
      queryParams.delete(key);
      return;
    }
    queryParams.set(key, value);
  };

  return [value, setValue];
};
