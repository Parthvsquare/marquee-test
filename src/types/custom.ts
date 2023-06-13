export type Todo = {
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  subtasks?: Subtask[];
};

export type Subtask = {
  id: number;
  title: string;
  completed: boolean;
};
