if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>i(s,n),o={module:{uri:n},exports:u,require:a};e[n]=Promise.all(l.map((s=>o[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-c1760cce"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"d95150021d370aba800d3beb3b8e944a"},{url:"assets/AboutUsView.01de4c45.js",revision:null},{url:"assets/Article.749d81fd.css",revision:null},{url:"assets/Article.bbb479ee.js",revision:null},{url:"assets/AutoFlipChessboardView.251bb3ab.js",revision:null},{url:"assets/BingoBoardView.73785bf8.js",revision:null},{url:"assets/BingoBoardView.876d6740.css",revision:null},{url:"assets/BingoMasterView.222d3e5d.js",revision:null},{url:"assets/BingoMasterView.e5f59fc3.css",revision:null},{url:"assets/BlogArticleListView.2e424f1f.js",revision:null},{url:"assets/CalculatingWeekdays.d18477d0.js",revision:null},{url:"assets/ChessVersusAI.b600c913.js",revision:null},{url:"assets/ChessVersusBadAIView.090a0bfe.js",revision:null},{url:"assets/ChessVersusCaptureAIView.1c69a7eb.js",revision:null},{url:"assets/ChessVersusNoCaptureAIView.6a1f4818.js",revision:null},{url:"assets/ChessVersusRandomView.2e597dff.js",revision:null},{url:"assets/ChessVersusStockfish.3c562eef.js",revision:null},{url:"assets/ColorRemoverView.6ad32fa1.js",revision:null},{url:"assets/ConnectFourView.3f4839a5.js",revision:null},{url:"assets/ConnectFourView.c3d6cf17.css",revision:null},{url:"assets/cookie.648245ab.js",revision:null},{url:"assets/DivisibilityRules.ec71cc05.js",revision:null},{url:"assets/Does0Equal1.df20655b.js",revision:null},{url:"assets/EnglishIsWeirdView.360cc8ee.css",revision:null},{url:"assets/EnglishIsWeirdView.6c239bdb.js",revision:null},{url:"assets/FakeGradient2View.ba9461f3.js",revision:null},{url:"assets/FakeGradientView.a14637d5.js",revision:null},{url:"assets/Forcing1089.cb465f7b.js",revision:null},{url:"assets/FractalPresetsView.f4fe9bfc.js",revision:null},{url:"assets/FractalView.cd8ee192.js",revision:null},{url:"assets/FrameOverlayView.0e91aabc.css",revision:null},{url:"assets/FrameOverlayView.bf9948e7.js",revision:null},{url:"assets/FullscreenCanvas.e8c7d2c7.js",revision:null},{url:"assets/FullscreenDisplay.2736bd36.css",revision:null},{url:"assets/FullscreenDisplay.2dc5561d.js",revision:null},{url:"assets/GithubCopilotIsAmazingView.04cd9309.js",revision:null},{url:"assets/IllegalVersusStockfish.3f6533d5.js",revision:null},{url:"assets/index.26979f72.css",revision:null},{url:"assets/index.407f1349.js",revision:null},{url:"assets/InfinityIsMinusOneTwelfth.20ec5d4e.js",revision:null},{url:"assets/LegalMoveChessboard.43cabead.js",revision:null},{url:"assets/LegalMoveChessboard.5236be52.css",revision:null},{url:"assets/MathemagicalTricks.47adc20c.js",revision:null},{url:"assets/MetaballView.759e46c9.js",revision:null},{url:"assets/MultDivQuizView.3a74c665.js",revision:null},{url:"assets/NotFoundView.c5b06da7.js",revision:null},{url:"assets/OvercolorView.5f518681.js",revision:null},{url:"assets/Quiz.19fbb481.css",revision:null},{url:"assets/Quiz.d380575d.js",revision:null},{url:"assets/RainbowNoiseView.fca08591.js",revision:null},{url:"assets/SquareQuizView.5ee770aa.js",revision:null},{url:"assets/StandardChessboardView.b4cf785b.js",revision:null},{url:"assets/stockfish.77ed8172.js",revision:null},{url:"assets/stockfish.d5755b2d.js",revision:null},{url:"assets/storymatic.ef4fb9e9.css",revision:null},{url:"assets/storymatic.f742ea80.js",revision:null},{url:"assets/StorymaticEditorView.d56d6ece.js",revision:null},{url:"assets/StorymaticEditorView.f6181850.css",revision:null},{url:"assets/StorymaticJavaScriptView.93b04b4d.css",revision:null},{url:"assets/StorymaticJavaScriptView.b13eee46.js",revision:null},{url:"assets/TicTacToeView.3cb8349f.css",revision:null},{url:"assets/TicTacToeView.aeb5dd41.js",revision:null},{url:"assets/TropeHighlighterView.0b57f035.css",revision:null},{url:"assets/TropeHighlighterView.5309370c.js",revision:null},{url:"assets/VideoCallView.3e7a6383.css",revision:null},{url:"assets/VideoCallView.4a2654a8.js",revision:null},{url:"assets/WebGL2Canvas.3d40e853.css",revision:null},{url:"assets/WebGL2Canvas.e1f0ea22.js",revision:null},{url:"assets/WhatMakesZSnoutDifferentView.f0dcad75.js",revision:null},{url:"index.html",revision:"c8329ae0cbe0846c696df08f06e9f1ae"},{url:"/android-chrome-192x192.png",revision:"7112824782438139"},{url:"/android-chrome-512x512.png",revision:"7112824782438139"},{url:"/apple-touch-icon.png",revision:"7112824782438139"},{url:"/browserconfig.xml",revision:"7112824782438139"},{url:"/CNAME",revision:"7112824782438139"},{url:"/favicon-16x16.png",revision:"7112824782438139"},{url:"/favicon-32x32.png",revision:"7112824782438139"},{url:"/favicon.ico",revision:"7112824782438139"},{url:"/manifest.json",revision:"7112824782438139"},{url:"/mstile-150x150.png",revision:"7112824782438139"},{url:"/pwa-192x192.png",revision:"7112824782438139"},{url:"/pwa-512x512.png",revision:"7112824782438139"},{url:"/robots.txt",revision:"7112824782438139"},{url:"/safari-pinned-tab.svg",revision:"7112824782438139"},{url:"/zsnout.icns",revision:"7112824782438139"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html")))}));
