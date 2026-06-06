const ALL_MODES = ["execution_mode_auto_accept", "execution_plan_mode"] as const;
type ToolSupportedMode = EnumOf<typeof ALL_MODES>;

const toolDefinitions = {
  read: {
    name: "read",
    summary: "Read file contents",
    supportedModes: ALL_MODES,
  },
  grep: {
    name: "grep",
    summary: "Search file contents for patterns (respects .gitignore)",
    supportedModes: ALL_MODES,
  },
  find: {
    name: "find",
    summary: "Find files by glob pattern (respects .gitignore)",
    supportedModes: ALL_MODES,
  },
  ls: {
    name: "ls",
    summary: "List directory contents",
    supportedModes: ALL_MODES,
  },
  web_search: {
    name: "web_search",
    summary: "Search the web for information (titles, URLs, highlights)",
    supportedModes: ALL_MODES,
  },
  edit: {
    name: "edit",
    summary:
      "Make precise file edits with exact text replacement, including multiple disjoint edits in one call",
    supportedModes: ["execution_mode_auto_accept"],
  },
  write: {
    name: "write",
    summary: "Create or overwrite files",
    supportedModes: ["execution_mode_auto_accept"],
  },
  bash: {
    name: "bash",
    summary: "Execute bash commands (ls, grep, find, etc.)",
    supportedModes: ["execution_mode_auto_accept"],
  },
  init_task_registry: {
    name: "init_task_registry",
    summary: "Initialize a new empty task registry",
    supportedModes: ALL_MODES,
  },
  read_task_registry_keys: {
    name: "read_task_registry_keys",
    summary: "List all tasks for the session",
    supportedModes: ALL_MODES,
  },
  read_task_registry: {
    name: "read_task_registry",
    summary: "Read a task registry in topological order",
    supportedModes: ALL_MODES,
  },
  create_task: {
    name: "create_task",
    summary: "Create a task with optional dependencies",
    supportedModes: ALL_MODES,
  },
  update_task: {
    name: "update_task",
    summary: "Update a task's title, content, status, or dependencies",
    supportedModes: ALL_MODES,
  },
  delete_task: {
    name: "delete_task",
    summary: "Delete a task from the registry",
    supportedModes: ALL_MODES,
  },
} as const satisfies Record<
  string,
  {
    name: string;
    summary: string;
    supportedModes: readonly ToolSupportedMode[];
  }
>;

type ToolDefinitions = typeof toolDefinitions;
type ToolKey = keyof ToolDefinitions;
type ToolDefinition<T extends ToolKey> = ToolDefinitions[T];

export { toolDefinitions };
export type { ToolSupportedMode, ToolDefinition, ToolDefinitions, ToolKey };
