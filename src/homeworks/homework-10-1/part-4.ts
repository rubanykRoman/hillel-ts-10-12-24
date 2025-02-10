type PartialByKeys<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P];
};

// example
type User = {
  id: number;
  name: string;
  age: number;
};

const user1: PartialByKeys<User, 'name'> = { id: 1, age: 25 };
const user2: PartialByKeys<User, 'name'> = { id: 2, name: 'Alice', age: 30 };

// error:
// const user3: PartialByKeys<User, 'name'> = { name: 'Bob' };

export {};
