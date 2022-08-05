import{d as m,s as p,o as _,c as b,w as r,j as s,N as x,b as c,v as i}from"./index.01c47f05.js";import{W as y}from"./WebGL2Canvas.ae0281e7.js";import"./FullscreenCanvas.b708dfbf.js";import"./FullscreenDisplay.3d631d23.js";const w=c("More Rainbow"),R=c("More Random"),I=m({__name:"RainbowNoiseView",setup(k){let e=+p().params.chance;(e<0||e>100)&&(e=50),e=Math.floor(e);let n;function u({gl:o,program:t,render:d}){let v=o.getUniformLocation(t,"seed"),l=o.getUniformLocation(t,"chance");n=()=>{o.uniform1f(v,Math.random()),o.uniform1f(l,e/100),d()},n()}function a(){n==null||n()}function h(){e<=0||(e<=10||e>90?e-=1:e-=5,i.replace(`/rainbow-noise/${e}`),a())}function f(){e>=100||(e<10||e>=90?e+=1:e+=5,i.replace(`/rainbow-noise/${e}`),a())}return(o,t)=>(_(),b(y,{shader:`
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
  `,onReady:u,onResize:a},{nav:r(()=>[s(x,{onClick:h},{default:r(()=>[w]),_:1}),s(x,{onClick:f},{default:r(()=>[R]),_:1})]),_:1},8,["shader"]))}});export{I as default};
