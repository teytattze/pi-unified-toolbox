type Task = {
  id: string;
  summary: string;
  body: string;
  nextTaskIds: string[];
  previousTaskIds: string[];
  isRoot: boolean;
};

type TaskRegistryState = {
  tasks: Record<string, Task>;
};

type CreateTaskInput = {
  summary: string;
  body: string;
};

type UpdateTaskInput = {
  id: string;
  summary: string;
  body: string;
  nextTaskIds: string[];
  previousTaskIds: string[];
};

export type { CreateTaskInput, Task, TaskRegistryState, UpdateTaskInput };
