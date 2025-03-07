import ICalculator from '../../homework-4-2/interfaces/ICalculator';
import { Calculator } from '../../homework-4-2/calculator';

describe('Calculator', () => {
  let calculator: ICalculator;

  const testANumber = 10;
  const testBNumber = 2;
  const testAddResult = 12;
  const testSubtractResult = 8;
  const testMultiplyResult = 20;
  const testDivideResult = 5;
  const testPercentResult = 0.2;

  beforeAll(() => {
    calculator = new Calculator();
  });

  it('should be instance of Calculator', () => {
    expect(calculator).toBeInstanceOf(Calculator);
  });

  it('should add two numbers', () => {
    expect(calculator.add(testANumber, testBNumber)).toBe(testAddResult);
  });

  it('should subtract two numbers', () => {
    expect(calculator.subtract(testANumber, testBNumber)).toBe(testSubtractResult);
  });

  it('should multiply two numbers', () => {
    expect(calculator.multiply(testANumber, testBNumber)).toBe(testMultiplyResult);
  });

  it('should divide two numbers', () => {
    expect(calculator.divide(testANumber, testBNumber)).toBe(testDivideResult);
  });

  it('should throw an error when dividing by zero', () => {
    expect(() => calculator.divide(testANumber, 0)).toThrow('Division by zero is not allowed');
  });

  it('should calculate percent of a number', () => {
    expect(calculator.percent(testBNumber, testANumber)).toBe(testPercentResult);
  });

  it('should perform addition using performOperation', () => {
    expect(calculator.performOperation('+', testANumber, testBNumber)).toBe(testAddResult);
  });

  it('should perform subtraction using performOperation', () => {
    expect(calculator.performOperation('-', testANumber, testBNumber)).toBe(testSubtractResult);
  });

  it('should perform multiplication using performOperation', () => {
    expect(calculator.performOperation('*', testANumber, testBNumber)).toBe(testMultiplyResult);
  });

  it('should perform division using performOperation', () => {
    expect(calculator.performOperation('/', testANumber, testBNumber)).toBe(testDivideResult);
  });

  it('should calculate percent using performOperation', () => {
    expect(calculator.performOperation('%', testBNumber, testANumber)).toBe(testPercentResult);
  });
});
