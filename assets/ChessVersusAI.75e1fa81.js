import{d as v,e as u,s as w,o as b,c as C,w as a,j as c,N as f,u as m,b as k,v as h}from"./index.655ccbf2.js";import{_ as $}from"./LegalMoveChessboard.5b918ac4.js";const x=k("Reload as White"),N=k("Reload as Black"),R=v({__name:"ChessVersusAI",props:{move:null,destinations:null},setup(o){const{move:_}=o;let i=u(1),l=w().params.mode,n=l=="white"?"w":l=="black"?"b":Math.random()<.5?"w":"b",r=u(n=="w"?"white":"black");async function p(e,t,s){t.turn()!=n&&e(_(t,s))}function d(e){location.href.endsWith("/")?h.push(`../${e}`):h.push(`./${e}`),r.value=e,n=e=="white"?"w":"b",i.value++}return(e,t)=>(b(),C($,{key:m(i),destinations:o.destinations,orientation:m(r),onMove:p},{nav:a(()=>[c(f,{onClick:t[0]||(t[0]=s=>d("white"))},{default:a(()=>[x]),_:1}),c(f,{onClick:t[1]||(t[1]=s=>d("black"))},{default:a(()=>[N]),_:1})]),_:1},8,["destinations","orientation"]))}});export{R as _};
