import{_ as h}from"./FullscreenCanvas.80f6c1f8.js";import{d as x,s as g,o as D,c as $,w as s,j as d,b as c,N as _,x as C,v as m}from"./index.6ca718b5.js";import"./FullscreenDisplay.4d86b959.js";const R=x({__name:"FakeGradient2View",setup(v){let o,l,e=+g().params.detail;(!isFinite(e)||e<50)&&(e=50),e=Math.floor(e);function u(i){let r=i.getContext("2d");if(!r)return;function a(){let f=i.width/e;for(let n=0;n<e;n++){let t=n/e,w=t<=.5?t:1-t;t+=Math.random()*w,t=t<0?0:t>1?1:t,t=255*(1-t),r.fillStyle=`rgb(${t}, ${t}, ${t})`,r.fillRect(n*f,0,f,i.height)}}a(),window.addEventListener("resize",a),C(()=>window.removeEventListener("resize",a)),o=()=>{e-=50,e<50&&(e=50),m.replace(`/fake-gradient-2/${e}`),a()},l=()=>{e+=50,m.replace(`/fake-gradient-2/${e}`),a()}}function p(){o&&o()}function k(){l&&l()}return(i,r)=>(D(),$(h,{onReady:u},{nav:s(()=>[d(_,{onClick:p},{default:s(()=>[c("Less Detail")]),_:1}),d(_,{onClick:k},{default:s(()=>[c("More Detail")]),_:1})]),_:1}))}});export{R as default};
