if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>i(s,n),o={module:{uri:n},exports:u,require:a};e[n]=Promise.all(l.map((s=>o[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-c7240f55"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"d95150021d370aba800d3beb3b8e944a"},{url:"assets/AboutUsView.d3d508c2.js",revision:null},{url:"assets/Article.0acb7b3b.js",revision:null},{url:"assets/Article.e928db87.css",revision:null},{url:"assets/AutoFlipChessboardView.528fc30f.js",revision:null},{url:"assets/BingoBoardView.876d6740.css",revision:null},{url:"assets/BingoBoardView.bfef4362.js",revision:null},{url:"assets/BingoMasterView.27906de3.js",revision:null},{url:"assets/BingoMasterView.e5f59fc3.css",revision:null},{url:"assets/BlogArticleListView.53c4e48a.js",revision:null},{url:"assets/CalculatingWeekdays.60f636b4.js",revision:null},{url:"assets/ChessVersusAI.15067017.js",revision:null},{url:"assets/ChessVersusBadAIView.baabd84b.js",revision:null},{url:"assets/ChessVersusCaptureAIView.8b6e1093.js",revision:null},{url:"assets/ChessVersusNoCaptureAIView.5630fa17.js",revision:null},{url:"assets/ChessVersusRandomView.201cf33a.js",revision:null},{url:"assets/ChessVersusStockfish.cce6c5a6.js",revision:null},{url:"assets/ColorRemoverView.5f0e75a9.js",revision:null},{url:"assets/ConnectFourView.04ca1432.js",revision:null},{url:"assets/ConnectFourView.c3d6cf17.css",revision:null},{url:"assets/cookie.648245ab.js",revision:null},{url:"assets/DivisibilityRules.0fe1428f.js",revision:null},{url:"assets/Does0Equal1.b207ff0b.js",revision:null},{url:"assets/EnglishIsWeirdView.360cc8ee.css",revision:null},{url:"assets/EnglishIsWeirdView.3de5848b.js",revision:null},{url:"assets/FakeGradient2View.e26f1530.js",revision:null},{url:"assets/FakeGradientView.56256b46.js",revision:null},{url:"assets/Forcing1089.fbe5489c.js",revision:null},{url:"assets/FractalPresetsView.d19d9b38.js",revision:null},{url:"assets/FractalView.1c705b79.js",revision:null},{url:"assets/FrameOverlayView.0e91aabc.css",revision:null},{url:"assets/FrameOverlayView.f1ead7a0.js",revision:null},{url:"assets/FullscreenCanvas.19df47ac.js",revision:null},{url:"assets/FullscreenDisplay.2736bd36.css",revision:null},{url:"assets/FullscreenDisplay.e61a3ee1.js",revision:null},{url:"assets/GithubCopilotIsAmazingView.b4536cc8.js",revision:null},{url:"assets/IllegalVersusStockfish.9726777a.js",revision:null},{url:"assets/index.26979f72.css",revision:null},{url:"assets/index.b9f91152.js",revision:null},{url:"assets/InfinityIsMinusOneTwelfth.e58fee91.js",revision:null},{url:"assets/LegalMoveChessboard.5236be52.css",revision:null},{url:"assets/LegalMoveChessboard.52c53f8d.js",revision:null},{url:"assets/MathemagicalTricks.40125276.js",revision:null},{url:"assets/MetaballView.af03791f.js",revision:null},{url:"assets/MultDivQuizView.8e61d37a.js",revision:null},{url:"assets/NotFoundView.634c0066.js",revision:null},{url:"assets/OvercolorView.cd698079.js",revision:null},{url:"assets/Quiz.19fbb481.css",revision:null},{url:"assets/Quiz.5e71ad4e.js",revision:null},{url:"assets/RainbowNoiseView.bba4a48a.js",revision:null},{url:"assets/SquareQuizView.83ff5f17.js",revision:null},{url:"assets/StandardChessboardView.8895a400.js",revision:null},{url:"assets/stockfish.0823b611.js",revision:null},{url:"assets/storymatic.1570ecb1.js",revision:null},{url:"assets/storymatic.ef4fb9e9.css",revision:null},{url:"assets/StorymaticEditorView.2eaa3b1a.js",revision:null},{url:"assets/StorymaticEditorView.f6181850.css",revision:null},{url:"assets/StorymaticJavaScriptView.4e550428.js",revision:null},{url:"assets/StorymaticJavaScriptView.93b04b4d.css",revision:null},{url:"assets/TicTacToeView.3cb8349f.css",revision:null},{url:"assets/TicTacToeView.c1165691.js",revision:null},{url:"assets/TropeHighlighterView.0b57f035.css",revision:null},{url:"assets/TropeHighlighterView.361e51e8.js",revision:null},{url:"assets/VideoCallView.3e7a6383.css",revision:null},{url:"assets/VideoCallView.ede3baa8.js",revision:null},{url:"assets/WebGL2Canvas.05c5fc30.css",revision:null},{url:"assets/WebGL2Canvas.1abc219d.js",revision:null},{url:"assets/WhatMakesZSnoutDifferentView.9daa3d17.js",revision:null},{url:"index.html",revision:"9cdb9ccb5bdff2a9d8826b7a2afffdda"},{url:"404.html",revision:"9080936720204178"},{url:"android-chrome-192x192.png",revision:"9080936720204178"},{url:"android-chrome-512x512.png",revision:"9080936720204178"},{url:"apple-touch-icon.png",revision:"9080936720204178"},{url:"browserconfig.xml",revision:"9080936720204178"},{url:"CNAME",revision:"9080936720204178"},{url:"favicon-16x16.png",revision:"9080936720204178"},{url:"favicon-32x32.png",revision:"9080936720204178"},{url:"favicon.ico",revision:"9080936720204178"},{url:"manifest.json",revision:"9080936720204178"},{url:"mstile-150x150.png",revision:"9080936720204178"},{url:"pwa-192x192.png",revision:"9080936720204178"},{url:"pwa-512x512.png",revision:"9080936720204178"},{url:"robots.txt",revision:"9080936720204178"},{url:"safari-pinned-tab.svg",revision:"9080936720204178"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html")))}));
