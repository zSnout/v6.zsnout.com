if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>i(s,n),o={module:{uri:n},exports:u,require:a};e[n]=Promise.all(l.map((s=>o[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-c1760cce"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"d95150021d370aba800d3beb3b8e944a"},{url:"assets/AboutUsView.99d393a3.js",revision:null},{url:"assets/AboutUsView.f480e6bc.css",revision:null},{url:"assets/Article.bfb90365.css",revision:null},{url:"assets/Article.f18d2851.js",revision:null},{url:"assets/AutoFlipChessboardView.e9d43617.js",revision:null},{url:"assets/BingoBoardView.47aa4e32.js",revision:null},{url:"assets/BingoBoardView.876d6740.css",revision:null},{url:"assets/BingoMasterView.92c32437.js",revision:null},{url:"assets/BingoMasterView.e5f59fc3.css",revision:null},{url:"assets/BlogArticleListView.eb3cfb6b.js",revision:null},{url:"assets/CalculatingWeekdays.f845bee7.js",revision:null},{url:"assets/ChessVersusAI.5885ded1.js",revision:null},{url:"assets/ChessVersusBadAIView.91bf7675.js",revision:null},{url:"assets/ChessVersusCaptureAIView.e5f5e0cb.js",revision:null},{url:"assets/ChessVersusNoCaptureAIView.d08efffd.js",revision:null},{url:"assets/ChessVersusRandomView.ef383fcb.js",revision:null},{url:"assets/ChessVersusStockfish.26ac8b84.js",revision:null},{url:"assets/ColorRemoverView.0802413a.js",revision:null},{url:"assets/ConnectFourView.4ae29cd6.js",revision:null},{url:"assets/ConnectFourView.c3d6cf17.css",revision:null},{url:"assets/cookie.648245ab.js",revision:null},{url:"assets/DivisibilityRules.65bca9b9.js",revision:null},{url:"assets/Does0Equal1.1dda609b.js",revision:null},{url:"assets/EnglishIsWeirdView.360cc8ee.css",revision:null},{url:"assets/EnglishIsWeirdView.58a13594.js",revision:null},{url:"assets/FakeGradient2View.d21e4ebb.js",revision:null},{url:"assets/FakeGradientView.6f7393d9.js",revision:null},{url:"assets/Forcing1089.18cb71a9.js",revision:null},{url:"assets/FractalPresetsView.bf66c9b6.js",revision:null},{url:"assets/FractalView.c6acb3db.js",revision:null},{url:"assets/FrameOverlayView.0e91aabc.css",revision:null},{url:"assets/FrameOverlayView.709a424c.js",revision:null},{url:"assets/FullscreenCanvas.3856027d.js",revision:null},{url:"assets/FullscreenDisplay.2736bd36.css",revision:null},{url:"assets/FullscreenDisplay.4ca10b0e.js",revision:null},{url:"assets/GithubCopilotIsAmazingView.5072d47b.js",revision:null},{url:"assets/IllegalVersusStockfish.6f842a96.js",revision:null},{url:"assets/index.a94b4896.css",revision:null},{url:"assets/index.f31ce7d5.js",revision:null},{url:"assets/InfinityIsMinusOneTwelfth.6d758856.js",revision:null},{url:"assets/LegalMoveChessboard.5236be52.css",revision:null},{url:"assets/LegalMoveChessboard.d9faf10b.js",revision:null},{url:"assets/MathemagicalTricks.03a889fe.js",revision:null},{url:"assets/MetaballView.310d1b9e.js",revision:null},{url:"assets/MultDivQuizView.9ffa0277.js",revision:null},{url:"assets/NotFoundView.cccc2cda.js",revision:null},{url:"assets/OvercolorView.9388f2ff.js",revision:null},{url:"assets/Quiz.19fbb481.css",revision:null},{url:"assets/Quiz.8908861f.js",revision:null},{url:"assets/RainbowNoiseView.a5af1446.js",revision:null},{url:"assets/SameNumberGenerator.194a11f5.css",revision:null},{url:"assets/SameNumberGenerator.eb13d712.js",revision:null},{url:"assets/SquareQuizView.6353e46e.js",revision:null},{url:"assets/StandardChessboardView.3ec51b3d.js",revision:null},{url:"assets/stockfish.77ed8172.js",revision:null},{url:"assets/stockfish.d5755b2d.js",revision:null},{url:"assets/storymatic.05a4c143.js",revision:null},{url:"assets/storymatic.ef4fb9e9.css",revision:null},{url:"assets/StorymaticEditorView.3eeb5753.js",revision:null},{url:"assets/StorymaticEditorView.f6181850.css",revision:null},{url:"assets/StorymaticJavaScriptView.93b04b4d.css",revision:null},{url:"assets/StorymaticJavaScriptView.b01a8304.js",revision:null},{url:"assets/TicTacToeView.3cb8349f.css",revision:null},{url:"assets/TicTacToeView.8c8e68f0.js",revision:null},{url:"assets/TropeHighlighterView.0b57f035.css",revision:null},{url:"assets/TropeHighlighterView.98de8f37.js",revision:null},{url:"assets/VideoCallView.3e7a6383.css",revision:null},{url:"assets/VideoCallView.472ab73c.js",revision:null},{url:"assets/WebGL2Canvas.3d40e853.css",revision:null},{url:"assets/WebGL2Canvas.d65122d2.js",revision:null},{url:"assets/WhatMakesZSnoutDifferentView.64535896.js",revision:null},{url:"index.html",revision:"63ebbb0fcf2713bf68e3434cf8704d30"},{url:"/android-chrome-192x192.png",revision:"7575757942879713"},{url:"/android-chrome-512x512.png",revision:"7575757942879713"},{url:"/apple-touch-icon.png",revision:"7575757942879713"},{url:"/browserconfig.xml",revision:"7575757942879713"},{url:"/CNAME",revision:"7575757942879713"},{url:"/favicon-16x16.png",revision:"7575757942879713"},{url:"/favicon-32x32.png",revision:"7575757942879713"},{url:"/favicon.ico",revision:"7575757942879713"},{url:"/manifest.json",revision:"7575757942879713"},{url:"/mstile-150x150.png",revision:"7575757942879713"},{url:"/pwa-192x192.png",revision:"7575757942879713"},{url:"/pwa-512x512.png",revision:"7575757942879713"},{url:"/robots.txt",revision:"7575757942879713"},{url:"/safari-pinned-tab.svg",revision:"7575757942879713"},{url:"/zsnout.icns",revision:"7575757942879713"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html")))}));
