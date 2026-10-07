export function extractConditionally<
  T extends Record<string, unknown>,
  K extends keyof T,
>(obj: T, key: K): Partial<Record<K, NonNullable<T[K]>>> {
  return key in obj && !!obj[key] ?
      ({ [key]: obj[key] } as Partial<Record<K, NonNullable<T[K]>>>)
    : {};
}
