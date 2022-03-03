<script lang="ts">
  function createShader(
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

  function createProgram(
    gl: WebGL2RenderingContext,
    ...shaders: WebGLShader[]
  ) {
    let program = gl.createProgram();
    if (!program) return null;
    for (let shader of shaders) gl.attachShader(program, shader);
    gl.linkProgram(program);

    if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  let vertShader = `
  #version 300 es

  precision highp float;
  in vec2 _pos;
  out vec2 pos;

  void main() {
    gl_Position = vec4(pos = _pos * vec2(1, -1), 0, 1);
  }
  `.trim();
</script>

<script setup lang="ts">
  import { ref, watch, type Ref } from "vue";
  import FSCanvas from "./FSCanvas.vue";

  let emit = defineEmits<{
    (
      event: "ready",
      info: {
        gl: WebGL2RenderingContext;
        program: WebGLProgram;
        render(): void;
      }
    ): void;
  }>();

  let { shader } = defineProps<{ shader: string | Ref<string> }>();
  let shaderRef = ref(shader);

  function onReady(canvas: HTMLCanvasElement) {
    let gl = canvas.getContext("webgl2")!;
    if (!gl) return;
    let lastProgram: WebGLProgram | null = null;

    function onShaderRefChange(value = shaderRef.value) {
      let vert = createShader(gl, "VERTEX", vertShader);
      if (!vert) return null;
      let frag = createShader(gl, "FRAGMENT", value);
      if (!frag) return null;
      let program = createProgram(gl, vert, frag);
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

    watch(shaderRef, onShaderRefChange);

    let prog = onShaderRefChange();
    if (prog)
      emit("ready", {
        gl,
        program: prog,
        render() {
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        },
      });
  }
</script>

<template>
  <FSCanvas @ready="onReady">
    <template #nav>
      <slot name="nav" />
    </template>
  </FSCanvas>
</template>
