import { Circle, Ellipse } from '../../homework-5-1/ellipticalFigures';

describe('Circle', () => {
  let circle: Circle;

  const testRadius = 5;
  const testArea = 78.54;
  const testPerimeter = 31.42;
  const testDiameter = 10;

  beforeAll(() => {
    circle = new Circle('red', testRadius);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be instance of Circle', () => {
    expect(circle).toBeInstanceOf(Circle);
  });

  it('should calculate area of Circle', () => {
    expect(circle.calculateArea()).toBeCloseTo(testArea);
  });

  it('should calculate perimeter of Circle', () => {
    expect(circle.calculatePerimeter()).toBeCloseTo(testPerimeter);
  });

  it('should print diameter of Circle', () => {
    const spy = jest.spyOn(console, 'log');
    circle.printDiameter();
    expect(spy).toHaveBeenCalledWith(`Diameter: ${testDiameter}`);
  });

  it('should print info of Circle', () => {
    const spy = jest.spyOn(console, 'log');
    circle.printInfo();
    expect(spy).toHaveBeenCalledWith('Figure: Circle, color: red');
    expect(spy).toHaveBeenCalledWith(`Area: ${testArea.toFixed(2)}`);
    expect(spy).toHaveBeenCalledWith(`Perimeter: ${testPerimeter.toFixed(2)}`);
  });
});

describe('Ellipse', () => {
  let ellipse: Ellipse;

  const testRadiusA = 5;
  const testRadiusB = 10;
  const testAreaEllipse = 157.08;
  const testPerimeterEllipse = 48.44;
  const testDiameterA = 10;
  const testDiameterB = 20;

  beforeAll(() => {
    ellipse = new Ellipse('blue', testRadiusA, testRadiusB);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be instance of Ellipse', () => {
    expect(ellipse).toBeInstanceOf(Ellipse);
  });

  it('should calculate area of Ellipse', () => {
    expect(ellipse.calculateArea()).toBeCloseTo(testAreaEllipse);
  });

  it('should calculate perimeter of Ellipse', () => {
    expect(ellipse.calculatePerimeter()).toBeCloseTo(testPerimeterEllipse);
  });

  it('should print diameter of Ellipse', () => {
    const spy = jest.spyOn(console, 'log');
    ellipse.printDiameter();
    expect(spy).toHaveBeenCalledWith(`Diameter A: ${testDiameterA}`);
    expect(spy).toHaveBeenCalledWith(`Diameter B: ${testDiameterB}`);
  });

  it('should print info of Ellipse', () => {
    const spy = jest.spyOn(console, 'log');
    ellipse.printInfo();
    expect(spy).toHaveBeenCalledWith('Figure: Ellipse, color: blue');
    expect(spy).toHaveBeenCalledWith(`Area: ${testAreaEllipse.toFixed(2)}`);
    expect(spy).toHaveBeenCalledWith(`Perimeter: ${testPerimeterEllipse.toFixed(2)}`);
  });
});
