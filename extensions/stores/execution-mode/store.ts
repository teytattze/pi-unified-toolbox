import { defineStore } from "../define-store";
import { proxy } from "valtio/vanilla";
import type { ExecutionModeKey } from "./types";

const state = proxy<{ current: ExecutionModeKey }>({
  current: "plan",
});

const switchTo = (key: ExecutionModeKey) => {
  state.current = key;
};

const executionModeStore = defineStore({
  key: "execution_mode",
  state,
  fn: {
    switchTo,
  },
});

export { executionModeStore };
