<script setup lang="ts">
  import { getCookie, setCookie } from "@/assets/cookie";
  import { rpnToGLSL, toReversePolish } from "@/assets/glsl-math";
  import { alert } from "@/assets/modal";
  import CoordinateCanvas, {
    type CoordinateCanvasInfo,
  } from "@/components/CoordinateCanvas.vue";
  import NavLink from "@/components/NavLink.vue";
  import { router } from "@/main";
  import { onMounted, onUnmounted, ref } from "vue";
  import { useRoute } from "vue-router";

  let { params } = useRoute();
  let { equation, coords } = params;
  let iterEQ = ref("sqr(z) + c");
  try {
    iterEQ.value = rpnToGLSL(toReversePolish("" + equation));
  } catch {
    equation = "z^2+c";
  }

  let limit = +params.limit || 2;
  if (!isFinite(limit) || limit < 0) limit = 2;

  let iterations = +params.iterations || 50;
  if (!isFinite(iterations) || iterations < 5) iterations = 50;
  iterations = Math.floor(iterations);

  let theme = +params.theme;
  if (!isFinite(theme) || theme < 0 || theme >= 14) theme = 0;
  theme = Math.floor(theme) % 14;

  let _changeTheme: (() => void) | undefined;
  let _changeEquation: (() => void) | undefined;
  let _increaseDetail: (() => void) | undefined;
  let _decreaseDetail: (() => void) | undefined;

  let interval: number | undefined;

  function onReady({
    program,
    gl,
    getCode,
    loadCode,
    render,
  }: CoordinateCanvasInfo) {
    let maxIterLoc = gl.getUniformLocation(program, "maxIterations");
    let colorModeLoc = gl.getUniformLocation(program, "colorMode");
    let limitLoc = gl.getUniformLocation(program, "limit");
    gl.uniform1i(colorModeLoc, theme);
    gl.uniform1i(maxIterLoc, iterations);
    gl.uniform1f(limitLoc, limit);

    function makeRouterURL() {
      return `/fractal/${encodeURIComponent(
        "" + equation
      )}/${limit}/${theme}/${iterations}/${getCode()}`;
    }

    let lastSaveTime = Date.now();
    let lastCoordCode = getCode();

    loadCode("" + coords);

    _changeTheme = () => {
      theme = (theme + 1) % 14;

      gl.uniform1i(colorModeLoc, theme);
      render();

      router.replace(makeRouterURL());
    };

    _changeEquation = () => {
      try {
        let baseEQ = prompt("Enter an equation to be drawn.", "" + equation);
        if (!baseEQ) return;

        iterEQ.value = rpnToGLSL(toReversePolish(baseEQ));
        equation = baseEQ;
      } catch {
        console.log("fail");
        iterEQ.value = "sqr(z) + c";
        equation = "z^2+c";
      }

      router.replace(makeRouterURL());
      setTimeout(() => router.go(0));
    };

    _increaseDetail = () => {
      if (iterations == 25) iterations = 50;
      else if (iterations < 50) iterations += 5;
      else iterations += 50;

      gl.uniform1i(maxIterLoc, iterations);
      render();

      router.replace(makeRouterURL());
    };

    _decreaseDetail = () => {
      if (iterations == 50) iterations = 25;
      else if (iterations < 10) iterations = 5;
      else if (iterations < 50) iterations -= 5;
      else iterations -= 50;

      gl.uniform1i(maxIterLoc, iterations);
      render();

      router.replace(makeRouterURL());
    };

    interval = setInterval(() => {
      let now = Date.now();
      if (now - lastSaveTime > 1000 && getCode() != lastCoordCode) {
        lastSaveTime = now;
        lastCoordCode = getCode();
        router.replace(makeRouterURL());
      }
    }, 1000);
  }

  function changeTheme() {
    if (_changeTheme) _changeTheme();
  }

  function changeEquation() {
    if (_changeEquation) _changeEquation();
  }

  function increaseDetail() {
    if (_increaseDetail) _increaseDetail();
  }

  function decreaseDetail() {
    if (_decreaseDetail) _decreaseDetail();
  }

  function makeShader() {
    return `
    #define ieq ${iterEQ.value}

    precision highp float;
    in vec2 pos;
    out vec4 color;
    uniform int maxIterations;
    uniform int colorMode;
    uniform float limit;
    float pi = 3.1415926535;

    vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);

      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
    }

    vec3 palette(float t) {
      float hue = mod(2.0 * t, 1.0);
      return hsl2rgb(vec3(1.0 - hue, 1.0, 0.5));
    }

    vec3 newtonPalette(float t) {
      float hue = t / pi;
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

    vec2 rawsqr(vec2 a) {
      return a * a;
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
      vec2 z, pz, ppz, nz;
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
        if(length(z) > limit)
          break;

        sz.x += dot(z - pz, pz - ppz);
        sz.y += dot(z - pz, z - pz);
        sz.z += dot(z - ppz, z - ppz);

        if (colorMode == 13) {
          if(pos.x >= 0.0 && pos.y < 0.0) {
            sz -= sign(vec3(float(z), float(pz), float(ppz)));
          } else if(pos.x < 0.0 && pos.y >= 0.0) {
            sz += sign(vec3(float(z), float(pz), float(ppz)));
          } else if(pos.x < 0.0 && pos.y < 0.0) {
            sz += z.yxx;
          }
        } else if(colorMode == 2 || colorMode == 5) {
          sz -= sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 3 || colorMode == 6) {
          sz += sign(vec3(float(z), float(pz), float(ppz)));
        } else if(colorMode == 4) {
          sz += z.yxx;
        }
      }

      return vec4(sz, iterations);
    }

    vec2 runNewton2(vec2 c) {
      vec2 z = vec2(0, 0);
      vec2 sz = vec2(0, 0);
      for(int i = 0; i < maxIterations; i++) {
        z = ieq;
        if(colorMode == 9)
          sz = sin(mult(z, sz)) + cos(sz) + cos(z);
        else if(colorMode == 10)
          sz = sin(sz + z) + cos(sz) + z;
        else if(colorMode == 11)
          sz = cos(mult(sz, z)) + cos(sz) + z;
        else if(colorMode == 12)
          sz = sin(mult(sz, z)) + cos(z);
      }

      return sz;
    }

    void main() {
      vec2 c = convert(pos);

      if (colorMode >= 9 && colorMode <= 12) {
        vec2 sz = runNewton2(c);
        color = vec4(newtonPalette(atan(sz.y / sz.x)), 1);
        return;
      }

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
    `;
  }

  let glShader = ref(makeShader());

  onMounted(() => {
    if (getCookie("hasVisitedFractalView") != "1")
      alert(
        "When using a touchscreen, drag your finger to move the image and use two finger pinching to zoom in and out. When using a desktop, click and drag to move the image and scroll on the image to zoom in and out. You may also pinch to zoom on a trackpad."
      ).then(() => setCookie("hasVisitedFractalView", "1"));
  });

  onUnmounted(() => clearInterval(interval));
</script>

<template>
  <CoordinateCanvas
    show-reset-button
    :breakpoint="650"
    :shader="glShader"
    @ready="onReady"
  >
    <template #nav>
      <NavLink
        title="Lowers the amount of detail in the fractal but improves performance."
        @click="decreaseDetail"
        >Less Detail</NavLink
      >

      <NavLink
        title="Increases the amount of detail in the fractal but degrades performance."
        @click="increaseDetail"
        >More Detail</NavLink
      >

      <NavLink
        title="Changes the equation used to draw the fractal."
        @click="changeEquation"
        >Equation</NavLink
      >

      <NavLink
        title="Changes the theme between standard mode, four rainbow mode, two exterior hue modes, and two interior hue modes."
        @click="changeTheme"
        >Theme</NavLink
      >
    </template>
  </CoordinateCanvas>
</template>
