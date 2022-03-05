<script setup lang="ts">
  import NavLink from "./NavLink.vue";
  import WebGL2Canvas, { type WebGL2ProgramInfo } from "./WebGL2Canvas.vue";

  export interface CoordinateCanvasInfo extends WebGL2ProgramInfo {
    mouseToCoords(
      mouseXPercent: number,
      mouseYPercent: number
    ): [coordX: number, coordY: number];

    getCoords(): CoordinateList;
    updateCoords(coords: CoordinateList): void;
    getCode(): string;
    loadCode(code: string): void;
  }

  export interface CoordinateList {
    xStart: number;
    xEnd: number;
    yStart: number;
    yEnd: number;
  }

  export interface ScaleAndOffset {
    scale: [xScale: number, yScale: number];
    offset: [xOffset: number, yOffset: number];
  }

  let emit =
    defineEmits<{ (event: "ready", info: CoordinateCanvasInfo): void }>();
  let props = defineProps<{
    shader: string;
    showResetButton?: boolean;
    breakpoint?: number;
  }>();
  let { showResetButton, breakpoint } = props;

  let coordConvertShader = `
    #version 300 es
    precision highp float;

    uniform vec2 scale;
    uniform vec2 offset;
    vec2 convert(vec2 pos) {
      return pos * scale + offset;
    }
    `;

  let _reset: (() => void) | undefined;

  function onReady({ gl, canvas, program, render }: WebGL2ProgramInfo) {
    let [xStart, xEnd, yStart, yEnd] = [-2, 2, -2, 2];
    let scaleLoc = gl.getUniformLocation(program, "scale")!;
    let offsetLoc = gl.getUniformLocation(program, "offset")!;
    if (!scaleLoc || !offsetLoc) return;

    function computeEndpoints(): CoordinateList {
      let xCenter = (xStart + xEnd) / 2;
      let yCenter = (yStart + yEnd) / 2;
      let xSize = Math.min(canvas.width, canvas.height) / canvas.width;
      let ySize = Math.min(canvas.width, canvas.height) / canvas.height;

      return {
        xStart: (xStart - xCenter) / xSize + xCenter,
        xEnd: (xEnd - xCenter) / xSize + xCenter,
        yStart: (yStart - yCenter) / ySize + yCenter,
        yEnd: (yEnd - yCenter) / ySize + yCenter,
      };
    }

    function computeScaleAndOffset(): ScaleAndOffset {
      let { xStart, xEnd, yStart, yEnd } = computeEndpoints();
      let xScale = (xEnd - xStart) / 2;
      let yScale = (yEnd - yStart) / 2;

      return {
        scale: [xScale, yScale],
        offset: [xStart + xScale, yStart + yScale],
      };
    }

    function renderCanvas() {
      let { scale, offset } = computeScaleAndOffset();
      gl.uniform2f(scaleLoc, ...scale);
      gl.uniform2f(offsetLoc, ...offset);
      render();
    }

    function mouseToCoords(
      mouseXPercent: number,
      mouseYPercent: number
    ): [coordX: number, coordY: number] {
      let { scale, offset } = computeScaleAndOffset();
      let x = (mouseXPercent * 2 - 1) * scale[0] + offset[0];
      let y = ((1 - mouseYPercent) * 2 - 1) * scale[1] + offset[1];
      return [x, y];
    }

    function updateCoords(coords: CoordinateList) {
      ({ xStart, xEnd, yStart, yEnd } = coords);
      renderCanvas();
    }

    function getCode() {
      return `${xStart},${xEnd},${yStart},${yEnd}`.replace(/\./g, "d");
    }

    function loadCode(code: string) {
      let [xs, xe, ys, ye] = code.replace(/d/g, ".").split(",").map(Number);

      if (!isNaN(xs) && !isNaN(xe) && !isNaN(ys) && !isNaN(ye))
        updateCoords({ xStart: xs, xEnd: xe, yStart: ys, yEnd: ye });
    }

    emit("ready", {
      gl,
      canvas,
      program,
      updateCoords,
      mouseToCoords,
      getCode,
      loadCode,
      getCoords: computeEndpoints,
      render: renderCanvas,
    });

    let isMouseDown = false;
    let lastMouseX = NaN;
    let lastMouseY = NaN;

    canvas.addEventListener("pointerdown", (e) => {
      canvas.setPointerCapture(e.pointerId);
      if (e.button == 0) {
        isMouseDown = true;
        lastMouseX = NaN;
        lastMouseY = NaN;
        lastTouchPointA = [NaN, NaN];
        lastTouchPointB = [NaN, NaN];
      }
    });

    window.addEventListener("pointerup", (e) => {
      if (e.button == 0) {
        isMouseDown = false;
        lastMouseX = NaN;
        lastMouseY = NaN;
        lastTouchPointA = [NaN, NaN];
        lastTouchPointB = [NaN, NaN];
      }
    });

    function executeMove(clientX: number, clientY: number) {
      if (!isMouseDown) return;
      if (isNaN(lastMouseX) || isNaN(lastMouseY)) {
        lastMouseX = clientX;
        lastMouseY = clientY;
        return;
      }

      let diffX = clientX - lastMouseX;
      let diffY = clientY - lastMouseY;
      lastMouseX = clientX;
      lastMouseY = clientY;

      // Have to rename locals as `computeEndpoints` returns something different than globals
      let { xStart: xs, xEnd: xe, yStart: ys, yEnd: ye } = computeEndpoints();
      let xChange = ((-(xe - xs) * diffX) / canvas.width) * devicePixelRatio;
      let yChange = (((ye - ys) * diffY) / canvas.height) * devicePixelRatio;
      updateCoords({
        xStart: xStart + xChange,
        xEnd: xEnd + xChange,
        yStart: yStart + yChange,
        yEnd: yEnd + yChange,
      });
    }

    function executeZoom(offsetX: number, offsetY: number, strength: number) {
      let xRange = xEnd - xStart;
      let yRange = yEnd - yStart;

      let width = canvas.width / devicePixelRatio;
      let height = canvas.height / devicePixelRatio;

      let smallSide = Math.min(height, width);
      let xPercent = (offsetX - (width - smallSide) / 2) / smallSide;
      let yPercent = (height - offsetY - (height - smallSide) / 2) / smallSide;

      xPercent *= strength / 100;
      yPercent *= strength / 100;

      updateCoords({
        xStart: xStart + xPercent * xRange,
        xEnd: xEnd - (0.01 * strength - xPercent) * xRange,
        yStart: yStart + yPercent * yRange,
        yEnd: yEnd - (0.01 * strength - yPercent) * yRange,
      });
    }

    canvas.addEventListener(
      "mousemove",
      ({ clientX, clientY }) => executeMove(clientX, clientY),
      { passive: true }
    );

    let lastTouchPointA: [number, number] = [NaN, NaN];
    let lastTouchPointB: [number, number] = [NaN, NaN];
    canvas.addEventListener(
      "touchmove",
      (event) => {
        event.preventDefault();
        let { touches } = event;
        if (touches.length == 1) {
          let [{ clientX, clientY }] = touches;
          lastTouchPointA = [NaN, NaN];
          lastTouchPointB = [NaN, NaN];
          executeMove(clientX, clientY);
        } else if (touches.length == 2) {
          let [{ clientX: x1, clientY: y1 }, { clientX: x2, clientY: y2 }] =
            touches;

          let [px1, py1] = lastTouchPointA;
          let [px2, py2] = lastTouchPointB;

          if (isNaN(px1) || isNaN(py1) || isNaN(px2) || isNaN(py2)) {
            lastTouchPointA = [x1, y1];
            lastTouchPointB = [x2, y2];
            return;
          }

          let oldDist = Math.hypot(px2 - px1, py2 - py1);
          let dist = Math.hypot(x2 - x1, y2 - y1);

          let strength = (dist - oldDist) / 20;
          executeZoom((x1 + x2) / 2, (y1 + y2) / 2, strength);
        }
      },
      { passive: false }
    );

    canvas.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        let strength =
          -Math.sqrt(Math.abs(event.deltaY)) * Math.sign(event.deltaY);

        executeZoom(event.offsetX, event.offsetY, strength);
      },
      { passive: false }
    );

    // The FullscreenCanvas component dispatches `resize` after update the canvas's size.
    canvas.addEventListener("resize", renderCanvas);

    _reset = () => updateCoords({ xStart: -2, xEnd: 2, yStart: -2, yEnd: 2 });
  }

  function reset() {
    _reset && _reset();
  }
</script>

<template>
  <WebGL2Canvas
    :shader="coordConvertShader + shader"
    :breakpoint="breakpoint"
    @ready="onReady"
  >
    <template #nav>
      <NavLink v-if="showResetButton" @click="reset && reset()">Reset</NavLink>

      <slot name="nav" />
    </template>
  </WebGL2Canvas>
</template>
