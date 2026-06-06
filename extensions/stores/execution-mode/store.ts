import { proxy } from "valtio/vanilla";
import type { ExecutionModeKey } from "../../definitions/execution-mode";
import { defineStore } from "../utils";

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
