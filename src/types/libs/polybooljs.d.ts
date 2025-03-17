type Region = number[][];

interface PolyBoolPolygon {
  regions: Region[];
  inverted: boolean;
}

declare module 'polybooljs' {
  export function union(a: PolyBoolPolygon, b: PolyBoolPolygon): PolyBoolPolygon;
  export function difference(a: PolyBoolPolygon, b: PolyBoolPolygon): PolyBoolPolygon;
}
