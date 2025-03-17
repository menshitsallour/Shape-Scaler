<template>
  <div>
    <q-btn @click="toggleMode" label="Toggle SVG/Canvas" class="toggle-btn" />
    <svg ref="svgRef" class="full-page-svg" :class="{ hidden: !store.isSVG }" />
    <canvas ref="canvasRef" class="full-page-canvas" :class="{ hidden: store.isSVG }" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Animation } from '../../service/animation';
import { animationStore } from '../../stores/animationStore';

const store = animationStore();
const svgRef = ref<SVGSVGElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationManager: Animation;
let animationFrameId: number | null = null;

function updateShapes(scaleFactor: number) {
  const center = store.square?.getCenter() || { x: 0, y: 0 };
  store.shapes.forEach((shape) => shape.moveFromCenter(center, scaleFactor));
}

function resetAndRebuild() {
  clearCanvas();
  clearSVG();
  store.shapes = [];
  store.initializeShapes(getRenderElement());
}

function clearSVG() {
  if (!store.isSVG || !svgRef.value) return;
  while (svgRef.value.firstChild) {
    svgRef.value.removeChild(svgRef.value.firstChild);
  }
}

function clearCanvas() {
  if (store.isSVG || !canvasRef.value) return;
  const ctx = canvasRef.value.getContext('2d');
  if (ctx) ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
}

function drawCanvas() {
  if (store.isSVG || !canvasRef.value) return;
  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  store.shapes.forEach((shape) => shape.draw(ctx));
}

function getRenderElement(): SVGSVGElement | HTMLCanvasElement {
  return store.isSVG ? svgRef.value! : canvasRef.value!;
}

function handleResize() {
  if (svgRef.value) {
    svgRef.value.setAttribute('width', `${window.innerWidth}`);
    svgRef.value.setAttribute('height', `${window.innerHeight}`);
  }
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
  }
  drawCanvas();
}

function toggleMode() {
  store.toggleMode();
  resetAndRebuild();
}

function startAnimation() {
  setRenderSize();
  animationManager = new Animation(2, 0.01, updateShapes, resetAndRebuild);

  const animate = () => {
    animationManager.animate();
    drawCanvas();
    animationFrameId = requestAnimationFrame(animate);
  };

  drawCanvas();
  animationFrameId = requestAnimationFrame(animate);
}

function setRenderSize() {
  if (svgRef.value) {
    svgRef.value.setAttribute('width', `${window.innerWidth}`);
    svgRef.value.setAttribute('height', `${window.innerHeight}`);
  }
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
  }
}

onMounted(() => {
  store.initializeShapes(getRenderElement());
  startAnimation();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped lang="scss">
.full-page-svg,
.full-page-canvas {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: 1;
}

.toggle-btn {
  position: fixed;
  top: 100px;
  right: 20px;
  z-index: 10;
  background: white;
  color: rgb(133, 60, 60);
}

.hidden {
  display: none;
}
</style>
