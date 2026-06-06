const toolDefinitions = {
  read: {
    name: "read",
    summary: "Read file contents",
    hidden: false,
  },
  grep: {
    name: "grep",
    summary: "Search file contents for patterns (respects .gitignore)",
    hidden: false,
  },
  find: {
    name: "find",
    summary: "Find files by glob pattern (respects .gitignore)",
    hidden: false,
  },
  ls: {
    name: "ls",
    summary: "List directory contents",
    hidden: false,
  },
  web_search: {
    name: "web_search",
    summary: "Search the web for information (titles, URLs, highlights)",
    hidden: true,
  },
  edit: {
    name: "edit",
    summary:
      "Make precise file edits with exact text replacement, including multiple disjoint edits in one call",
    hidden: false,
  },
  write: {
    name: "write",
    summary: "Create or overwrite files",
    hidden: false,
  },
  bash: {
    name: "bash",
    summary: "Execute bash commands (ls, grep, find, etc.)",
    hidden: false,
  },
  init_task_registry: {
    name: "init_task_registry",
    summary: "Initialize a new empty task registry",
    hidden: true,
  },
  read_task_registry_keys: {
    name: "read_task_registry_keys",
    summary: "List all tasks for the session",
    hidden: true,
  },
  read_task_registry: {
    name: "read_task_registry",
    summary: "Read a task registry in topological order",
    hidden: true,
  },
  create_task: {
    name: "create_task",
    summary: "Create a task with optional dependencies",
    hidden: true,
  },
  update_task: {
    name: "update_task",
    summary: "Update a task's title, content, status, or dependencies",
    hidden: true,
  },
  delete_task: {
    name: "delete_task",
    summary: "Delete a task from the registry",
    hidden: true,
  },
} as const satisfies Record<
  string,
  {
    name: string;
    summary: string;
    hidden: boolean;
  }
>;

type ToolDefinitions = typeof toolDefinitions;
type ToolKey = keyof ToolDefinitions;
type ToolDefinition<T extends ToolKey> = ToolDefinitions[T];

export { toolDefinitions };
export type { ToolDefinition, ToolDefinitions, ToolKey };
