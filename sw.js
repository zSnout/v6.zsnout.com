if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>i(s,n),o={module:{uri:n},exports:u,require:a};e[n]=Promise.all(l.map((s=>o[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-c1760cce"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"d95150021d370aba800d3beb3b8e944a"},{url:"assets/AboutUsView.248712ad.js",revision:null},{url:"assets/AutoFlipChessboardView.31174a0b.js",revision:null},{url:"assets/BingoBoardView.0c66c1e6.js",revision:null},{url:"assets/BingoBoardView.876d6740.css",revision:null},{url:"assets/BingoMasterView.daffe9dc.js",revision:null},{url:"assets/BingoMasterView.e5f59fc3.css",revision:null},{url:"assets/BlogArticleListView.3ec890dd.js",revision:null},{url:"assets/CalculatingWeekdays.486be4d0.js",revision:null},{url:"assets/ChessVersusAI.143eb149.js",revision:null},{url:"assets/ChessVersusBadAIView.d3b957ee.js",revision:null},{url:"assets/ChessVersusCaptureAIView.bd1e5303.js",revision:null},{url:"assets/ChessVersusNoCaptureAIView.1b4b63e8.js",revision:null},{url:"assets/ChessVersusRandomView.d18c6286.js",revision:null},{url:"assets/ChessVersusStockfish.210ae6e6.js",revision:null},{url:"assets/ColorRemoverView.abb8f82b.js",revision:null},{url:"assets/ConnectFourView.c3d6cf17.css",revision:null},{url:"assets/ConnectFourView.e56a0f5f.js",revision:null},{url:"assets/cookie.648245ab.js",revision:null},{url:"assets/DivisibilityRules.fd4c5535.js",revision:null},{url:"assets/Does0Equal1.2a9cc141.js",revision:null},{url:"assets/EnglishIsWeirdView.360cc8ee.css",revision:null},{url:"assets/EnglishIsWeirdView.d17c03e0.js",revision:null},{url:"assets/FakeGradient2View.8a1db772.js",revision:null},{url:"assets/FakeGradientView.ba8e93b4.js",revision:null},{url:"assets/Forcing1089.2728653b.js",revision:null},{url:"assets/FractalPresetsView.e80edec0.js",revision:null},{url:"assets/FractalView.de00ac60.js",revision:null},{url:"assets/FrameOverlayView.0e91aabc.css",revision:null},{url:"assets/FrameOverlayView.1798c7d5.js",revision:null},{url:"assets/FullscreenCanvas.80f6c1f8.js",revision:null},{url:"assets/FullscreenDisplay.2736bd36.css",revision:null},{url:"assets/FullscreenDisplay.4d86b959.js",revision:null},{url:"assets/GithubCopilotIsAmazingView.dbea4d96.js",revision:null},{url:"assets/IllegalVersusStockfish.37beb64a.js",revision:null},{url:"assets/index.6ca718b5.js",revision:null},{url:"assets/index.ad39e1f8.css",revision:null},{url:"assets/InfinityIsMinusOneTwelfth.84c91fe7.js",revision:null},{url:"assets/LegalMoveChessboard.10a0864c.js",revision:null},{url:"assets/LegalMoveChessboard.5236be52.css",revision:null},{url:"assets/MathemagicalTricks.28d49aec.js",revision:null},{url:"assets/MetaballView.6ef47e10.js",revision:null},{url:"assets/MultDivQuizView.2a8d82bc.js",revision:null},{url:"assets/NotFoundView.81afe4e4.js",revision:null},{url:"assets/OvercolorView.767e45d9.js",revision:null},{url:"assets/Prose.bcd53409.css",revision:null},{url:"assets/Prose.d5733f2b.js",revision:null},{url:"assets/Quiz.19fbb481.css",revision:null},{url:"assets/Quiz.81c84fbc.js",revision:null},{url:"assets/RainbowNoiseView.c53ae784.js",revision:null},{url:"assets/SameNumberGenerator.194a11f5.css",revision:null},{url:"assets/SameNumberGenerator.293161ed.js",revision:null},{url:"assets/SquareQuizView.99fac7b4.js",revision:null},{url:"assets/StandardChessboardView.424af1e3.js",revision:null},{url:"assets/stockfish.0fcabb6c.js",revision:null},{url:"assets/stockfish.64cc1e90.js",revision:null},{url:"assets/storymatic.1ea74234.js",revision:null},{url:"assets/storymatic.ef4fb9e9.css",revision:null},{url:"assets/StorymaticEditorView.a434d5f2.js",revision:null},{url:"assets/StorymaticEditorView.f6181850.css",revision:null},{url:"assets/StorymaticJavaScriptView.93b04b4d.css",revision:null},{url:"assets/StorymaticJavaScriptView.b304d685.js",revision:null},{url:"assets/TicTacToeView.22920921.js",revision:null},{url:"assets/TicTacToeView.3cb8349f.css",revision:null},{url:"assets/TropeHighlighterView.0b57f035.css",revision:null},{url:"assets/TropeHighlighterView.1d7136e4.js",revision:null},{url:"assets/VideoCallView.3e7a6383.css",revision:null},{url:"assets/VideoCallView.bf437198.js",revision:null},{url:"assets/WebGL2Canvas.3d40e853.css",revision:null},{url:"assets/WebGL2Canvas.aa5f6f22.js",revision:null},{url:"assets/WhatMakesZSnoutDifferentView.382f0f94.js",revision:null},{url:"index.html",revision:"435416b32071bf5f95ff3e68d93f904d"},{url:"/android-chrome-192x192.png",revision:"7270527093800037"},{url:"/android-chrome-512x512.png",revision:"7270527093800037"},{url:"/apple-touch-icon.png",revision:"7270527093800037"},{url:"/browserconfig.xml",revision:"7270527093800037"},{url:"/CNAME",revision:"7270527093800037"},{url:"/favicon-16x16.png",revision:"7270527093800037"},{url:"/favicon-32x32.png",revision:"7270527093800037"},{url:"/favicon.ico",revision:"7270527093800037"},{url:"/manifest.json",revision:"7270527093800037"},{url:"/mstile-150x150.png",revision:"7270527093800037"},{url:"/pwa-192x192.png",revision:"7270527093800037"},{url:"/pwa-512x512.png",revision:"7270527093800037"},{url:"/robots.txt",revision:"7270527093800037"},{url:"/safari-pinned-tab.svg",revision:"7270527093800037"},{url:"/zsnout.icns",revision:"7270527093800037"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html")))}));
