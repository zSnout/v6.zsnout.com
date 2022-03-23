<!-- Some code was borrowed from https://observablehq.com/@stwind/webgl2-prng-in-glsl and https://www.shadertoy.com/view/XljGzV.-->

<script lang="ts" setup>
  import NavLink from "@/components/NavLink.vue";
  import WebGL2Canvas, {
    type WebGL2ProgramInfo,
  } from "@/components/WebGL2Canvas.vue";
  import { router } from "@/main";
  import { useRoute } from "vue-router";

  let noiseChance = +useRoute().params.chance;
  if (noiseChance < 0 || noiseChance > 100) noiseChance = 50;
  noiseChance = Math.floor(noiseChance);

  let _render: (() => void) | undefined;

  function onReady({ gl, program, render }: WebGL2ProgramInfo) {
    let seedLoc = gl.getUniformLocation(program, "seed");
    let chanceLoc = gl.getUniformLocation(program, "chance");

    _render = () => {
      gl.uniform1f(seedLoc, Math.random());
      gl.uniform1f(chanceLoc, noiseChance / 100);

      render();
    };

    _render();
  }

  function render() {
    _render?.();
  }

  function moreRainbow() {
    if (noiseChance <= 0) return;
    if (noiseChance <= 10 || noiseChance > 90) noiseChance -= 1;
    else noiseChance -= 5;

    router.replace(`/rainbow-noise/${noiseChance}`);
    render();
  }

  function moreRandom() {
    if (noiseChance >= 100) return;
    if (noiseChance < 10 || noiseChance >= 90) noiseChance += 1;
    else noiseChance += 5;

    router.replace(`/rainbow-noise/${noiseChance}`);
    render();
  }
</script>

<template>
  <WebGL2Canvas
    :shader="`
  #version 300 es
  precision highp float;

  uniform float seed;
  uniform float chance;
  in vec2 pos;
  out vec4 color;

  uint hash( uint x ) {
    x += ( x << 10u );
    x ^= ( x >>  6u );
    x += ( x <<  3u );
    x ^= ( x >> 11u );
    x += ( x << 15u );
    return x;
  }

  uint hash( uvec2 v ) {
    return hash( v.x ^ hash(v.y) );
  }

  uint hash( uvec3 v ) {
    return hash( v.x ^ hash(v.y) ^ hash(v.z) );
  }

  uint hashInt( uint x )
  {
    x += x >> 11;
    x ^= x << 7;
    x += x >> 15;
    x ^= x << 5;
    x += x >> 12;
    x ^= x << 9;
    return x;
  }

  uint hashInt( uvec2 v )
  {
    uint x = v.x, y = v.y;
    x += x >> 11;
    x ^= x << 7;
    x += y;
    x ^= x << 6;
    x += x >> 15;
    x ^= x << 5;
    x += x >> 12;
    x ^= x << 9;
    return x;
  }

  uint hashInt( uvec3 v )
  {
    uint x = v.x, y = v.y, z = v.z;
    x += x >> 11;
    x ^= x << 7;
    x += y;
    x ^= x << 3;
    x += z ^ ( x >> 14 );
    x ^= x << 6;
    x += x >> 15;
    x ^= x << 5;
    x += x >> 12;
    x ^= x << 9;
    return x;
  }

  float rand(uint h) {
    const uint mantissaMask = 0x007FFFFFu;
    const uint one = 0x3F800000u;

    h &= mantissaMask;
    h |= one;

    float  r2 = uintBitsToFloat( h );
    return r2 - 1.0;
  }

  float random( float f ) {
    return rand(hashInt(floatBitsToUint(f)));
  }

  float random( vec2 f ) {
    return rand(hashInt(floatBitsToUint(f)));
  }

  float random( vec3 f ) {
    return rand(hashInt(floatBitsToUint(f)));
  }

  vec3 hsl2rgb( vec3 c )
  {
      vec3 rgb = clamp( abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0 );

      return c.z + c.y * (rgb-0.5)*(1.0-abs(2.0*c.z-1.0));
  }

  void main() {
    if (random(vec3(pos, seed)) > chance) {
      float dec = (pos.x + pos.y) / 4.0 + 0.5;
      color = vec4(hsl2rgb(vec3(dec, 1.0, 0.5)), 1.0);
      return;
    }

    float rand1 = random(vec3(pos, seed + 1.0));
    float rand2 = random(vec3(pos, seed + 2.0));
    float rand3 = random(vec3(pos, seed + 3.0));
    color = vec4(vec3(rand1, rand2, rand3), 1);
  }
  `"
    @ready="onReady"
    @resize="render"
  >
    <template #nav>
      <NavLink @click="moreRainbow">More Rainbow</NavLink>
      <NavLink @click="moreRandom">More Random</NavLink>
    </template>
  </WebGL2Canvas>
</template>
