if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const o=s=>i(s,n),a={module:{uri:n},exports:u,require:o};e[n]=Promise.all(l.map((s=>a[s]||o(s)))).then((s=>(r(...s),u)))}}define(["./workbox-c1760cce"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"d95150021d370aba800d3beb3b8e944a"},{url:"assets/AboutUsView.8d09c771.js",revision:null},{url:"assets/Article.5e738bc7.js",revision:null},{url:"assets/Article.749d81fd.css",revision:null},{url:"assets/AutoFlipChessboardView.6dfd7e4b.js",revision:null},{url:"assets/BingoBoardView.6bc6ded3.js",revision:null},{url:"assets/BingoBoardView.876d6740.css",revision:null},{url:"assets/BingoMasterView.31e07a0c.js",revision:null},{url:"assets/BingoMasterView.e5f59fc3.css",revision:null},{url:"assets/BlogArticleListView.a7c91a3b.js",revision:null},{url:"assets/CalculatingWeekdays.5ba46767.js",revision:null},{url:"assets/ChessVersusAI.13575323.js",revision:null},{url:"assets/ChessVersusBadAIView.01031cce.js",revision:null},{url:"assets/ChessVersusCaptureAIView.0f6e5090.js",revision:null},{url:"assets/ChessVersusNoCaptureAIView.221b2684.js",revision:null},{url:"assets/ChessVersusRandomView.f6a70cf2.js",revision:null},{url:"assets/ChessVersusStockfish.6ab1a8bd.js",revision:null},{url:"assets/ColorRemoverView.b720dec9.js",revision:null},{url:"assets/ConnectFourView.c3d6cf17.css",revision:null},{url:"assets/ConnectFourView.df55a368.js",revision:null},{url:"assets/cookie.648245ab.js",revision:null},{url:"assets/DivisibilityRules.6d45e14e.js",revision:null},{url:"assets/Does0Equal1.ccd6c6ed.js",revision:null},{url:"assets/EnglishIsWeirdView.360cc8ee.css",revision:null},{url:"assets/EnglishIsWeirdView.5472bb07.js",revision:null},{url:"assets/FakeGradient2View.309fe708.js",revision:null},{url:"assets/FakeGradientView.0979528c.js",revision:null},{url:"assets/Forcing1089.8d4bb86c.js",revision:null},{url:"assets/FractalPresetsView.bb7cd9b3.js",revision:null},{url:"assets/FractalView.10f57fd2.js",revision:null},{url:"assets/FrameOverlayView.0e91aabc.css",revision:null},{url:"assets/FrameOverlayView.5a616749.js",revision:null},{url:"assets/FullscreenCanvas.261c4df0.js",revision:null},{url:"assets/FullscreenDisplay.2736bd36.css",revision:null},{url:"assets/FullscreenDisplay.3c6afb23.js",revision:null},{url:"assets/GithubCopilotIsAmazingView.1bfa43fa.js",revision:null},{url:"assets/IllegalVersusStockfish.9f852a4b.js",revision:null},{url:"assets/index.26979f72.css",revision:null},{url:"assets/index.3e022063.js",revision:null},{url:"assets/InfinityIsMinusOneTwelfth.2d2f8e9a.js",revision:null},{url:"assets/LegalMoveChessboard.395863e9.js",revision:null},{url:"assets/LegalMoveChessboard.5236be52.css",revision:null},{url:"assets/MathemagicalTricks.d3d6ccb6.js",revision:null},{url:"assets/MetaballView.bfcbc6e9.js",revision:null},{url:"assets/MultDivQuizView.527b32ef.js",revision:null},{url:"assets/NotFoundView.d7e263cc.js",revision:null},{url:"assets/OvercolorView.83106445.js",revision:null},{url:"assets/Quiz.19fbb481.css",revision:null},{url:"assets/Quiz.601fc949.js",revision:null},{url:"assets/RainbowNoiseView.f27c75cd.js",revision:null},{url:"assets/SquareQuizView.eb857294.js",revision:null},{url:"assets/StandardChessboardView.c390ebfd.js",revision:null},{url:"assets/stockfish.77ed8172.js",revision:null},{url:"assets/stockfish.d5755b2d.js",revision:null},{url:"assets/storymatic.d71b6f35.js",revision:null},{url:"assets/storymatic.ef4fb9e9.css",revision:null},{url:"assets/StorymaticEditorView.d7f9e3d2.js",revision:null},{url:"assets/StorymaticEditorView.f6181850.css",revision:null},{url:"assets/StorymaticJavaScriptView.93b04b4d.css",revision:null},{url:"assets/StorymaticJavaScriptView.f68cc97c.js",revision:null},{url:"assets/TicTacToeView.3cb8349f.css",revision:null},{url:"assets/TicTacToeView.5da9da28.js",revision:null},{url:"assets/TropeHighlighterView.0b57f035.css",revision:null},{url:"assets/TropeHighlighterView.d09e468f.js",revision:null},{url:"assets/VideoCallView.3e7a6383.css",revision:null},{url:"assets/VideoCallView.f4598977.js",revision:null},{url:"assets/WebGL2Canvas.3d40e853.css",revision:null},{url:"assets/WebGL2Canvas.9fe8de6b.js",revision:null},{url:"assets/WhatMakesZSnoutDifferentView.72c70c99.js",revision:null},{url:"index.html",revision:"66a15fc6a6fbf1b3e97d45833b047e58"},{url:"/android-chrome-192x192.png",revision:"2359675843243203"},{url:"/android-chrome-512x512.png",revision:"2359675843243203"},{url:"/apple-touch-icon.png",revision:"2359675843243203"},{url:"/browserconfig.xml",revision:"2359675843243203"},{url:"/CNAME",revision:"2359675843243203"},{url:"/favicon-16x16.png",revision:"2359675843243203"},{url:"/favicon-32x32.png",revision:"2359675843243203"},{url:"/favicon.ico",revision:"2359675843243203"},{url:"/manifest.json",revision:"2359675843243203"},{url:"/mstile-150x150.png",revision:"2359675843243203"},{url:"/pwa-192x192.png",revision:"2359675843243203"},{url:"/pwa-512x512.png",revision:"2359675843243203"},{url:"/robots.txt",revision:"2359675843243203"},{url:"/safari-pinned-tab.svg",revision:"2359675843243203"},{url:"/zsnout.icns",revision:"2359675843243203"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html")))}));
