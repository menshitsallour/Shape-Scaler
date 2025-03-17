import type { Point } from './types';

export interface ShapeInterface {
  vertices: Point[];
  originalVertices: Point[];
  centroid: Point;
  originalCentroid: Point;
  color: string;
  element: SVGElement | null; // Explicitly define element as optional
  moveFromCenter(squareCenter: Point, scaleFactor: number): void;
  draw(ctx: CanvasRenderingContext2D): void;
  getVertices(): Point[];
}

export class Shape implements ShapeInterface {
  public vertices: Point[];
  public originalVertices: Point[];
  public centroid: Point;
  public originalCentroid: Point;
  public color: string;
  public element: SVGElement | null; // Publicly accessible

  constructor(vertices: Point[], isSVG: boolean, svg?: SVGSVGElement) {
    this.vertices = vertices;
    this.originalVertices = vertices.map((vertex) => ({ x: vertex.x, y: vertex.y }));
    this.centroid = { x: 0, y: 0 };
    this.originalCentroid = { x: 0, y: 0 };
    this.color = `hsl(${Math.random() * 360}, 70%, 70%)`;
    this.element = null; // Default to null
    this.calculateCentroid();

    if (isSVG && svg) {
      this.element = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      this.updateElement();
      svg.appendChild(this.element);
    }
  }

  private calculateCentroid(): void {
    const centroid = { x: 0, y: 0 };
    this.vertices.forEach((vertex) => {
      centroid.x += vertex.x;
      centroid.y += vertex.y;
    });
    centroid.x /= this.vertices.length;
    centroid.y /= this.vertices.length;
    this.centroid = centroid;
    this.originalCentroid = { x: centroid.x, y: centroid.y };
  }

  moveFromCenter(squareCenter: Point, scaleFactor: number): void {
    const dx = this.originalCentroid.x - squareCenter.x;
    const dy = this.originalCentroid.y - squareCenter.y;

    const newCentroidX = squareCenter.x + dx * scaleFactor;
    const newCentroidY = squareCenter.y + dy * scaleFactor;

    const translateX = newCentroidX - this.centroid.x;
    const translateY = newCentroidY - this.centroid.y;

    this.centroid.x = newCentroidX;
    this.centroid.y = newCentroidY;

    this.vertices.forEach((vertex) => {
      vertex.x += translateX;
      vertex.y += translateY;
    });
    if (this.element) this.updateElement();
  }

  private updateElement(): void {
    if (this.element) {
      const points = this.vertices.map((v) => `${v.x},${v.y}`).join(' ');
      this.element.setAttribute('points', points);
      this.element.setAttribute('fill', this.color);
      this.element.setAttribute('stroke', 'black');
      this.element.setAttribute('stroke-width', '1');
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.element) {
      ctx.beginPath();
      ctx.moveTo(this.vertices[0]!.x, this.vertices[0]!.y);
      for (let i = 1; i < this.vertices.length; i++) {
        ctx.lineTo(this.vertices[i]!.x, this.vertices[i]!.y);
      }
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.stroke();
    }
  }

  getVertices(): Point[] {
    return this.vertices;
  }
}
