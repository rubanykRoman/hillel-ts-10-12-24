import { EllipticalFigures } from './abstractClasses';

class Circle extends EllipticalFigures {
  constructor(
    color: string,
    public radius: number
  ) {
    super('Circle', color);
  }

  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
  calculatePerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  printDiameter(): void {
    console.log(`Diameter: ${2 * this.radius}`);
  }
}

class Ellipse extends EllipticalFigures {
  constructor(
    color: string,
    public radius: number,
    public radiusB: number
  ) {
    super('Ellipse', color);
  }
  calculateArea(): number {
    return Math.PI * this.radius * this.radiusB;
  }

  calculatePerimeter(): number {
    const a = this.radius;
    const b = this.radiusB;
    return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  }

  printDiameter(): void {
    console.log(`Diameter A: ${2 * this.radius}`);
    console.log(`Diameter B: ${2 * this.radiusB}`);
  }
}

const circle = new Circle('red', 5);
circle.printInfo();
circle.printDiameter();

const ellipse = new Ellipse('blue', 5, 10);
ellipse.printInfo();
ellipse.printDiameter();
