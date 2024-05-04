import { CreatedUpdateAt } from "./utils";

export type Establishment = CreatedUpdateAt<{
  uuid: string;
  alert?: string;
  description: string;
  phone: string;
  installments: number;
  themeGuid: string;
  blockGuid?: string;
  icon: string;
}>;
