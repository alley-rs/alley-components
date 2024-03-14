export * from "./class";

export const isType = <T extends object>(
  key: string,
  obj: object,
): obj is T => {
  return key in obj;
};
