export const addClassNames = (
  base?: string,
  ...others: (string | undefined | false | null | 0)[]
): string => {
  const names = Array.from(new Set(others.filter((s) => s && s !== "")));

  if (!base) return names.join(" ");

  return [base, ...names].join(" ");
};

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
