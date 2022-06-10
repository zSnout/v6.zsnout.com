import{W as m}from"./WebGL2Canvas.d29dcf93.js";import{d as p,o as u,e as _,u as s}from"./index.e712f3b5.js";import"./FullscreenCanvas.a03973c3.js";import"./FullscreenDisplay.f5a37682.js";const z=p({__name:"MetaballView",setup(w){let i=Array.from({length:50},()=>{let t=Math.random(),o=Math.random(),n=Math.random()*5+5,a=(Math.random()-.5)*2/200,l=(Math.random()-.5)*2/200;return{x:t,y:o,r:n,dx:a,dy:l}});function h({canvas:t,gl:o,program:n,render:a}){let l=o.getUniformLocation(n,"metaballs"),d=o.getUniformLocation(n,"window_size");function f(){i.map(e=>{e.x+=e.dx,e.x<0?e.x=1-e.x:e.x>1&&(e.x=e.x-1),e.y+=e.dy,e.y<0?e.y=1-e.y:e.y>1&&(e.y=e.y-1)});let r=new Float32Array(i.length*3);for(let e=0;e<i.length;e++){let{x,y,r:c}=i[e];r[e*2]=x,r[e*2+1]=y,r[e*2+2]=c}o.uniform3fv(l,r),t.height>t.width?o.uniform2fv(d,[1,t.height/t.width]):o.uniform2fv(d,[t.width/t.height,1]),a(),requestAnimationFrame(f)}f()}return(t,o)=>(u(),_(m,{shader:`
    #version 300 es
    precision highp float;

    in vec2 pos;
    out vec4 color;

    uniform vec2 window_size;
    uniform vec3 metaballs[${s(i).length}];

    void main() {
      vec2 _pos = pos * window_size / 2.0;
      float dist;

      for (int i = 0; i < ${s(i).length}; i++) {
        vec3 mb = metaballs[i];

        float dx = mb.x - _pos.x;
        dx = min(dx, 1.0 - dx);

        float dy = mb.y - _pos.y;
        dy = min(dy, 1.0 - dy);

        dist += 1.0 / (dx * dx + dy * dy);
      }

      if (dist > 1000.0) color = vec4(1, 1, 1, 1);
      else color = vec4(0, 0, 0, 1);
    }
    `,onReady:h},null,8,["shader"]))}});export{z as default};
