import{d as m,e as w,o as a,f as o,a as l,t as B,n as g,u as i,i as v,_ as x,c as h,w as C,D as b,g as u,F as _}from"./index.f8171830.js";const k={class:"cell"},y=m({name:"BingoCell",props:{num:null},setup(d){let t=w(!1);return(p,c)=>(a(),o("span",{class:g({"outer-cell":!0,selected:i(t)}),onClick:c[0]||(c[0]=f=>v(t)?t.value=!i(t):t=!i(t))},[l("span",k,B(d.num),1)],2))}});const D={class:"board"},V={class:"row header"},$={class:"outer-cell"},F={class:"cell"},I={class:"row"},M=m({name:"BingoBoardView",setup(d){let t=p();function p(){let n=[[],[],[],[],[]];for(let e=0;e<5;e++){let s=c(e*15);for(let r=0;r<5;r++)n[r][e]=s[r]}return n}function c(n=0){let e=[];for(;e.length<5;){let s=f(n);e.includes(s)||e.push(s)}return e}function f(n=0){return Math.floor(Math.random()*15)+1+n}return(n,e)=>(a(),h(b,{"explicit-height":"",flexbox:""},{default:C(()=>[l("div",D,[l("div",V,[(a(),o(_,null,u("BINGO",s=>l("span",$,[l("span",F,B(s),1)])),64))]),(a(!0),o(_,null,u(i(t),s=>(a(),o("div",I,[(a(!0),o(_,null,u(s,r=>(a(),h(y,{num:r},null,8,["num"]))),256))]))),256))])]),_:1}))}});var R=x(M,[["__scopeId","data-v-6c92231e"]]);export{R as default};
