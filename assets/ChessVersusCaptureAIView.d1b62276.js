import{_ as a}from"./ChessVersusAI.6da68798.js";import{d as c,o as p,c as m}from"./index.f8171830.js";import"./LegalMoveChessboard.f7af51c4.js";const _=c({name:"ChessVersusCaptureAIView",setup(i){let o=["k","q","r","b","n","p",void 0];function t(r){let e=r.moves({verbose:!0});return e.sort(()=>Math.random()<.5?-1:1).sort(({captured:s},{captured:n})=>o.indexOf(s)-o.indexOf(n)),e[0]}return(r,e)=>(p(),m(a,{move:t}))}});export{_ as default};
