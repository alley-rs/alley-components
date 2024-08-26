export const classList = ({
  base,
  others = {},
}: {
  base?: string;
  others?: Record<string, boolean | undefined | null | 0>;
}): Record<string, boolean> => {
  const classes: Record<string, boolean> = {};

  if (base) {
    classes[base] = true;
  }

  for (const k of Object.keys(others)) {
    classes[k] = !!others[k];
  }

  return classes;
};

export const addClassList = (
  base?: string,
  ...others: (string | undefined | false | null | 0)[]
): string[] => {
  const names = Array.from(
    new Set(others.filter((s) => s && s !== "")),
  ) as string[];

  return base ? [base, ...names] : names;
};

export const addClassNames = (
  base?: string,
  ...others: (string | undefined | false | null | 0)[]
): string => addClassList(base, ...others).join(" ");

export const removeClassName = (base: string, name: string): string => {
  const names = base
    .split(" ")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  const idx = names.indexOf(name.trim());

  if (idx === -1) {
    return base;
  }

  return names.splice(idx, 1).join(" ");
};
