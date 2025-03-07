import ICalculator from './interfaces/ICalculator';
import { TActions } from './interfaces/literalTypes';

export class Calculator implements ICalculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  percent(a: number, b: number): number {
    return (a / 100) * b;
  }

  performOperation(operation: TActions, a: number, b: number): number {
    switch (operation) {
      case '+':
      case 'add':
        return this.add(a, b);
      case '-':
      case 'subtract':
        return this.subtract(a, b);
      case '*':
      case 'multiply':
        return this.multiply(a, b);
      case '/':
      case 'divide':
        return this.divide(a, b);
      case '%':
      case 'percent':
        return this.percent(a, b);
    }
  }
}

const calculator = new Calculator();

console.log('Add 5 + 3:', calculator.performOperation('add', 5, 3));
console.log('Subtract 5 - 3:', calculator.performOperation('subtract', 5, 3));
console.log('Multiply 5 * 3:', calculator.performOperation('multiply', 5, 3));
console.log('Divide 10 / 2:', calculator.performOperation('divide', 10, 2));
console.log('Percent 50% of 122:', calculator.performOperation('percent', 50, 122));

console.log('+  5 + 3:', calculator.performOperation('+', 5, 3));
console.log('-  5 - 3:', calculator.performOperation('-', 5, 3));
console.log('*  5 * 3:', calculator.performOperation('*', 5, 3));
console.log('/  10 / 2:', calculator.performOperation('/', 10, 2));
console.log('%  50% of 122:', calculator.performOperation('%', 50, 122));
