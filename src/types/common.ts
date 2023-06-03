export type Error<T> = Partial<Record<keyof T, string>>;

export type ItemsType = {
  [key: string]: string[];
};
