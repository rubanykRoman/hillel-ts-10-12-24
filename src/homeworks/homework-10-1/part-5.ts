type ReadonlyByKeys<T, K extends keyof T> = Omit<T, K> & {
  readonly [P in K]: T[P];
};

// example
type User = {
  id: number;
  name: string;
  age: number;
};

type ReadonlyUser = ReadonlyByKeys<User, 'name'>;

const user: ReadonlyUser = {
  id: 1,
  name: 'Alice',
  age: 25,
};

user.id = 2;
user.age = 30;
// error:
// user.name = "Bob";

export {};
