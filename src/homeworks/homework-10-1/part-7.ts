type UpperCaseKeys<T> = {
  [P in keyof T as Uppercase<string & P>]: T[P];
};

// example
type Example = {
  name: string;
  age: number;
  country: string;
};

const exampleObj: UpperCaseKeys<Example> = {
  NAME: 'John',
  AGE: 30,
  COUNTRY: 'USA',
};

export {};
