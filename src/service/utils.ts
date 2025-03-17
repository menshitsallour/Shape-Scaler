import PolyBool from 'polybooljs';
import { Shape } from './shapes';
import type { Point } from './types';

export function findIntersection(
  line1: { start: Point; end: Point },
  line2: { start: Point; end: Point },
): Point | null {
  const x1 = line1.start.x,
    y1 = line1.start.y,
    x2 = line1.end.x,
    y2 = line1.end.y,
    x3 = line2.start.x,
    y3 = line2.start.y,
    x4 = line2.end.x,
    y4 = line2.end.y;

  const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (denom === 0) return null;

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    const x = x1 + t * (x2 - x1);
    const y = y1 + t * (y2 - y1);
    return { x, y };
  }
  return null;
}

export function createShapesFromCuts(
  lines: { start: Point; end: Point }[],
  centerX: number,
  centerY: number,
  squareSize: number,
  renderElement: SVGSVGElement | HTMLCanvasElement,
  isSVG: boolean,
): Shape[] {
  const shapes: Shape[] = [];

  const square = {
    regions: [
      [
        [centerX, centerY],
        [centerX + squareSize, centerY],
        [centerX + squareSize, centerY + squareSize],
        [centerX, centerY + squareSize],
      ],
    ],
    inverted: false,
  };

  const allPoints: Point[] = [
    { x: centerX, y: centerY },
    { x: centerX + squareSize, y: centerY },
    { x: centerX + squareSize, y: centerY + squareSize },
    { x: centerX, y: centerY + squareSize },
  ];
  lines.forEach((line) => {
    allPoints.push(line.start, line.end);
  });
  const intersections: Point[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      const intersection = findIntersection(lines[i]!, lines[j]!);
      if (intersection) {
        intersections.push(intersection);
      }
    }
  }
  allPoints.push(...intersections);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const linePolygons: any[] = lines.map((line) => {
    const dx = line.end.x - line.start.x;
    const dy = line.end.y - line.start.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const nx = dy / len;
    const ny = -dx / len;
    const thickness = 0.1;
    return {
      regions: [
        [
          [line.start.x + nx * thickness, line.start.y + ny * thickness],
          [line.start.x - nx * thickness, line.start.y - ny * thickness],
          [line.end.x - nx * thickness, line.end.y - ny * thickness],
          [line.end.x + nx * thickness, line.end.y + ny * thickness],
        ],
      ],
      inverted: false,
    };
  });

  let combinedLines = linePolygons[0] || { regions: [], inverted: false };
  for (let i = 1; i < linePolygons.length; i++) {
    combinedLines = PolyBool.union(combinedLines, linePolygons[i]);
  }

  const result = PolyBool.difference(square, combinedLines);

  result.regions.forEach((region: number[][]) => {
    const vertices: Point[] = region.map(([x, y]) => {
      if (x === undefined || y === undefined) {
        throw new Error('Invalid point coordinates');
      }
      return { x, y };
    });

    if (vertices.length >= 3) {
      shapes.push(new Shape(vertices, isSVG, isSVG ? (renderElement as SVGSVGElement) : undefined));
    }
  });

  if (shapes.length === 0) {
    shapes.push(
      new Shape(
        [
          { x: centerX, y: centerY },
          { x: centerX + squareSize, y: centerY },
          { x: centerX + squareSize, y: centerY + squareSize },
          { x: centerX, y: centerY + squareSize },
        ],
        isSVG,
        isSVG ? (renderElement as SVGSVGElement) : undefined,
      ),
    );
  }

  return shapes;
}
