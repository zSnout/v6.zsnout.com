import{_ as O,d as T,z as A,o as p,f as y,j as k,w as v,N as F,b as N,a as V,F as x,g as B,u as E,D as H,r as z,n as G,t as L}from"./index.6ca718b5.js";const R={class:"board"},J=["onClick"],S=T({__name:"ConnectFourView",setup(W){let e=[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],g=A([[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]),c=!0;function d(t){var o,u,a,_,s,l,i,m,f;for(let n=0;n<7;n++)for(let r=0;r<6;r++)if(e[n][r]===t&&(e[n][r]===e[n][r+1]&&e[n][r]===e[n][r+2]&&e[n][r]===e[n][r+3]||e[n][r]===((o=e[n+1])==null?void 0:o[r])&&e[n][r]===((u=e[n+2])==null?void 0:u[r])&&e[n][r]===((a=e[n+3])==null?void 0:a[r])||e[n][r]===((_=e[n+1])==null?void 0:_[r+1])&&e[n][r]===((s=e[n+2])==null?void 0:s[r+2])&&e[n][r]===((l=e[n+3])==null?void 0:l[r+3])||e[n][r]===((i=e[n-1])==null?void 0:i[r+1])&&e[n][r]===((m=e[n-2])==null?void 0:m[r+2])&&e[n][r]===((f=e[n-3])==null?void 0:f[r+3])))return!0}function h(){return e.every(t=>t.every(o=>o))}function M(t,o,u,a,_){if(d(t))return[1];if(d(-t))return[-1];if(h())return[0];if(o==0)return[0];let s=-1,l=[];for(let i=0;i<7;i++){let m=e[i].lastIndexOf(0);if(e[i][m]===0){e[i][m]=t;let f=-M(-t,o-1,-a,-u,!_)[0];if(e[i][m]=0,f>s&&(l=[]),f>=s&&l.push(i),s=Math.max(s,f),_){if(f>=a)break;u=Math.max(u,f)}else{if(f<=u)break;a=Math.min(a,f)}}}return[s,l]}function C(){for(let t=0;t<7;t++)for(let o=0;o<6;o++)g[o][t]=e[t][o]}function b(t=1){if(c)return;let[o,u]=M(t,8,-1/0,1/0,!0);if(console.log(-o*t),!u||!u.length)return;let a=u[Math.floor(Math.random()*u.length)];D(a,t),C(),c=!0}function w(){d(1)||d(-1)||h()||!c||(c=!1,b(-1),c=!1,setTimeout(b,0))}function D(t,o){let u=e[t].lastIndexOf(0);return u==-1?!1:(e[t][u]=o,!0)}function K(t){d(1)||d(-1)||h()||!c||(c=!1,D(t,-1),C(),setTimeout(b,500))}function j(t){if(!(t.ctrlKey||t.metaKey||t.altKey)&&t.key.length==1){if(t.key=="R"||t.key=="r")return t.preventDefault(),I();if(t.key=="J"||t.key=="j")return t.preventDefault(),w()}}function I(){e=[[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],c=!0,C()}return(t,o)=>{const u=z("GlobalEvents");return p(),y(x,null,[k(u,{onKeydown:j}),k(H,{"explicit-height":"",flexbox:""},{nav:v(()=>[k(F,{onClick:w},{default:v(()=>[N("Best Move")]),_:1}),k(F,{onClick:I},{default:v(()=>[N("Reset")]),_:1})]),default:v(()=>[V("div",R,[(p(!0),y(x,null,B(E(g),(a,_)=>(p(),y(x,{key:_},[(p(!0),y(x,null,B(a,(s,l)=>(p(),y("span",{key:l,class:"outer-cell",onClick:i=>K(l)},[V("span",{class:G([s==-1?"x":s==1?"o":"n","cell"])},L(s==-1?"X":s==1?"O":"N"),3)],8,J))),128))],64))),128))])]),_:1})],64)}}});var $=O(S,[["__scopeId","data-v-3dbbe50c"]]);export{$ as default};
