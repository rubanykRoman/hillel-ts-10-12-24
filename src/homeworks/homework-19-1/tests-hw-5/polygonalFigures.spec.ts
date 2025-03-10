import { Rectangle, Square, Triangle, Polygon } from '../../homework-5-1/polygonalFigures';

describe('Rectangle', () => {
  let rectangle: Rectangle;

  const testWidth = 10;
  const testHeight = 20;
  const testArea = 200;
  const testPerimeter = 60;
  const testSides = 4;

  beforeAll(() => {
    rectangle = new Rectangle('Blue', testWidth, testHeight);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be instance of Rectangle', () => {
    expect(rectangle).toBeInstanceOf(Rectangle);
  });

  it('should calculate area of Rectangle', () => {
    expect(rectangle.calculateArea()).toBe(testArea);
  });

  it('should calculate perimeter of Rectangle', () => {
    expect(rectangle.calculatePerimeter()).toBe(testPerimeter);
  });

  it('should print area formula of Rectangle', () => {
    const spy = jest.spyOn(console, 'log');
    rectangle.printAreaFormula();
    expect(spy).toHaveBeenCalledWith('Area formula: width * height');
  });

  it('should print info of Rectangle', () => {
    const spy = jest.spyOn(console, 'log');
    rectangle.printInfo();
    expect(spy).toHaveBeenCalledWith('Figure: Rectangle, color: Blue');
    expect(spy).toHaveBeenCalledWith(`Area: ${testArea.toFixed(2)}`);
    expect(spy).toHaveBeenCalledWith(`Perimeter: ${testPerimeter.toFixed(2)}`);
  });

  it('should get the number of sides for Rectangle', () => {
    expect(rectangle.getNumberOfSides()).toBe(testSides);
  });
});

describe('Square', () => {
  let square: Square;

  const testSide = 15;
  const testArea = 225;
  const testPerimeter = 60;
  const testSides = 4;

  beforeAll(() => {
    square = new Square('Red', testSide);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be instance of Square', () => {
    expect(square).toBeInstanceOf(Square);
  });

  it('should calculate area of Square', () => {
    expect(square.calculateArea()).toBe(testArea);
  });

  it('should calculate perimeter of Square', () => {
    expect(square.calculatePerimeter()).toBe(testPerimeter);
  });

  it('should print area formula of Square', () => {
    const spy = jest.spyOn(console, 'log');
    square.printAreaFormula();
    expect(spy).toHaveBeenCalledWith('Area formula: side^2');
  });

  it('should print info of Square', () => {
    const spy = jest.spyOn(console, 'log');
    square.printInfo();
    expect(spy).toHaveBeenCalledWith('Figure: Square, color: Red');
    expect(spy).toHaveBeenCalledWith(`Area: ${testArea.toFixed(2)}`);
    expect(spy).toHaveBeenCalledWith(`Perimeter: ${testPerimeter.toFixed(2)}`);
  });

  it('should get the number of sides for Square', () => {
    expect(square.getNumberOfSides()).toBe(testSides);
  });
});

describe('Triangle', () => {
  let triangle: Triangle;

  const testSideA = 13;
  const testSideB = 14;
  const testSideC = 15;
  const testArea = 84.0;
  const testPerimeter = 42;
  const testSides = 3;

  beforeAll(() => {
    triangle = new Triangle('Green', testSideA, testSideB, testSideC);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be instance of Triangle', () => {
    expect(triangle).toBeInstanceOf(Triangle);
  });

  it('should calculate area of Triangle', () => {
    expect(triangle.calculateArea()).toBeCloseTo(testArea, 2);
  });

  it('should calculate perimeter of Triangle', () => {
    expect(triangle.calculatePerimeter()).toBe(testPerimeter);
  });

  it('should print area formula of Triangle', () => {
    const spy = jest.spyOn(console, 'log');
    triangle.printAreaFormula();
    expect(spy).toHaveBeenCalledWith(
      'Area formula: sqrt(s * (s - sideA) * (s - sideB) * (s - sideC))'
    );
  });

  it('should print info of Triangle', () => {
    const spy = jest.spyOn(console, 'log');
    triangle.printInfo();
    expect(spy).toHaveBeenCalledWith('Figure: Triangle, color: Green');
    expect(spy).toHaveBeenCalledWith(`Area: ${testArea.toFixed(2)}`);
    expect(spy).toHaveBeenCalledWith(`Perimeter: ${testPerimeter.toFixed(2)}`);
  });

  it('should get the number of sides for Triangle', () => {
    expect(triangle.getNumberOfSides()).toBe(testSides);
  });

  it('should identify triangle type', () => {
    const spy = jest.spyOn(console, 'log');
    triangle.printTriangleType();
    expect(spy).toHaveBeenCalledWith('Scalene triangle');
  });

  it('should calculate height relative to side A', () => {
    const height = triangle.calcHeight(1);
    expect(height).toBeCloseTo(12.92, 2);
  });
});

describe('Polygon', () => {
  let polygon: Polygon;

  const testSides = 6;
  const testSideLength = 10;
  const testArea = 259.81;
  const testPerimeter = 60;

  beforeAll(() => {
    polygon = new Polygon('Purple', testSides, testSideLength);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be instance of Polygon', () => {
    expect(polygon).toBeInstanceOf(Polygon);
  });

  it('should calculate area of Polygon', () => {
    expect(polygon.calculateArea()).toBeCloseTo(testArea, 2);
  });

  it('should calculate perimeter of Polygon', () => {
    expect(polygon.calculatePerimeter()).toBe(testPerimeter);
  });

  it('should print area formula of Polygon', () => {
    const spy = jest.spyOn(console, 'log');
    polygon.printAreaFormula();
    expect(spy).toHaveBeenCalledWith(
      'Area formula: (sides * sideLength^2) / (4 * tan(PI / sides))'
    );
  });

  it('should print info of Polygon', () => {
    const spy = jest.spyOn(console, 'log');
    polygon.printInfo();
    expect(spy).toHaveBeenCalledWith('Figure: Polygon, color: Purple');
    expect(spy).toHaveBeenCalledWith(`Area: ${testArea.toFixed(2)}`);
    expect(spy).toHaveBeenCalledWith(`Perimeter: ${testPerimeter.toFixed(2)}`);
  });

  it('should get the number of sides for Polygon', () => {
    expect(polygon.getNumberOfSides()).toBe(testSides);
  });
});
