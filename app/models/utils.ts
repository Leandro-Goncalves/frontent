export type CreatedUpdateAt<T> = Prettify<
  T & {
    createdAt: Date;
    updatedAt: Date;
  }
>;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
