import { AxiosResponse } from "axios";
import { AdapterReturn } from ".";

type Return<T> = AdapterReturn<T, undefined>;
export const ofetchAdapter = <T>(FcReturn: AxiosResponse<T>): Return<T> => {
  const headers = { ...FcReturn.headers } as Record<string | number, string>;

  return {
    data: FcReturn.data,
    status: FcReturn.status,
    headers,
    raw: undefined,
  };
};
