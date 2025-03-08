export function handleMinMax<T, U>(isMin: boolean, array: T[], callback: (item: T) => U): U | undefined {
  const filteredArray = array.filter((item) => item !== undefined && item !== null);
  if (filteredArray.length === 0) return undefined;
  return filteredArray.map(callback).reduce((prev, curr) => ((isMin ? prev < curr : prev > curr) ? prev : curr));
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
