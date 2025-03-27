import { handleMinMax, handleOrderBy } from "../helpers";
import { cloneDeep } from "../utils";

export {};

type MinMax<T> = <U>(callback: (item: T) => U) => U | undefined;

declare global {
  interface Array<T> {
    mGetDuplicates(): T[];
    mDistinct<U>(selector?: (item: T) => U): T[];
    mIsStringArray(): boolean;
    mMax: MinMax<T>;
    mMin: MinMax<T>;
    mOrderBy<U>(callback: (item: T) => U): T[];
    mOrderByDescending<U>(callback: (item: T) => U): T[];
    mLast(): T | undefined;
    mFirst(): T | undefined;
    mGetVerb(): string;
    /** @param isDeranged - Makes sure no element stays at same place (less performant). */
    mShuffle(isDeranged?: boolean): T[];
    mCloneDeep(): T[];
  }

  interface ReadonlyArray<T> extends Array<T> {}
}

Array.prototype.mGetDuplicates = function <T>(this: T[]): T[] {
  return this.filter((item, index) => this.indexOf(item) !== index);
};

Array.prototype.mDistinct = function <T, U>(this: T[], selector?: (item: T) => U): T[] {
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

Array.prototype.mIsStringArray = function <T>(this: T[]): boolean {
  return Array.isArray(this) && this.every((item) => typeof item === "string");
};

Array.prototype.mMax = function <T, U>(this: T[], callback: (item: T) => U): U | undefined {
  return handleMinMax(false, this, callback);
};

Array.prototype.mMin = function <T, U>(this: T[], callback: (item: T) => U): U | undefined {
  return handleMinMax(true, this, callback);
};

Array.prototype.mOrderBy = function <T, U>(this: T[], callback: (item: T) => U): T[] {
  return handleOrderBy(false, this, callback);
};

Array.prototype.mOrderByDescending = function <T, U>(this: T[], callback: (item: T) => U): T[] {
  return handleOrderBy(true, this, callback);
};

Array.prototype.mLast = function <T>(this: T[]): T | undefined {
  return this[this.length - 1];
};

Array.prototype.mFirst = function <T>(this: T[]): T | undefined {
  return this[0];
};

Array.prototype.mGetVerb = function (): string {
  return this.length > 1 ? "are" : "is";
};

Array.prototype.mShuffle = function <T>(this: T[], isDeranged: boolean = true): T[] {
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

Array.prototype.mCloneDeep = function <T>(this: T[]) {
  return this.map((x) => cloneDeep(x));
};
