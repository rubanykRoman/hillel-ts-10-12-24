function sortArrayOld<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  return [...arr].sort(compareFn);
}

function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[];
function sortArray<T, K extends keyof T>(
  arr: T[],
  key: T[K] extends number | string ? K : never
): T[];
function sortArray<T, K extends keyof T>(
  arr: T[],
  compareOrKey: ((a: T, b: T) => number) | K
): T[] {
  return typeof compareOrKey === 'function'
    ? [...arr].sort(compareOrKey)
    : [...arr].sort((a, b) => {
        const aValue = a[compareOrKey];
        const bValue = b[compareOrKey];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
        }
        return (aValue as number) - (bValue as number);
      });
}

//examples
const numbers: number[] = [5, 2, 9, 1, 7];
const sortedNumbers = sortArray<number>(numbers, (a, b) => a - b);
console.log(sortedNumbers);

const strings: string[] = ['banana', 'apple', 'cherry'];
const sortedStrings = sortArray<string>(strings, (a, b) => a.localeCompare(b));
console.log(sortedStrings);

const users = [
  { name: 'Alice', age: 30, active: true },
  { name: 'Bob', age: 25, active: false },
  { name: 'Charlie', age: 35, active: true },
];

console.log(sortArray(users, 'age'));
console.log(sortArray(users, 'name'));
//error:
// console.log(sortArray(users, 'active'));

export {};
