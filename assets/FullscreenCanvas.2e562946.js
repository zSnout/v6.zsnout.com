import{F as l}from"./FullscreenDisplay.053ea47b.js";import{d as o,r as u,m as c,o as v,e as d,w as s,g as p,b as f}from"./index.762f793e.js";const _=o({__name:"FullscreenCanvas",props:{breakpoint:null},emits:["ready","resize"],setup(r,{emit:n}){let e=u(null);function t(){if(e.value){let{width:a,height:i}=e.value.getBoundingClientRect();e.value.width=a*devicePixelRatio,e.value.height=i*devicePixelRatio,e.value.dispatchEvent(new UIEvent("resize")),n("resize",e.value)}}return c(()=>{e.value&&(t(),n("ready",e.value))}),window.addEventListener("resize",t),(a,i)=>(v(),d(l,{breakpoint:r.breakpoint,"resize-child":""},{nav:s(()=>[p(a.$slots,"nav")]),default:s(()=>[f("canvas",{ref_key:"canvas",ref:e},null,512)]),_:3},8,["breakpoint"]))}});export{_};