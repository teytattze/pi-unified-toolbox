import { nanoid } from "nanoid";
import { proxy } from "valtio/vanilla";
import { flow, uniq } from "es-toolkit";
import { defineStore } from "../utils";
import type { CreateTaskInput, Task, TaskRegistryState, UpdateTaskInput } from "./types";

const state = proxy<TaskRegistryState>({
  tasks: {},
});

const assertTaskIdsExist = (ids: string[]) => {
  for (const id of ids) {
    if (!state.tasks[id]) {
      throw new Error(`Task "${id}" does not exist.`);
    }
  }
};

const proposedNextTaskIds = (
  input: UpdateTaskInput,
  nextTaskIds: string[],
  previousTaskIds: string[],
) => {
  return (task: Task) => {
    if (task.id === input.id) {
      return nextTaskIds;
    }

    const ids = task.nextTaskIds.filter((id) => id !== input.id);

    if (previousTaskIds.includes(task.id)) {
      ids.push(input.id);
    }

    return uniq(ids);
  };
};

const assertNoCycle = (
  input: UpdateTaskInput,
  nextTaskIds: string[],
  previousTaskIds: string[],
) => {
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const getNextTaskIds = proposedNextTaskIds(input, nextTaskIds, previousTaskIds);

  const visit = (id: string) => {
    if (visited.has(id)) {
      return;
    }

    if (visiting.has(id)) {
      throw new Error("Task registry cannot contain cycles.");
    }

    const task = state.tasks[id];
    if (!task) {
      return;
    }

    visiting.add(id);

    for (const nextTaskId of getNextTaskIds(task)) {
      visit(nextTaskId);
    }

    visiting.delete(id);
    visited.add(id);
  };

  for (const id of Object.keys(state.tasks)) {
    visit(id);
  }
};

const normalizeRoots = () => {
  for (const task of Object.values(state.tasks)) {
    task.previousTaskIds = uniq(task.previousTaskIds);
    task.nextTaskIds = uniq(task.nextTaskIds);
    task.isRoot = task.previousTaskIds.length === 0;
  }
};

const createTask = (input: CreateTaskInput) => {
  const task: Task = {
    id: nanoid(),
    summary: input.summary,
    body: input.body,
    nextTaskIds: [],
    previousTaskIds: [],
    isRoot: true,
  };

  state.tasks[task.id] = task;

  return task;
};

const updateTask = (input: UpdateTaskInput) => {
  const task = state.tasks[input.id];

  if (!task) {
    throw new Error(`Task "${input.id}" does not exist.`);
  }

  const nextTaskIds = uniq(input.nextTaskIds);
  const previousTaskIds = uniq(input.previousTaskIds);
  const relatedTaskIds = [...nextTaskIds, ...previousTaskIds];

  if (relatedTaskIds.includes(input.id)) {
    throw new Error("Task cannot link to itself.");
  }

  assertTaskIdsExist(relatedTaskIds);
  assertNoCycle(input, nextTaskIds, previousTaskIds);

  for (const otherTask of Object.values(state.tasks)) {
    otherTask.nextTaskIds = otherTask.nextTaskIds.filter((id) => id !== input.id);
    otherTask.previousTaskIds = otherTask.previousTaskIds.filter((id) => id !== input.id);
  }

  task.summary = input.summary;
  task.body = input.body;
  task.nextTaskIds = nextTaskIds;
  task.previousTaskIds = previousTaskIds;

  for (const previousTaskId of previousTaskIds) {
    const previousTask = state.tasks[previousTaskId];

    if (previousTask) {
      previousTask.nextTaskIds = uniq([...previousTask.nextTaskIds, input.id]);
    }
  }

  for (const nextTaskId of nextTaskIds) {
    const nextTask = state.tasks[nextTaskId];

    if (nextTask) {
      nextTask.previousTaskIds = uniq([...nextTask.previousTaskIds, input.id]);
    }
  }

  normalizeRoots();

  return task;
};

const listTasks = () => {
  return Object.values(state.tasks);
};

const taskRegistryStore = defineStore({
  key: "task_registry",
  state,
  fn: {
    createTask: flow(createTask, structuredClone),
    updateTask: flow(updateTask, structuredClone),
    listTasks: flow(listTasks, structuredClone),
  },
});

export { taskRegistryStore };
