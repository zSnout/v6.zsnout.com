import{d as m,s as p,o as b,c as y,w as r,j as x,b as s,N as i,v as c}from"./index.6ca718b5.js";import{W as _}from"./WebGL2Canvas.aa5f6f22.js";import"./FullscreenCanvas.80f6c1f8.js";import"./FullscreenDisplay.4d86b959.js";const B=m({__name:"RainbowNoiseView",setup(w){let e=+p().params.chance;(e<0||e>100)&&(e=50),e=Math.floor(e);let n;function u({gl:a,program:t,render:d}){let v=a.getUniformLocation(t,"seed"),l=a.getUniformLocation(t,"chance");n=()=>{a.uniform1f(v,Math.random()),a.uniform1f(l,e/100),d()},n()}function o(){n==null||n()}function f(){e<=0||(e<=10||e>90?e-=1:e-=5,c.replace(`/rainbow-noise/${e}`),o())}function h(){e>=100||(e<10||e>=90?e+=1:e+=5,c.replace(`/rainbow-noise/${e}`),o())}return(a,t)=>(b(),y(_,{shader:`
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
  `,onReady:u,onResize:o},{nav:r(()=>[x(i,{onClick:f},{default:r(()=>[s("More Rainbow")]),_:1}),x(i,{onClick:h},{default:r(()=>[s("More Random")]),_:1})]),_:1},8,["shader"]))}});export{B as default};
