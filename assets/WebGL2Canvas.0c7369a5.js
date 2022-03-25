import{_ as h}from"./FullscreenCanvas.2471bf42.js";import{_ as A}from"./index.598c1185.js";import{d as v,o as S,c as b,w as g,r as P}from"./vendor.c311a53b.js";function d(e,o,n){let t=e.createShader(e[`${o}_SHADER`]);return t?(e.shaderSource(t,n.trim()),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.log(e.getShaderInfoLog(t)),e.deleteShader(t),null)):null}function R(e,o,n){let t=e.createProgram();if(!t)return null;let s=d(e,"VERTEX",o);if(!s)return null;let a=d(e,"FRAGMENT",n);return a?(e.attachShader(t,s),e.attachShader(t,a),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)?t:(console.log(e.getProgramInfoLog(t)),e.deleteProgram(t),null)):null}const L=v({props:{shader:null,breakpoint:null},emits:["ready"],setup(e,{emit:o}){const{shader:n}=e;let t=`
  #version 300 es

  precision highp float;
  in vec2 _pos;
  out vec2 pos;

  void main() {
    gl_Position = vec4(pos = _pos * vec2(1, -1), 0, 1);
  }
  `.trim();function s(a){let r=a.getContext("webgl2");if(!r)return;let l=null;function f(p){let i=R(r,t,p);if(!i)return null;r.deleteProgram(l),l=i,r.useProgram(i);let c=r.getAttribLocation(i,"_pos");r.enableVertexAttribArray(c);let m=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,m),r.bufferData(r.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,-1,1,1,-1,-1,-1]),r.STATIC_DRAW),r.vertexAttribPointer(c,2,r.FLOAT,!1,0,0),i}function _(){r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.viewport(0,0,a.width,a.height),r.drawArrays(r.TRIANGLES,0,6)}let u=f(n);u&&o("ready",{gl:r,canvas:a,render:_,program:u})}return(a,r)=>(S(),b(h,{class:"canvas",breakpoint:e.breakpoint,onReady:s},{nav:g(()=>[P(a.$slots,"nav",{},void 0,!0)]),_:3},8,["breakpoint"]))}});var F=A(L,[["__scopeId","data-v-75a65cd9"]]);export{F as W,R as c};
