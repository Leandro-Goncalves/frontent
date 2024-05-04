import { Prettify } from "../utils/types/FunctionMap";

export type CreatedUpdateAt<T> = Prettify<
  T & {
    createdAt: Date;
    updatedAt: Date;
  }
>;
