<script setup lang="ts">
  import { unref, type Ref } from "vue";
  import WebGL2Canvas, { type WebGl2ProgramInfo } from "./WebGL2Canvas.vue";

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

  let emit = defineEmits<{ (event: "ready", info: WebGl2ProgramInfo): void }>();
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

    emit("ready", {
      gl,
      canvas,
      program,
      render() {
        let { scale, offset } = computeScaleAndOffset();
        gl.uniform2f(scaleLoc, ...scale);
        gl.uniform2f(offsetLoc, ...offset);
        render();
      },
    });
  }
</script>

<template>
  <WebGL2Canvas :shader="coordConvertShader + unref(shader)" @ready="onReady">
    <template #nav>
      <slot name="nav" />
    </template>
  </WebGL2Canvas>
</template>
