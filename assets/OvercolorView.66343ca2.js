import{d as E,y as h,o as R,e as p,z as U}from"./index.eea03a12.js";import{_ as D}from"./FullscreenCanvas.866eaa56.js";import{c as M}from"./WebGL2Canvas.57a686a8.js";import"./FullscreenDisplay.c319c18a.js";const L=E({__name:"OvercolorView",setup(B){let c;async function s(t){let e=t.getContext("webgl2");if(!e)return;let i=M(e,u,v);if(!i)return;e.useProgram(i);function g(o){e.viewport(0,0,t.width,t.height);let r=e.getAttribLocation(i,"a_position"),m=e.getAttribLocation(i,"a_texCoord"),x=e.getUniformLocation(i,"u_resolution"),T=e.getUniformLocation(i,"u_image"),f=e.createVertexArray();e.bindVertexArray(f);let _=e.createBuffer();e.enableVertexAttribArray(r),e.bindBuffer(e.ARRAY_BUFFER,_),e.vertexAttribPointer(r,2,e.FLOAT,!1,0,0);let A=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,A),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(m),e.vertexAttribPointer(m,2,e.FLOAT,!1,0,0);let b=e.createTexture();e.activeTexture(e.TEXTURE0+0),e.bindTexture(e.TEXTURE_2D,b),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,o),e.bindVertexArray(f),e.uniform2f(x,t.width,t.height),e.uniform1i(T,0),e.bindBuffer(e.ARRAY_BUFFER,_);let n=o.videoWidth,l=o.videoHeight;e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,n,0,0,l,0,l,n,0,n,l]),e.STATIC_DRAW),e.drawArrays(e.TRIANGLES,0,6),requestAnimationFrame(()=>g(o))}try{let o=await navigator.mediaDevices.getUserMedia({video:{aspectRatio:{ideal:t.width/t.height}}}),r=document.createElement("video");r.srcObject=o,c=o,console.log("before"),await r.play(),console.log("after"),a=()=>{t.width=r.videoWidth,t.height=r.videoHeight},a(),g(r)}catch{U("Oops, we weren't able to get camera permissions. Try again later.")}}h(()=>{c==null||c.getTracks().map(t=>{t.readyState=="live"&&t.stop()})});let u=`
  #version 300 es

  precision highp float;

  in vec2 _pos;
  in vec2 a_position;
  in vec2 a_texCoord;
  out vec2 v_texCoord;

  uniform vec2 u_resolution;

  void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 clipSpace = zeroToOne * 2.0 - 1.0;
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    v_texCoord = a_texCoord;
  }
  `,v=`
  #version 300 es

  precision highp float;
  uniform sampler2D u_image;

  in vec2 v_texCoord;
  out vec4 outColor;

  vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);

    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  vec3 rgb2hsl(vec3 c) {
    float h = 0.0;
    float s = 0.0;
    float l = 0.0;
    float r = c.r;
    float g = c.g;
    float b = c.b;
    float cMin = min(r, min(g, b));
    float cMax = max(r, max(g, b));

    l = (cMax + cMin) / 2.0;
    if(cMax > cMin) {
      float cDelta = cMax - cMin;
      s = l < 0.0 ? cDelta / (cMax + cMin) : cDelta / (2.0 - (cMax + cMin));

      if(r == cMax) {
        h = (g - b) / cDelta;
      } else if(g == cMax) {
        h = 2.0 + (b - r) / cDelta;
      } else {
        h = 4.0 + (r - g) / cDelta;
      }

      if(h < 0.0) {
        h += 6.0;
      }
      h = h / 6.0;
    }
    return vec3(h, s, l);
  }

  void main() {
    vec4 image = texture(u_image, v_texCoord);
    vec3 hsl = rgb2hsl(image.rgb);
    vec3 rgb = hsl2rgb(vec3(hsl.x, 1, 0.5));

    if(max(image.r, max(image.g, image.b)) - min(image.r, min(image.g, image.b)) <= 0.03125) {
      float avg = (image.r + image.g + image.b) / 3.0;
      rgb = vec3(avg, avg, avg);
    }

    outColor = vec4(rgb, image.a);
  }
  `,a;function d(){a==null||a()}return(t,e)=>(R(),p(D,{onReady:s,onResize:d}))}});export{L as default};
