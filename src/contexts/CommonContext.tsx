import {
  createContext as createContextOrig,
  type JSX,
  type ProviderExoticComponent,
  type ProviderProps,
  type ReactNode,
  useContext as useContextOrig,
  useEffect,
  useRef,
  useSyncExternalStore,
} from 'react';

//? This file taken from: https://github.com/dai-shi/use-context-selector/issues/109#issuecomment-1785147682
//? this file is basically to optimize the context, so we can use  useContextSelector, and  prevent rerenders if data does not change (the ones we are getting from the useContextSelector used in any component)

type ContextValue<T> = {
  value: T;
  subscribe: (listener: () => void) => () => void;
  notify: () => void;
};

type ContextProviderProps<T> = {
  value: T;
  children: ReactNode;
};

export function createContextCommon<T>(
  defaultValue?: ContextValue<T> | undefined
) {
  const context = createContextOrig<ContextValue<T> | undefined>(defaultValue);
  const ProviderOrig = context.Provider;

  const Provider = ({
    value,
    children,
  }: ContextProviderProps<T>): JSX.Element => {
    const storeRef = useRef<ContextValue<T> | undefined>(null);
    let store = storeRef.current;

    if (!store) {
      const listeners = new Set<() => void>();
      store = {
        value,
        subscribe: (listener: () => void) => {
          listeners.add(listener);
          return () => listeners.delete(listener);
        },
        notify: () => listeners.forEach((listener) => listener()),
      };
      (storeRef as any).current = store;
    }

    useEffect(() => {
      if (!Object.is(store.value, value)) {
        store.value = value;
        store.notify();
      }
    }, [value, store]);

    return <ProviderOrig value={store}>{children}</ProviderOrig>;
  };

  context.Provider = Provider as ProviderExoticComponent<
    ProviderProps<ContextValue<T> | undefined>
  >;

  return context;
}

export function useContextSelector<T, R>(
  context: React.Context<ContextValue<T> | undefined>,
  selector: (value: T) => R
): R {
  const store = useContextOrig(context);
  if (!store) {
    throw new Error('useContextSelector must be used within a Provider');
  }
  return useSyncExternalStore(store.subscribe, () => selector(store.value));
}
