import { handleMinMax, handleOrderBy } from "../helpers";

export {};

type MinMax<T> = <U>(callback: (item: T) => U) => U | undefined;

declare global {
  interface Array<T> {
    vGetDuplicates(): T[];
    vDistinct<U>(selector?: (item: T) => U): T[];
    vIsStringArray(): boolean;
    vMax: MinMax<T>;
    vMin: MinMax<T>;
    vOrderBy<U>(callback: (item: T) => U): T[];
    vOrderByDescending<U>(callback: (item: T) => U): T[];
    vLast(): T | undefined;
    vFirst(): T | undefined;
    vGetVerb(): string;
    /** @param isDeranged - Makes sure no element stays at same place (less performant). */
    vShuffle(isDeranged?: boolean): T[];
  }
}

Array.prototype.vGetDuplicates = function <T>(this: T[]): T[] {
  return this.filter((item, index) => this.indexOf(item) !== index);
};

Array.prototype.vDistinct = function <T, U>(this: T[], selector?: (item: T) => U): T[] {
  if (!selector) {
    return [...new Set(this)];
  }
  const map = new Map<U, T>();
  this.forEach((item) => {
    const key = selector(item);
    if (!map.has(key)) {
      map.set(key, item);
    }
  });
  return Array.from(map.values());
};

Array.prototype.vIsStringArray = function <T>(this: T[]): boolean {
  return Array.isArray(this) && this.every((item) => typeof item === "string");
};

Array.prototype.vMax = function <T, U>(this: T[], callback: (item: T) => U): U | undefined {
  return handleMinMax(false, this, callback);
};

Array.prototype.vMin = function <T, U>(this: T[], callback: (item: T) => U): U | undefined {
  return handleMinMax(true, this, callback);
};

Array.prototype.vOrderBy = function <T, U>(this: T[], callback: (item: T) => U): T[] {
  return handleOrderBy(false, this, callback);
};

Array.prototype.vOrderByDescending = function <T, U>(this: T[], callback: (item: T) => U): T[] {
  return handleOrderBy(true, this, callback);
};

Array.prototype.vLast = function <T>(this: T[]): T | undefined {
  return this[this.length - 1];
};

Array.prototype.vFirst = function <T>(this: T[]): T | undefined {
  return this[0];
};

Array.prototype.vGetVerb = function (): string {
  return this.length > 1 ? "are" : "is";
};

Array.prototype.vShuffle = function <T>(this: T[], isDeranged: boolean = true): T[] {
  if (!isDeranged) {
    return [...this].sort(() => Math.random() - 0.5);
  }
  const randomIndexes: Set<number> = new Set();
  const shuffledArray: T[] = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * this.length);
    } while (randomIndexes.has(randomIndex) || randomIndex === i);
    randomIndexes.add(randomIndex);
    shuffledArray[i] = this[randomIndex]!;
  }
  return shuffledArray;
};
