import{d as m,r as w,o as r,c as o,b as l,t as B,n as v,u as i,i as g,_ as x,e as h,w as b,D as C,f as u,F as _}from"./index.f31ce7d5.js";const k={class:"cell"},y=m({name:"BingoCell",props:{num:null},setup(d){let t=w(!1);return(p,c)=>(r(),o("span",{class:v({"outer-cell":!0,selected:i(t)}),onClick:c[0]||(c[0]=f=>g(t)?t.value=!i(t):t=!i(t))},[l("span",k,B(d.num),1)],2))}});const D={class:"board"},V={class:"row header"},$={class:"outer-cell"},F={class:"cell"},I={class:"row"},M=m({name:"BingoBoardView",setup(d){let t=p();function p(){let n=[[],[],[],[],[]];for(let e=0;e<5;e++){let s=c(e*15);for(let a=0;a<5;a++)n[a][e]=s[a]}return n}function c(n=0){let e=[];for(;e.length<5;){let s=f(n);e.includes(s)||e.push(s)}return e}function f(n=0){return Math.floor(Math.random()*15)+1+n}return(n,e)=>(r(),h(C,{"explicit-height":"",flexbox:""},{default:b(()=>[l("div",D,[l("div",V,[(r(),o(_,null,u("BINGO",s=>l("span",$,[l("span",F,B(s),1)])),64))]),(r(!0),o(_,null,u(i(t),s=>(r(),o("div",I,[(r(!0),o(_,null,u(s,a=>(r(),h(y,{num:a},null,8,["num"]))),256))]))),256))])]),_:1}))}});var R=x(M,[["__scopeId","data-v-6c92231e"]]);export{R as default};
