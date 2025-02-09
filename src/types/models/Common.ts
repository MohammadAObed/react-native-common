import { type MD3Theme } from 'react-native-paper';

export type StyleParam = {
  theme: MD3Theme;
};

export type NewIdTracker = {
  className: string;
  lastNewId: number;
};

/** If function has one param, then it returns that one param */
export type Params<T extends undefined | ((...args: any) => any)> = T extends (
  ...args: [infer P]
) => any
  ? P
  : Parameters<NonNullable<T>>;

export type Fields<Obj> = {
  [K in FieldNames<Obj>]?: FieldValue<Obj, K>;
};

export type FieldNames<Obj> = EveryPropertyPathOf<Obj>;

type FieldValue<Obj, Key> = Key extends keyof Obj
  ? Obj[Key]
  : Key extends `${infer K1}.${infer K2}`
    ? K1 extends keyof Obj
      ? FieldValue<Obj[K1], K2>
      : never
    : never;

type EveryPropertyPathOf<Obj, Seen = never> = Obj extends object
  ? {
      [K in keyof Obj]: K extends Seen
        ? never
        :
            | (K extends UnWantedPropertiesIDKWhyTheyAppear
                ? never
                : K & string) /* | NonNullable<K> */
            | `${K & string}.${EveryPropertyPathOf<Obj[K], Seen | K> & string}`;
    }[keyof Obj]
  : never;

type UnWantedPropertiesIDKWhyTheyAppear =
  | '__TYPE__'
  | 'toString'
  | 'description'
  | 'valueOf'
  | 'addListener'
  | 'hasListeners'
  | 'removeListener'
  | 'removeAllListeners';
