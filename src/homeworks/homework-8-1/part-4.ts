function extractProperty<T, U extends keyof T>(obj: T, key: U): T[U] {
  return obj[key];
}

// examples
const user = { name: 'John', age: 30 };
console.log(extractProperty(user, 'name'));
console.log(extractProperty(user, 'age'));
