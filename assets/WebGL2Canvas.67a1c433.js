import{_ as v}from"./FullscreenCanvas.ab3e6838.js";import{_ as b,d as A,o as S,e as g,w as P,g as R}from"./index.075875a4.js";function d(e,o,n){let t=e.createShader(e[`${o}_SHADER`]);return t?(e.shaderSource(t,n.trim()),e.compileShader(t),e.getShaderParameter(t,e.COMPILE_STATUS)?t:(console.log(e.getShaderInfoLog(t)),e.deleteShader(t),null)):null}function L(e,o,n){let t=e.createProgram();if(!t)return null;let s=d(e,"VERTEX",o);if(!s)return null;let u=d(e,"FRAGMENT",n);return u?(e.attachShader(t,s),e.attachShader(t,u),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)?t:(console.log(e.getProgramInfoLog(t)),e.deleteProgram(t),null)):null}const B=A({__name:"WebGL2Canvas",props:{shader:null,breakpoint:null,preserveDrawingBuffer:{type:Boolean}},emits:["ready"],setup(e,{emit:o}){const{shader:n,preserveDrawingBuffer:t}=e;let s=`
  #version 300 es

  precision highp float;
  in vec2 _pos;
  out vec2 pos;

  void main() {
    gl_Position = vec4(pos = _pos * vec2(1, -1), 0, 1);
  }
  `.trim();function u(a){let r=a.getContext("webgl2",{preserveDrawingBuffer:t});if(!r)return;let l=null;function _(m){let i=L(r,s,m);if(!i)return null;r.deleteProgram(l),l=i,r.useProgram(i);let f=r.getAttribLocation(i,"_pos");r.enableVertexAttribArray(f);let h=r.createBuffer();return r.bindBuffer(r.ARRAY_BUFFER,h),r.bufferData(r.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,-1,1,1,-1,-1,-1]),r.STATIC_DRAW),r.vertexAttribPointer(f,2,r.FLOAT,!1,0,0),i}function p(){r.clearColor(0,0,0,0),r.clear(r.COLOR_BUFFER_BIT),r.viewport(0,0,a.width,a.height),r.drawArrays(r.TRIANGLES,0,6)}let c=_(n);c&&o("ready",{gl:r,canvas:a,render:p,program:c})}return(a,r)=>(S(),g(v,{class:"canvas",breakpoint:e.breakpoint,onReady:u},{nav:P(()=>[R(a.$slots,"nav",{},void 0,!0)]),_:3},8,["breakpoint"]))}});var w=b(B,[["__scopeId","data-v-1b5dcbfe"]]);export{w as W,L as c};
