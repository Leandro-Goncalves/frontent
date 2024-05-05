import { StoreApi, UseBoundStore } from "zustand";
import { useCookies } from "../hooks/useCookies";
import { isSsr } from "../misc/isSsr";
import { PersistOptions } from "zustand/middleware";

type Write<T, U> = Omit<T, keyof U> & U;
type PersistListener<S> = (state: S) => void;
type StorePersist<S, Ps> = {
  persist: {
    setOptions: (options: Partial<PersistOptions<S, Ps>>) => void;
    clearStorage: () => void;
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
    onHydrate: (fn: PersistListener<S>) => () => void;
    onFinishHydration: (fn: PersistListener<S>) => () => void;
    getOptions: () => Partial<PersistOptions<S, Ps>>;
  };
};

export const handleHydrateZustandSSR = <A>(
  state: UseBoundStore<Write<StoreApi<A>, StorePersist<A, A>>>
) => {
  if (!isSsr()) return;
  const key = state.persist.getOptions().name;
  console.log("persist key", key);
  if (!key) return;

  const stateValue = useCookies.getCookie(key);
  const stateValueParse = JSON.parse(stateValue || "{}");
  console.log("persist state", stateValueParse?.state);
  state.setState(stateValueParse?.state, true);
};
