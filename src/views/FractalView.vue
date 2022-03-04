<script setup lang="ts">
  import CoordinateCanvas, {
    type CoordinateCanvasInfo,
  } from "@/components/CoordinateCanvas.vue";
  import { useRoute } from "vue-router";

  function onReady({ program, gl, loadSaveCode }: CoordinateCanvasInfo) {
    let maxIterLoc = gl.getUniformLocation(program, "maxIterations");
    let colorModeLoc = gl.getUniformLocation(program, "colorMode");
    gl.uniform1i(colorModeLoc, 1);
    gl.uniform1i(maxIterLoc, 50);

    loadSaveCode("" + useRoute().params.coords);
  }
</script>

<template>
  <CoordinateCanvas
    show-reset-button
    shader="
    #define ieq sqr(z) + c

    precision highp float;
    in vec2 pos;
    out vec4 color;
    uniform int maxIterations;
    uniform int colorMode;

    vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);

      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
    }

    vec3 palette(float t) {
      float hue = mod(2.0 * t, 1.0);
      return hsl2rgb(vec3(1.0 - hue, 1.0, 0.5));
    }

    vec2 cube(vec2 a) {
      float x2 = a.x * a.x;
      float y2 = a.y * a.y;
      float d = x2 - y2;
      return vec2(a.x * (d - y2 - y2), a.y * (x2 + x2 + d));
    }

    vec2 sqr(vec2 a) {
      return vec2(a.x * a.x - a.y * a.y, 2.0 * a.x * a.y);
    }

    vec2 mult(vec2 a, vec2 b) {
      float x = a.x * b.x - a.y * b.y;
      float y = a.x * b.y + a.y * b.x;
      return vec2(x, y);
    }

    vec2 div(vec2 a, vec2 b) {
      float denom = 1.0 / (b.x * b.x + b.y * b.y);
      return vec2(a.x * b.x + a.y * b.y, a.y * b.x - a.x * b.y) * denom;
    }

    vec2 power(vec2 a, vec2 b) {
      int count = int(b.x);
      if(count <= 1)
        return a;

      vec2 result = a;
      for(int i = 1; i < count; i++) {
        result = mult(result, a);
      }

      return result;
    }

    vec4 iterate(vec2 c) {
      vec2 z, pz, ppz;
      vec3 sz;

      if(colorMode == 7 || colorMode == 8) {
        z = c;
        for(int i = 0; i < maxIterations; i++) {
          ppz = pz;
          pz = z;
          z = ieq;
        }

        if(colorMode == 8 && z.y <= 0.0)
          return vec4(sz, (atan(z.y, z.x) / 3.14159265) + 0.25);
        else
          return vec4(sz, atan(z.y, z.x) / 3.14159265);
      }

      int iterations = 0;
      for(int i = 0; i < maxIterations; i++) {
        ppz = pz;
        pz = z;
        z = ieq;
        iterations++;
        if(length(z) > 2.0)
          break;

        sz.x += dot(z - pz, pz - ppz);
        sz.y += dot(z - pz, z - pz);
        sz.z += dot(z - ppz, z - ppz);

        if(colorMode == 2 || colorMode == 5) {
          sz -= sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 3 || colorMode == 6) {
          sz += sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 4) {
          sz += z.yxx;
        }
      }

      return vec4(sz, iterations);
    }

    void main() {
      vec2 c = convert(pos);
      vec4 res = iterate(c);

      vec3 sz = res.xyz;
      float iterations = res.w;

      float frac = float(iterations) / float(maxIterations);
      if(colorMode == 7 || colorMode == 8) {
        color = vec4(hsl2rgb(vec3(iterations, 1, 0.5)), 1);
      } else if(frac < 1.0 && (colorMode == 0)) {
        color = vec4(palette(frac), 1);
      } else if(colorMode == 0) {
        color = vec4(0, 0, 0, 1);
      } else if(colorMode == 5 || colorMode == 6) {
        color = vec4(palette(atan(sz.x, sz.y) / 3.14159265359), 1);
      } else {
        sz = abs(sz) / float(iterations);
        vec3 n1 = sin(abs(sz * 5.0)) * 0.45 + 0.5;
        color = vec4(n1, 1);
      }
    }
    "
    @ready="onReady"
  />
</template>
