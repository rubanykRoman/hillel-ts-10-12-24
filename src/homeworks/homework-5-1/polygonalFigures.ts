import { PolygonalFigures } from './abstractClasses';
import { POLYGON_MIN_SIDES_COUNT, RECTANGLE_SIDES_COUNT, TRIANGLE_SIDES_COUNT } from './constants';

export class Rectangle extends PolygonalFigures {
  sides = RECTANGLE_SIDES_COUNT;

  constructor(
    color: string,
    public width: number,
    public height: number
  ) {
    super('Rectangle', color);
  }

  calculatePerimeter(): number {
    return 2 * (this.width + this.height);
  }

  calculateArea(): number {
    return this.width * this.height;
  }

  printAreaFormula(): void {
    console.log('Area formula: width * height');
  }
}

export class Square extends PolygonalFigures {
  sides = RECTANGLE_SIDES_COUNT;

  constructor(
    color: string,
    public side: number
  ) {
    super('Square', color);
  }

  calculatePerimeter(): number {
    return 4 * this.side;
  }

  calculateArea(): number {
    return this.side ** 2;
  }

  printAreaFormula(): void {
    console.log('Area formula: side^2');
  }
}

export class Triangle extends PolygonalFigures {
  sides = TRIANGLE_SIDES_COUNT;

  constructor(
    color: string,
    public sideA: number,
    public sideB: number,
    public sideC: number
  ) {
    super('Triangle', color);
  }

  calculatePerimeter(): number {
    return this.sideA + this.sideB + this.sideC;
  }

  calculateArea(): number {
    const s = this.calculatePerimeter() / 2;
    return Math.sqrt(s * (s - this.sideA) * (s - this.sideB) * (s - this.sideC));
  }

  printAreaFormula(): void {
    console.log('Area formula: sqrt(s * (s - sideA) * (s - sideB) * (s - sideC))');
  }

  printTriangleType(): void {
    if (this.sideA === this.sideB && this.sideB === this.sideC) {
      console.log('Equilateral triangle');
    } else if (
      this.sideA === this.sideB ||
      this.sideA === this.sideC ||
      this.sideB === this.sideC
    ) {
      console.log('Isosceles triangle');
    } else {
      console.log('Scalene triangle');
    }
  }
  calcHeight(sideIndex: number): number {
    let base: number;
    if (sideIndex === 1) {
      base = this.sideA;
    } else if (sideIndex === 2) {
      base = this.sideB;
    } else if (sideIndex === 3) {
      base = this.sideC;
    } else {
      throw new Error('Invalid side index. Use 1, 2, or 3.');
    }

    const area = this.calculateArea();
    return (2 * area) / base;
  }
}

export class Polygon extends PolygonalFigures {
  constructor(
    color: string,
    public sides: number,
    public sideLength: number
  ) {
    super('Polygon', color);

    if (this.sides < POLYGON_MIN_SIDES_COUNT) {
      throw new Error('A polygon must have at least 3 sides.');
    }
  }

  calculatePerimeter(): number {
    return this.sides * this.sideLength;
  }

  calculateArea(): number {
    return (this.sides * this.sideLength ** 2) / (4 * Math.tan(Math.PI / this.sides));
  }
  printAreaFormula(): void {
    console.log('Area formula: (sides * sideLength^2) / (4 * tan(PI / sides))');
  }
}

const rectangle = new Rectangle('Blue', 10, 20);
rectangle.printInfo();
console.log(`Number of sides: ${rectangle.getNumberOfSides()}`);
rectangle.printAreaFormula();
console.log('----------------------------');

const square = new Square('Red', 15);
square.printInfo();
console.log(`Number of sides: ${square.getNumberOfSides()}`);
square.printAreaFormula();
console.log('----------------------------');

const triangle = new Triangle('Green', 13, 14, 15);
triangle.printInfo();
console.log(`Number of sides: ${triangle.getNumberOfSides()}`);
triangle.printTriangleType();
triangle.printAreaFormula();
console.log(`Height relative to side A: ${triangle.calcHeight(1).toFixed(2)}`);
console.log(`Height relative to side B: ${triangle.calcHeight(2).toFixed(2)}`);
console.log(`Height relative to side C: ${triangle.calcHeight(3).toFixed(2)}`);
console.log('----------------------------');

const polygon = new Polygon('Purple', 6, 10);
polygon.printInfo();
console.log(`Number of sides: ${polygon.getNumberOfSides()}`);
polygon.printAreaFormula();
