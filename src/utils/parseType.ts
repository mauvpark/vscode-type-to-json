export default (
  t: string,
  defaultValues?: {
    string: string;
    number: number;
    boolean: boolean;
    array: [];
    any: any;
  }
) => {
  let transformed;
  if (t.includes("string")) {
    return (transformed = defaultValues?.string ?? "");
  }
  if (t.includes("number")) {
    return (transformed = defaultValues?.number ?? 0);
  }
  if (t.includes("boolean")) {
    return (transformed = defaultValues?.boolean ?? false);
  }
  if (t.includes("[]") || t.includes("Array")) {
    return (transformed = defaultValues?.array ?? []);
  }
  if (t.includes("null")) {
    return (transformed = null);
  }
  if (t.includes("undefined")) {
    return (transformed = undefined);
  }
  if (t.includes("any")) {
    return (transformed = defaultValues?.any ?? null);
  }

  return undefined;
};
