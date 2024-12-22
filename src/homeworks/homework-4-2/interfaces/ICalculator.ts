import { TActions } from './literalTypes';

export default interface ICalculator {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
  percent: (a: number, b: number) => number;
  performOperation: (operation: TActions, a: number, b: number) => number;
}
