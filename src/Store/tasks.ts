import { Subtask, Todo } from "@/types/custom";
import InitialTasks from "@/assets/task.json";

export const todo = {
  tasks: [...InitialTasks],
};

export const todoActions = {
  SET_TASKs: (state: any, payload: Todo[]) => {
    console.log(payload);
    return {
      ...state,
      tasks: payload,
    };
  },
  CREATE_TASK: (
    state: any,
    payload: {
      id: number;
      title: string;
      description: string;
      due_date: string;
      completed: boolean;
    },
  ) => ({
    ...state,
    tasks: [
      ...state.tasks,
      {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        due_date: payload.due_date,
        completed: payload.completed,
      },
    ],
  }),
  REMOVE_TASK: (state: any, payload: number) => ({
    ...state,
    tasks: state.tasks.filter((task: Todo) => task.id !== payload),
  }),
  ADD_SUBTASK: (state: any, payload: { taskId: number; subtask: Subtask }) => ({
    ...state,
    tasks: state.tasks.map((task: Todo) => {
      if (task.id === payload.taskId) {
        return {
          ...task,
          subtasks: [...(task.subtasks || []), payload.subtask],
        };
      }
      return task;
    }),
  }),
  REMOVE_SUBTASK: (
    state: any,
    payload: { taskId: number; subtaskId: number },
  ) => ({
    ...state,
    tasks: state.tasks.map((task: Todo) => {
      if (task.id === payload.taskId) {
        return {
          ...task,
          subtasks: (task.subtasks || []).filter(
            (subtask: Subtask) => subtask.id !== payload.subtaskId,
          ),
        };
      }
      return task;
    }),
  }),
  TICK_TASK: (state: any, payload: { taskId: number; checked: boolean }) => ({
    ...state,
    tasks: state.tasks.map((task: Todo) => {
      if (task.id === payload.taskId) {
        return {
          ...task,
          completed: payload.checked,
        };
      }
      return task;
    }),
  }),
  TICK_SUBTASK: (
    state: any,
    payload: { taskId: number; subtaskId: number; checked: boolean },
  ) => ({
    ...state,
    tasks: state.tasks.map((task: Todo) => {
      if (task.id === payload.taskId) {
        const updatedSubtasks = (task.subtasks || []).map(
          (subtask: Subtask) => {
            if (subtask.id === payload.subtaskId) {
              return {
                ...subtask,
                completed: payload.checked,
              };
            }
            return subtask;
          },
        );

        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    }),
  }),
  EDIT_TASK: (state: any, payload: Todo) => ({
    ...state,
    tasks: state.tasks.map((task: Todo) => {
      if (task.id === payload.id) {
        return {
          ...task,
          title: payload.title,
          description: payload.description,
          due_date: payload.due_date,
        };
      }
      return task;
    }),
  }),
  EDIT_SUBTASK: (
    state: any,
    payload: { taskId: number; subtask: Subtask },
  ) => ({
    ...state,
    tasks: state.tasks.map((task: Todo) => {
      if (task.id === payload.taskId && task.subtasks) {
        const updatedSubtasks = task.subtasks.map((subtask: Subtask) => {
          if (subtask.id === payload.subtask.id) {
            return {
              ...subtask,
              title: payload.subtask.title,
            };
          }
          return subtask;
        });

        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      }
      return task;
    }),
  }),
};
