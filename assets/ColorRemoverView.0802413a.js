import{d as k,m as y,z as R,y as T,o as b,e as x,w as d,g as $,v as I,h,N as p,j as v,x as _}from"./index.f31ce7d5.js";import{_ as B}from"./FullscreenCanvas.3856027d.js";import"./FullscreenDisplay.4ca10b0e.js";let c=document.createElement("canvas"),w=c.getContext("2d");function N(l){return new Promise(s=>{let e=document.createElement("video");e.onloadedmetadata=()=>s(e),e.srcObject=l,e.play()})}function V(l,s,e){return c.width=s||l.videoWidth,c.height=e||l.videoHeight,w.drawImage(l,0,0,c.width,c.height),w.getImageData(0,0,c.width,c.height)}const j=k({name:"CameraAdjuster",props:{transform:null,breakpoint:null},setup(l){const{transform:s}=l;let e=new Promise(a=>{y(()=>{a(navigator.mediaDevices.getUserMedia({video:{aspectRatio:{ideal:innerWidth/innerHeight}}}))})}).catch(()=>{R("Oops, we weren't able to get camera permissions. Try again later.")}),r;async function o(a){let i=a.getContext("2d");if(!i)return;let u=await e;if(!u)return;let m=await N(u);r=setInterval(()=>{let g=V(m,a.width,a.height);i.putImageData(s(g),0,0)},1e3/30)}return T(async()=>{clearInterval(r);let a=await e;!a||a.getTracks().map(i=>{i.readyState=="live"&&i.stop()})}),(a,i)=>(b(),x(B,{breakpoint:l.breakpoint,onReady:o},{nav:d(()=>[$(a.$slots,"nav")]),_:3},8,["breakpoint"]))}}),D=v("Toggle Red"),M=v("Toggle Green"),E=v("Toggle Blue"),P=k({name:"ColorRemoverView",setup(l){let s=""+(I().params.colors||""),e=s.includes("r"),r=s.includes("g"),o=s.includes("b"),a=e&&r&&o;function i(){return`/color-remover/${e?"r":""}${r?"g":""}${o?"b":""}`}function u(n){if(e)for(let t=0;t<n.data.length;t+=4)n.data[t]=0;if(r)for(let t=1;t<n.data.length;t+=4)n.data[t]=0;if(o)for(let t=2;t<n.data.length;t+=4)n.data[t]=0;if(a)for(let t=0;t<n.data.length;t+=4){let f=360*Math.random();n.data[t]=f,n.data[t+1]=f,n.data[t+2]=f}return n}function m(){e=!e,a=e&&r&&o,_.replace(i())}function g(){r=!r,a=e&&r&&o,_.replace(i())}function C(){o=!o,a=e&&r&&o,_.replace(i())}return(n,t)=>(b(),x(j,{breakpoint:600,transform:u},{nav:d(()=>[h(p,{onClick:m},{default:d(()=>[D]),_:1}),h(p,{onClick:g},{default:d(()=>[M]),_:1}),h(p,{onClick:C},{default:d(()=>[E]),_:1})]),_:1}))}});export{P as default};
