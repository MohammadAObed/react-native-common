export function handleMinMax<T, U>(isMin: boolean, array: T[], callback: (item: T) => U): U | undefined {
  if (array.length === 0) return undefined;
  return array.map(callback).reduce((prev, curr) => ((isMin ? prev < curr : prev > curr) ? prev : curr));
}

export function handleOrderBy<T, U>(isDescending: boolean, array: T[], callback: (item: T) => U): T[] {
  return [...array].sort((a, b) => {
    const aValue = callback(a);
    const bValue = callback(b);

    if (aValue < bValue) return isDescending ? 1 : -1;
    if (aValue > bValue) return isDescending ? -1 : 1;
    return 0;
  });
}
