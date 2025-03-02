export function cloneDeep(value: any): any {
  if (typeof value !== "object" || value === null) {
    // If value is not an object or is null, return the value itself
    return value;
  }

  if (Array.isArray(value)) {
    // If value is an array, iterate over its elements and clone each recursively
    return value.map((item) => cloneDeep(item));
  }

  // If value is an object, clone its properties recursively
  const clonedObject: Record<string, unknown> = Object.create(Object.getPrototypeOf(value));

  for (let key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      // Clone each property recursively
      if (typeof value[key] === "function") {
      } else {
        clonedObject[key] = cloneDeep(value[key]);
      }
    }
  }
  return clonedObject;
}

export function getKey<T extends Record<string, unknown>>(object: T, value: unknown): keyof T | undefined {
  return Object.keys(object).find((key) => object[key] === value);
}

export const getValues: GetValues = (object) => {
  return Object.values(object);
};

export const getKeys: GetKeys = (object) => {
  return Object.keys(object) as ReturnType<GetKeys>;
};
export const getEntries: GetEntries = (object) => {
  return Object.entries(object) as ReturnType<GetEntries>;
};

export const fromEntries: FromEntries = (entries) => {
  return Object.fromEntries(entries) as any;
};

export const isPrimitive = (value: unknown): value is string | number | boolean | bigint | symbol | null | undefined => {
  return value === null || (typeof value !== "object" && typeof value !== "function");
};

type GetValues = <T>(o: { [s: string]: T } | ArrayLike<T>) => T[];
type GetKeys = <T extends object>(o: T) => (keyof T)[];
type GetEntries = <T extends object>(o: T) => [keyof T, T[keyof T]][];
type FromEntries = <T extends readonly (readonly [PropertyKey, any])[]>(
  entries: T
) => {
  [K in T[number] as K[0]]: K[1];
};
