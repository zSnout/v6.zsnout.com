import{_ as V,d as A,z as F,o as f,f as c,j as l,w as _,N as b,b as w,a as M,F as d,g as B,u as E,D as I,r as j,n as z,t as G}from"./index.6ca718b5.js";const H={class:"board"},L=["onClick"],O=A({__name:"TicTacToeView",setup(R){let t=[[0,0,0],[0,0,0],[0,0,0]],T=F([[0,0,0],[0,0,0],[0,0,0]]),s=!0;function a(e){return t[0][0]===e&&t[0][1]===e&&t[0][2]===e||t[1][0]===e&&t[1][1]===e&&t[1][2]===e||t[2][0]===e&&t[2][1]===e&&t[2][2]===e||t[0][0]===e&&t[1][0]===e&&t[2][0]===e||t[0][1]===e&&t[1][1]===e&&t[2][1]===e||t[0][2]===e&&t[1][2]===e&&t[2][2]===e||t[0][0]===e&&t[1][1]===e&&t[2][2]===e||t[0][2]===e&&t[1][1]===e&&t[2][0]===e}function m(){return t.every(e=>e.every(n=>n))}function x(e){if(a(e))return[1];if(a(-e))return[-1];if(m())return[0];let n=-1,o=[];for(let r=0;r<3;r++)for(let u=0;u<3;u++)if(t[r][u]===0){t[r][u]=e;let i=-x(-e)[0];t[r][u]=0,i>n&&(o=[]),n=Math.max(n,i),i==n&&o.push([r,u])}return[n,o]}function h(){for(let e=0;e<3;e++)for(let n=0;n<3;n++)T[e][n]=t[e][n]}function k(e=1){if(s)return;let[,n]=x(e);if(!n||!n.length)return;let o=n[Math.floor(Math.random()*n.length)];t[o[0]][o[1]]=e,s=!0,h()}function C(){a(1)||a(-1)||m()||!s||(s=!1,k(-1),s=!1,setTimeout(k,500))}function g(e,n){a(1)||a(-1)||m()||t[e][n]===0&&(!s||(s=!1,t[e][n]=-1,h(),setTimeout(k,500)))}function K(e,n,o){return e===-1?"X":e===1?"O":String.fromCharCode(65+3*n+o)}function N(e){if(e.ctrlKey||e.metaKey||e.altKey||e.key.length!=1)return;if(e.key=="R"||e.key=="r")return e.preventDefault(),D();if(e.key=="J"||e.key=="j")return e.preventDefault(),C();let n=e.key.charCodeAt(0);if(65<=n&&n<=74)n-=65;else if(97<=n&&n<=106)n-=97;else return;e.preventDefault();let o=n%3,r=Math.floor(n/3);g(r,o)}function D(){t=[[0,0,0],[0,0,0],[0,0,0]],s=!0,h()}return(e,n)=>{const o=j("GlobalEvents");return f(),c(d,null,[l(o,{onKeydown:N}),l(I,{"explicit-height":"",flexbox:""},{nav:_(()=>[l(b,{onClick:C},{default:_(()=>[w("Best Move")]),_:1}),l(b,{onClick:D},{default:_(()=>[w("Reset")]),_:1})]),default:_(()=>[M("div",H,[(f(!0),c(d,null,B(E(T),(r,u)=>(f(),c(d,{key:u},[(f(!0),c(d,null,B(r,(i,v)=>(f(),c("span",{key:v,class:"outer-cell",onClick:S=>g(u,v)},[M("span",{class:z([i==-1?"x":i==1?"o":"n","cell"])},G(K(i,u,v)),3)],8,L))),128))],64))),128))])]),_:1})],64)}}});var J=V(O,[["__scopeId","data-v-a32de9e2"]]);export{J as default};
