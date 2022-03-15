<!--
  Thanks to metaballs-js (https://www.npmjs.com/package/metaballs-js) for the original implementation.
  Thanks to Jamie Wong (http://jamie-wong.com/2016/07/06/metaballs-and-webgl/) for providing a tutorial.
  Test implementation created using Desmos (https://www.desmos.com/calculator/u3wzt8v1ih).
-->

<script setup lang="ts">
  import WebGL2Canvas, {
    type WebGL2ProgramInfo,
  } from "@/components/WebGL2Canvas.vue";

  let metaballs = Array.from({ length: 50 }, () => {
    let x = Math.random();
    let y = Math.random();
    let r = Math.random() * 5 + 5;
    let dx = ((Math.random() - 0.5) * 2) / 200;
    let dy = ((Math.random() - 0.5) * 2) / 200;

    return { x, y, r, dx, dy };
  });

  function onReady({ canvas, gl, program, render }: WebGL2ProgramInfo) {
    let metaballLoc = gl.getUniformLocation(program, "metaballs");
    let windowLoc = gl.getUniformLocation(program, "window_size");

    function nextFrame() {
      metaballs.map((mb) => {
        mb.x += mb.dx;
        if (mb.x < 0) mb.x = 1 - mb.x;
        else if (mb.x > 1) mb.x = mb.x - 1;

        mb.y += mb.dy;
        if (mb.y < 0) mb.y = 1 - mb.y;
        else if (mb.y > 1) mb.y = mb.y - 1;
      });

      let data = new Float32Array(metaballs.length * 3);
      for (let i = 0; i < metaballs.length; i++) {
        let { x, y, r } = metaballs[i];

        data[i * 2] = x;
        data[i * 2 + 1] = y;
        data[i * 2 + 2] = r;
      }

      gl.uniform3fv(metaballLoc, data);

      if (canvas.height > canvas.width)
        gl.uniform2fv(windowLoc, [1, canvas.height / canvas.width]);
      else gl.uniform2fv(windowLoc, [canvas.width / canvas.height, 1]);

      render();
      requestAnimationFrame(nextFrame);
    }

    nextFrame();
  }
</script>

<template>
  <WebGL2Canvas
    @ready="onReady"
    :shader="`
    #version 300 es
    precision highp float;

    in vec2 pos;
    out vec4 color;

    uniform vec2 window_size;
    uniform vec3 metaballs[${metaballs.length}];

    void main() {
      vec2 _pos = pos * window_size / 2.0;
      float dist;

      for (int i = 0; i < ${metaballs.length}; i++) {
        vec3 mb = metaballs[i];

        float dx = mb.x - _pos.x;
        dx = min(dx, 1.0 - dx);

        float dy = mb.y - _pos.y;
        dy = min(dy, 1.0 - dy);

        dist += 1.0 / (dx * dx + dy * dy);
      }

      if (dist > 1000.0) color = vec4(1, 1, 1, 1);
      else color = vec4(0, 0, 0, 1);
    }
    `"
  />
</template>
