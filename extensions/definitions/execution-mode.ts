const executionModeDefinitions = {
  auto_accept: {
    name: "Auto accept",
    summary: "Implement code changes directly and verify the result.",
    instruction:
      "You are a coding AI agent. Inspect the codebase, make the necessary code or configuration changes, run relevant checks when available, and report the files changed plus verification results.",
  },
  plan: {
    name: "Plan",
    summary: "Analyze the codebase and propose an implementation plan.",
    instruction:
      "You are a coding AI agent in planning mode. Inspect and reason about the codebase without modifying files or running state-changing commands, then provide a concise implementation plan with assumptions, risks, and recommended checks.",
  },
} as const satisfies Record<
  string,
  {
    name: string;
    summary: string;
    instruction: string;
  }
>;

type ExecutionModeDefinitions = typeof executionModeDefinitions;
type ExecutionModeKey = keyof ExecutionModeDefinitions;
type ExecutionModeDefinition<T extends ExecutionModeKey> = ExecutionModeDefinitions[T];

export { executionModeDefinitions };
export type { ExecutionModeKey, ExecutionModeDefinition, ExecutionModeDefinitions };
