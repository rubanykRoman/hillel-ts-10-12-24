type MutableByKeys<T, K extends keyof T> = Omit<T, K> & {
  -readonly [P in K]: T[P];
};

// example
type User = {
  id: number;
  readonly name: string;
  readonly age: number;
};

type MutableUser = MutableByKeys<User, 'name'>;

const user: MutableUser = {
  id: 1,
  name: 'Alice',
  age: 25,
};

user.name = 'Bob';

// error:
// user.age = 30;

export {};
