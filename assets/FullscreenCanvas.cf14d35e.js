import{F as r}from"./FullscreenDisplay.9a94a77c.js";import{d as o,e as c,l as u,o as v,c as d,w as s,h as p,a as f}from"./index.f8171830.js";const m=o({name:"FullscreenCanvas",props:{breakpoint:null},emits:["ready","resize"],setup(l,{emit:n}){let e=c(null);function t(){if(e.value){let{width:a,height:i}=e.value.getBoundingClientRect();e.value.width=a*devicePixelRatio,e.value.height=i*devicePixelRatio,e.value.dispatchEvent(new UIEvent("resize")),n("resize",e.value)}}return u(()=>{e.value&&(t(),n("ready",e.value))}),window.addEventListener("resize",t),(a,i)=>(v(),d(r,{breakpoint:l.breakpoint,"resize-child":""},{nav:s(()=>[p(a.$slots,"nav")]),default:s(()=>[f("canvas",{ref_key:"canvas",ref:e},null,512)]),_:3},8,["breakpoint"]))}});export{m as _};
