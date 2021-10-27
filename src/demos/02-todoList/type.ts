export type Task = {
  id: number;
  task: string;
  done: boolean;
};

export type TodoState = {
  data: Array<Task>;
  total: number;
};

export type TodoItemProps = Task & {
  updateStatus: (id: number, status: boolean) => void;
  deleteTask: (id: number) => void;
};

export type TodoListProps = RemoveField<TodoState, "total"> & {
  updateStatus: (id: number, status: boolean) => void;
  deleteTask: (id: number) => void;
};

export type TodoInputProps = {
  addTask: (newTask: string) => void;
};

export type TodoFooterProps = RemoveField<TodoState, "total"> & {
  selectAll: (isAll: boolean) => void;
  clearAllDone: () => void;
};

type RemoveField<Type, removeType> = {
  [Property in keyof Type as Exclude<Property, removeType>]: Type[Property];
};
