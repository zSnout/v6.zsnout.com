import{_ as g}from"./FullscreenCanvas.856bc7b5.js";import{_ as S}from"./index.d668bf32.js";import{d as b,o as P,c as R,w as L,r as T}from"./vendor.c311a53b.js";const C=b({props:{shader:null,breakpoint:null},emits:["ready"],setup(n,{emit:d}){const{shader:f}=n;function i(r,e,t){let a=r.createShader(r[`${e}_SHADER`]);return a?(r.shaderSource(a,t.trim()),r.compileShader(a),r.getShaderParameter(a,r.COMPILE_STATUS)?a:(console.log(r.getShaderInfoLog(a)),r.deleteShader(a),null)):null}function _(r,...e){let t=r.createProgram();if(!t)return null;for(let a of e)r.attachShader(t,a);return r.linkProgram(t),r.getProgramParameter(t,r.LINK_STATUS)?t:(console.log(r.getProgramInfoLog(t)),r.deleteProgram(t),null)}let p=`
  #version 300 es

  precision highp float;
  in vec2 _pos;
  out vec2 pos;

  void main() {
    gl_Position = vec4(pos = _pos * vec2(1, -1), 0, 1);
  }
  `.trim();function m(r){let e=r.getContext("webgl2");if(!e)return;let t=null;function a(A){let s=i(e,"VERTEX",p);if(!s)return null;let u=i(e,"FRAGMENT",A);if(!u)return null;let o=_(e,s,u);if(!o)return null;e.deleteProgram(t),t=o,e.useProgram(o);let c=e.getAttribLocation(o,"_pos");e.enableVertexAttribArray(c);let v=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,v),e.bufferData(e.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,-1,1,1,-1,-1,-1]),e.STATIC_DRAW),e.vertexAttribPointer(c,2,e.FLOAT,!1,0,0),o}function h(){e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.viewport(0,0,r.width,r.height),e.drawArrays(e.TRIANGLES,0,6)}let l=a(f);l&&d("ready",{gl:e,canvas:r,render:h,program:l})}return(r,e)=>(P(),R(g,{class:"canvas",breakpoint:n.breakpoint,onReady:m},{nav:L(()=>[T(r.$slots,"nav",{},void 0,!0)]),_:3},8,["breakpoint"]))}});var B=S(C,[["__scopeId","data-v-3b778dd7"]]);export{B as W};
