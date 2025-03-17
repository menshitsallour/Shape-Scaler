import type { Point } from './types';

export class Square {
  private centerX: number;
  private centerY: number;
  private size: number;
  private center: Point;

  constructor(canvasWidth: number, canvasHeight: number, size: number) {
    this.centerX = canvasWidth / 2 - size / 2;
    this.centerY = canvasHeight / 2 - size / 2;
    this.size = size;
    this.center = {
      x: this.centerX + this.size / 2,
      y: this.centerY + this.size / 2,
    };
  }

  getCenter(): Point {
    return this.center;
  }

  getTopLeft(): Point {
    return { x: this.centerX, y: this.centerY };
  }

  getSize(): number {
    return this.size;
  }

  // Generate random lines between different edges of the square
  generateLines(numLines: number): { start: Point; end: Point }[] {
    const lines: { start: Point; end: Point }[] = [];

    for (let i = 0; i < numLines; i++) {
      const edge1 = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
      let edge2: number;
      do {
        edge2 = Math.floor(Math.random() * 4); // Ensure edge2 is different from edge1
      } while (edge2 === edge1);

      const t1 = Math.random(); // Position on edge1
      const t2 = Math.random(); // Position on edge2

      let point1: Point = { x: 0, y: 0 };
      let point2: Point = { x: 0, y: 0 };

      // Point 1 based on edge1
      switch (edge1) {
        case 0: // Top
          point1 = { x: this.centerX + t1 * this.size, y: this.centerY };
          break;
        case 1: // Right
          point1 = {
            x: this.centerX + this.size,
            y: this.centerY + t1 * this.size,
          };
          break;
        case 2: // Bottom
          point1 = {
            x: this.centerX + t1 * this.size,
            y: this.centerY + this.size,
          };
          break;
        case 3: // Left
          point1 = { x: this.centerX, y: this.centerY + t1 * this.size };
          break;
      }

      // Point 2 based on edge2
      switch (edge2) {
        case 0: // Top
          point2 = { x: this.centerX + t2 * this.size, y: this.centerY };
          break;
        case 1: // Right
          point2 = {
            x: this.centerX + this.size,
            y: this.centerY + t2 * this.size,
          };
          break;
        case 2: // Bottom
          point2 = {
            x: this.centerX + t2 * this.size,
            y: this.centerY + this.size,
          };
          break;
        case 3: // Left
          point2 = { x: this.centerX, y: this.centerY + t2 * this.size };
          break;
      }

      lines.push({ start: point1, end: point2 });
    }

    return lines;
  }
}
