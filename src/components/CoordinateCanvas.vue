<script setup lang="ts">
  import { router } from "@/main";
  import { unref, type Ref } from "vue";
  import WebGL2Canvas, { type WebGl2ProgramInfo } from "./WebGL2Canvas.vue";

  export interface CoordinateCanvasInfo extends WebGl2ProgramInfo {
    mouseToCoords(
      mouseXPercent: number,
      mouseYPercent: number
    ): [coordX: number, coordY: number];

    getCoords(): CoordinateList;
    updateCoords(coords: CoordinateList): void;
    getSaveCode(): string;
    loadSaveCode(code: string): void;
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
  let { shader } = defineProps<{ shader: string | Ref<string> }>();

  let coordConvertShader = `
    #version 300 es
    precision highp float;

    uniform vec2 scale;
    uniform vec2 offset;
    vec2 convert(vec2 pos) {
      return pos * scale + offset;
    }
    `;

  function onReady({ gl, canvas, program, render }: WebGl2ProgramInfo) {
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

    function getSaveCode() {
      return `${xStart},${xEnd},${yStart},${yEnd}`;
    }

    function loadSaveCode(code: string) {
      let [xs, xe, ys, ye] = code.split(",").map(Number);

      if (!isNaN(xs) && !isNaN(xe) && !isNaN(ys) && !isNaN(ye))
        updateCoords({ xStart: xs, xEnd: xe, yStart: ys, yEnd: ye });
    }

    emit("ready", {
      gl,
      canvas,
      program,
      updateCoords,
      mouseToCoords,
      getSaveCode,
      loadSaveCode,
      getCoords: computeEndpoints,
      render: renderCanvas,
    });

    let isMouseDown = false;

    canvas.addEventListener("mousedown", (e) => {
      if (e.button == 0) {
        isMouseDown = true;
        return;
      }
    });

    canvas.addEventListener("mousemove", ({ movementX, movementY }) => {
      if (!isMouseDown) return;

      // Have to rename locals as `computeEndpoints` returns something different than globals
      let { xStart: xs, xEnd: xe, yStart: ys, yEnd: ye } = computeEndpoints();
      let xChange =
        (-((xe - xs) * movementX) / canvas.width) * devicePixelRatio;
      let yChange =
        (((ye - ys) * movementY) / canvas.height) * devicePixelRatio;

      updateCoords({
        xStart: xStart + xChange,
        xEnd: xEnd + xChange,
        yStart: yStart + yChange,
        yEnd: yEnd + yChange,
      });
    });

    window.addEventListener("mouseup", (e) => {
      if (e.button == 0) return (isMouseDown = false);
    });

    // The FSCanvas component dispatches `resize` after update the canvas's size.
    canvas.addEventListener("resize", renderCanvas);
  }
</script>

<template>
  <WebGL2Canvas :shader="coordConvertShader + unref(shader)" @ready="onReady">
    <template #nav>
      <slot name="nav" />
    </template>
  </WebGL2Canvas>
</template>
