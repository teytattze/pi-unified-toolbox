const executionModeKeys = ["auto_accept", "plan"] as const;
type ExecutionModeKey = EnumOf<typeof executionModeKeys>;

export type { ExecutionModeKey };
