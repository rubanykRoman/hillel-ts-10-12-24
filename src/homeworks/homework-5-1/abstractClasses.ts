export abstract class GeometricFigure {
  constructor(
    public readonly name: string,
    public readonly color: string
  ) {}

  abstract calculateArea(): number;
  abstract calculatePerimeter(): number;
  printInfo(): void {
    console.log(`Figure: ${this.name}, color: ${this.color}`);
    console.log(`Area: ${this.calculateArea().toFixed(2)}`);
    console.log(`Perimeter: ${this.calculatePerimeter().toFixed(2)}`);
  }
}

export abstract class EllipticalFigures extends GeometricFigure {
  abstract printDiameter(): void;
}

export abstract class PolygonalFigures extends GeometricFigure {
  abstract sides: number;

  abstract printAreaFormula(): void;
  getNumberOfSides(): number {
    return this.sides;
  }
}
