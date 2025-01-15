function sortArray<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  return [...arr].sort(compareFn);
}

//examples
const numbers: number[] = [5, 2, 9, 1, 7];
const sortedNumbers = sortArray<number>(numbers, (a, b) => a - b);
console.log(sortedNumbers);

const strings: string[] = ['banana', 'apple', 'cherry'];
const sortedStrings = sortArray<string>(strings, (a, b) => a.localeCompare(b));
console.log(sortedStrings);
