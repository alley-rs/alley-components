export const addClassNames = (
  base: string,
  ...others: (string | undefined | false)[]
): string => {
  const names = Array.from(new Set(others.filter((s) => s && s !== "")));
  return [base, ...names].join(" ");
};

export const classNames = (base: string, other?: string): string => {
  if (!other) return base;

  const name = other.trim();
  if (!name) return base;

  const names = base
    .split(" ")
    .map((s) => s.trim())
    .filter((s) => s !== "");

  const idx = names.indexOf(name);

  return idx > -1 ? base : [...names, name].join(" ");
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
