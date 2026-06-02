import { proxy, subscribe } from "valtio/vanilla";
import { join } from "node:path";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { isPlainObject } from "es-toolkit";

type StoreDefinition<T extends object, K extends Record<string, Function>> = {
  key: string;
  state: T;
  fn: K;
};

const defineStore = <T extends object, K extends Record<string, Function>>(
  storeDefinition: StoreDefinition<T, K>,
) => {
  let state = storeDefinition.state;
  let unsubscribe: () => void;

  return {
    init: (input: { rootDir: string; id: string }) => {
      const stateFilePath = join(input.rootDir, `${input.id}.${storeDefinition.key}.json`);

      if (existsSync(stateFilePath)) {
        const serializedState = readFileSync(stateFilePath, { encoding: "utf-8" });
        const maybeState = JSON.parse(serializedState);
        state = isPlainObject(maybeState) ? proxy(maybeState) : state;
      } else {
        writeFileSync(stateFilePath, JSON.stringify(state), { encoding: "utf-8" });
      }

      unsubscribe = subscribe(state, () => {
        writeFileSync(stateFilePath, JSON.stringify(state), { encoding: "utf-8" });
      });
    },

    destroy: () => {
      unsubscribe();
    },

    state: () => {
      return state;
    },

    fn: () => {
      return storeDefinition.fn;
    },
  } as const;
};

export { defineStore };
