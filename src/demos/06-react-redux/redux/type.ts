export type Person = {
  id: number;
  name: string;
  age: string;
};

export type ReduxState = {
  persons: Array<Person>;
  sum: number;
};
