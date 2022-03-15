<script setup lang="ts">
  import WebGL2Canvas, {
    type WebGL2ProgramInfo,
  } from "@/components/WebGL2Canvas.vue";

  let metaballs = Array.from({ length: 10 }, () => {
    let x = Math.random();
    let y = Math.random();
    // let dx = Math.random() * 0.1 - 0.05;
    // let dy = Math.sqrt(0.001 - dx * dx);
    return { x, y };
  });

  function onReady({ canvas, gl, program, render }: WebGL2ProgramInfo) {
    let metaballLoc = gl.getUniformLocation(program, "metaballs");
    let windowLoc = gl.getUniformLocation(program, "window_size");

    function nextFrame() {
      // metaballs.map((mb) => {
      //   mb.x += mb.dx;
      //   if (mb.x < -bound) {
      //     mb.x = bound2 - mb.x;
      //   } else if (mb.x > bound) {
      //     mb.x = mb.x - bound2;
      //   }
      //   mb.y += mb.dy;
      //   if (mb.y < -bound) {
      //     mb.y = bound2 - mb.y;
      //   } else if (mb.y > bound) {
      //     mb.y = mb.y - bound2;
      //   }
      // });

      let data = new Float32Array(metaballs.length * 2);
      for (let i = 0; i < metaballs.length; i++) {
        data[i * 2] = metaballs[i].x;
        data[i * 2 + 1] = metaballs[i].y;
      }

      gl.uniform2fv(metaballLoc, data);
      gl.uniform2fv(windowLoc, [canvas.width, canvas.height]);

      render();
    }

    nextFrame();
    setInterval(nextFrame, 1000 / 60);
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
    uniform vec2 metaballs[${metaballs.length}];

    // float sqr(float x) {
    //   return x * x;
    // }

    // float metaball(vec2 a, vec2 b) {
    //   return 1.0 / sqrt(sqr(a.x - b.x) + sqr(a.y - b.y));
    // }

    void main() {
      vec2 c = pos * window_size;
      float dist;

      for (int i = 0; i < ${metaballs.length}; i++) {
        vec2 mb = metaballs[i];
        
        float dx = abs((mb.x * window_size.x) - pos.x);
        dx = min(dx, window_size.x - dx);
        
        float dy = abs((mb.y * window_size.y) - pos.y);
        dy = min(dy, window_size.y - dy);
        
        dist += 1.0 / (dx * dx + dy * dy);
      }

      if (dist >= 1.0) color = vec4(1, 1, 1, 1);
      else color = vec4(0, 0, 0, 1);
    }
    `"
  />
</template>
