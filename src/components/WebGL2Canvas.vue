<script lang="ts">
  function createShader(
    gl: WebGL2RenderingContext,
    type: "VERTEX" | "FRAGMENT",
    source: string
  ) {
    let shader = gl.createShader(gl[`${type}_SHADER`]);
    if (!shader) return null;
    gl.shaderSource(shader, source);
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
  in vec2 pos;
  out vec2 _pos;

  void main() {
    gl_Position = vec4(_pos = pos, 0, 1);
  }
  `.trim();
</script>

<script setup lang="ts">
  import { ref, watchEffect, type Ref } from "vue";
  import FSCanvas from "./FSCanvas.vue";

  let emit = defineEmits<{
    (
      event: "ready",
      info: {
        getLocation: typeof getLocation;
        setUniform: typeof setUniform;
        render(): void;
        gl: WebGL2RenderingContext;
      }
    ): void;
  }>();

  let shader = ref(defineProps<{ shader: string | Ref<string> }>().shader);
  let webgl: WebGL2RenderingContext | null = null;

  type Slice<T extends string, U extends string> = T extends `${U}${infer K}`
    ? K
    : never;
  type UniformTypes = Exclude<
    Slice<keyof WebGL2RenderingContext, "uniform">,
    "BlockBinding"
  >;

  function getLocation(name: string) {
    return webgl?.getUniformLocation(webgl, name) || null;
  }

  function setUniform<T extends UniformTypes>(
    type: T,
    ...args: Parameters<WebGL2RenderingContext[`uniform${T}`]>
  ) {
    if (!webgl) return;
    (webgl[`uniform${type}`] as any)(...args);
  }

  function onReady(canvas: HTMLCanvasElement) {
    let gl = canvas.getContext("webgl2")!;
    if (!gl) return;
    webgl = gl;
    let lastProgram: WebGLProgram | null = null;

    watchEffect(() => {
      let vert = createShader(gl, "VERTEX", vertShader);
      if (!vert) return;
      let frag = createShader(gl, "FRAGMENT", shader.value);
      if (!frag) return;
      let program = createProgram(gl, vert, frag);
      if (!program) return;

      gl.deleteProgram(lastProgram);
      lastProgram = program;
      gl.useProgram(program);
    });

    emit("ready", {
      gl,
      setUniform,
      getLocation,
      render() {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 2);
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
