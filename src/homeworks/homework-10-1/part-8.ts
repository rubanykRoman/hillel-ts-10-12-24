type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: PropertyDescriptor;
};

//example
type Example = {
  name: string;
  age: number;
};

const descriptorObj: ObjectToPropertyDescriptor<Example> = {
  name: {
    value: 'John',
    writable: false,
    configurable: true,
    enumerable: true,
  },
  age: {
    value: 30,
    writable: true,
    configurable: false,
    enumerable: false,
  },
};

export {};
