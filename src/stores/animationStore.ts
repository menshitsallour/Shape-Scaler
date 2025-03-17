import { defineStore } from 'pinia';
import type { Shape } from '../service/shapes';
import { Square } from '../service/square';
import { createShapesFromCuts } from '../service/utils';

export const animationStore = defineStore('app', {
  state: () => ({
    shapes: [] as Shape[],
    square: null as Square | null,
    numLines: 10,
    squareSize: 400,
    isSVG: false,
  }),
  actions: {
    initializeShapes(renderElement: SVGSVGElement | HTMLCanvasElement) {
      this.square = new Square(window.innerWidth, window.innerHeight, this.squareSize);
      const lines = this.square.generateLines(this.numLines);
      const topLeft = this.square.getTopLeft();
      this.shapes = createShapesFromCuts(
        lines,
        topLeft.x,
        topLeft.y,
        this.squareSize,
        renderElement,
        this.isSVG,
      );
    },
    toggleMode() {
      this.isSVG = !this.isSVG;
    },
  },
});

export default animationStore;
