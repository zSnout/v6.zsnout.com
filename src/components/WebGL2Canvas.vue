<script lang="ts">
  export function createShader(
    gl: WebGL2RenderingContext,
    type: "VERTEX" | "FRAGMENT",
    source: string
  ) {
    let shader = gl.createShader(gl[`${type}_SHADER`]);
    if (!shader) return null;
    gl.shaderSource(shader, source.trim());
    gl.compileShader(shader);

    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  export function createProgram(
    gl: WebGL2RenderingContext,
    vertShader: string,
    fragShader: string
  ) {
    let program = gl.createProgram();
    if (!program) return null;

    let vert = createShader(gl, "VERTEX", vertShader);
    if (!vert) return null;

    let frag = createShader(gl, "FRAGMENT", fragShader);
    if (!frag) return null;

    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
</script>

<script lang="ts" setup>
  import FullscreenCanvas from "./FullscreenCanvas.vue";

  export interface WebGL2ProgramInfo {
    canvas: HTMLCanvasElement;
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    render(): void;
  }

  let emit = defineEmits<{ (event: "ready", info: WebGL2ProgramInfo): void }>();

  let { shader, preserveDrawingBuffer } = defineProps<{
    shader: string;
    breakpoint?: number;
    preserveDrawingBuffer?: boolean;
  }>();

  let vertShader = `
  #version 300 es

  precision highp float;
  in vec2 _pos;
  out vec2 pos;

  void main() {
    gl_Position = vec4(pos = _pos * vec2(1, -1), 0, 1);
  }
  `.trim();

  function onReady(canvas: HTMLCanvasElement) {
    let gl = canvas.getContext("webgl2", { preserveDrawingBuffer })!;
    if (!gl) return;
    let lastProgram: WebGLProgram | null = null;

    function updateWebGL(shader: string) {
      let program = createProgram(gl, vertShader, shader);
      if (!program) return null;

      gl.deleteProgram(lastProgram);
      lastProgram = program;
      gl.useProgram(program);

      let posAttrLocation = gl.getAttribLocation(program, "_pos");
      gl.enableVertexAttribArray(posAttrLocation);

      let buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([1, 1, -1, 1, 1, -1, -1, 1, 1, -1, -1, -1]),
        gl.STATIC_DRAW
      );
      gl.vertexAttribPointer(posAttrLocation, 2, gl.FLOAT, false, 0, 0);

      return program;
    }

    function render() {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    let prog = updateWebGL(shader);
    if (prog)
      emit("ready", {
        gl,
        canvas,
        render,
        program: prog,
      });
  }
</script>

<template>
  <FullscreenCanvas class="canvas" :breakpoint="breakpoint" @ready="onReady">
    <template #nav>
      <slot name="nav" />
    </template>
  </FullscreenCanvas>
</template>

<style scoped>
  .canvas {
    touch-action: none;
    user-zoom: none;
  }
</style>
