type DeepMutable<T> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

type PickByValueType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? K : never]: T[K];
};

type OmitByValueType<T, ValueType> = {
  [K in keyof T as T[K] extends ValueType ? never : K]: T[K];
};

type AnyFunction = (...args: any) => any;

type CustomReturnType<T extends AnyFunction> = T extends () => infer R ? R : never;

type ExtendedCustomReturnType<T extends AnyFunction> = T extends (...args: infer U) => infer R
  ? [R, U]
  : never;

//examples
type ReadonlyUser = {
  readonly id: number;
  readonly profile: {
    readonly name: string;
    readonly age: number;
  };
};
type MutableUser = DeepMutable<ReadonlyUser>;
const mutableUser: MutableUser = { id: 1, profile: { name: 'Alice', age: 25 } };
mutableUser.id = 2;
mutableUser.profile.name = 'Bob';

type Employee = {
  id: number;
  name: string;
  department: string;
  isActive: boolean;
};

type StringProperties = PickByValueType<Employee, string>;
const employeeStrings: StringProperties = {
  name: 'John',
  department: 'HR',
};

type EmployeeWithoutNumbers = OmitByValueType<Employee, number>;
const employeeWithoutId: EmployeeWithoutNumbers = {
  name: 'John',
  department: 'HR',
  isActive: true,
};

type GetUser = () => { id: number; name: string };
const userData: CustomReturnType<GetUser> = { id: 1, name: 'Alice' };

type UpdateUser = (id: number, name: string) => boolean;
const updateUserInfo: ExtendedCustomReturnType<UpdateUser> = [true, [1, 'Alice']];
