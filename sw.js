if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>i(s,n),o={module:{uri:n},exports:u,require:a};e[n]=Promise.all(l.map((s=>o[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-c7240f55"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"d95150021d370aba800d3beb3b8e944a"},{url:"assets/AboutUsView.6abaeacb.js",revision:null},{url:"assets/Article.749d81fd.css",revision:null},{url:"assets/Article.f617f49b.js",revision:null},{url:"assets/AutoFlipChessboardView.685003c7.js",revision:null},{url:"assets/BingoBoardView.876d6740.css",revision:null},{url:"assets/BingoBoardView.92958921.js",revision:null},{url:"assets/BingoMasterView.1fbcc664.js",revision:null},{url:"assets/BingoMasterView.e5f59fc3.css",revision:null},{url:"assets/BlogArticleListView.6a48b2ae.js",revision:null},{url:"assets/CalculatingWeekdays.990ad52b.js",revision:null},{url:"assets/ChessVersusAI.c31f1890.js",revision:null},{url:"assets/ChessVersusBadAIView.ec9cc3eb.js",revision:null},{url:"assets/ChessVersusCaptureAIView.36ffedd0.js",revision:null},{url:"assets/ChessVersusNoCaptureAIView.c7626828.js",revision:null},{url:"assets/ChessVersusRandomView.5a73a5b1.js",revision:null},{url:"assets/ChessVersusStockfish.67aee07b.js",revision:null},{url:"assets/ColorRemoverView.9f5474b0.js",revision:null},{url:"assets/ConnectFourView.400e6807.js",revision:null},{url:"assets/ConnectFourView.c3d6cf17.css",revision:null},{url:"assets/cookie.648245ab.js",revision:null},{url:"assets/DivisibilityRules.23ff6ca7.js",revision:null},{url:"assets/Does0Equal1.428fb7ea.js",revision:null},{url:"assets/EnglishIsWeirdView.360cc8ee.css",revision:null},{url:"assets/EnglishIsWeirdView.8c69b7d9.js",revision:null},{url:"assets/FakeGradient2View.acb34d86.js",revision:null},{url:"assets/FakeGradientView.f06d3628.js",revision:null},{url:"assets/Forcing1089.cdf3fd7a.js",revision:null},{url:"assets/FractalPresetsView.f947286f.js",revision:null},{url:"assets/FractalView.349156d6.js",revision:null},{url:"assets/FrameOverlayView.0e91aabc.css",revision:null},{url:"assets/FrameOverlayView.a6ba2dc8.js",revision:null},{url:"assets/FullscreenCanvas.0c8704e8.js",revision:null},{url:"assets/FullscreenDisplay.2736bd36.css",revision:null},{url:"assets/FullscreenDisplay.8c645dea.js",revision:null},{url:"assets/GithubCopilotIsAmazingView.ab337409.js",revision:null},{url:"assets/IllegalVersusStockfish.e9a39b00.js",revision:null},{url:"assets/index.26979f72.css",revision:null},{url:"assets/index.fc523b5b.js",revision:null},{url:"assets/InfinityIsMinusOneTwelfth.3b652c96.js",revision:null},{url:"assets/LegalMoveChessboard.5236be52.css",revision:null},{url:"assets/LegalMoveChessboard.f3472b02.js",revision:null},{url:"assets/MathemagicalTricks.f2eac735.js",revision:null},{url:"assets/MetaballView.02327771.js",revision:null},{url:"assets/MultDivQuizView.2dbd8adb.js",revision:null},{url:"assets/NotFoundView.f56e79fe.js",revision:null},{url:"assets/OvercolorView.150157b9.js",revision:null},{url:"assets/Quiz.19fbb481.css",revision:null},{url:"assets/Quiz.2c44852b.js",revision:null},{url:"assets/RainbowNoiseView.a58c0c07.js",revision:null},{url:"assets/SquareQuizView.e2b16d68.js",revision:null},{url:"assets/StandardChessboardView.fe2ae46c.js",revision:null},{url:"assets/stockfish.0823b611.js",revision:null},{url:"assets/stockfish.3ac7f8d4.js",revision:null},{url:"assets/storymatic.4559b3c6.js",revision:null},{url:"assets/storymatic.ef4fb9e9.css",revision:null},{url:"assets/StorymaticEditorView.f6181850.css",revision:null},{url:"assets/StorymaticEditorView.fc10bfe4.js",revision:null},{url:"assets/StorymaticJavaScriptView.93b04b4d.css",revision:null},{url:"assets/StorymaticJavaScriptView.cc2b1440.js",revision:null},{url:"assets/TicTacToeView.3cb8349f.css",revision:null},{url:"assets/TicTacToeView.6880f3b2.js",revision:null},{url:"assets/TropeHighlighterView.0b57f035.css",revision:null},{url:"assets/TropeHighlighterView.dcd71ec0.js",revision:null},{url:"assets/VideoCallView.3e7a6383.css",revision:null},{url:"assets/VideoCallView.45f148d1.js",revision:null},{url:"assets/WebGL2Canvas.05c5fc30.css",revision:null},{url:"assets/WebGL2Canvas.4c76d447.js",revision:null},{url:"assets/WhatMakesZSnoutDifferentView.eb1bbb8a.js",revision:null},{url:"index.html",revision:"a1b480082bcc2b4262d44c20b0230abe"},{url:"/android-chrome-192x192.png",revision:"0004286575689176342"},{url:"/android-chrome-512x512.png",revision:"0004286575689176342"},{url:"/apple-touch-icon.png",revision:"0004286575689176342"},{url:"/browserconfig.xml",revision:"0004286575689176342"},{url:"/CNAME",revision:"0004286575689176342"},{url:"/favicon-16x16.png",revision:"0004286575689176342"},{url:"/favicon-32x32.png",revision:"0004286575689176342"},{url:"/favicon.ico",revision:"0004286575689176342"},{url:"/manifest.json",revision:"0004286575689176342"},{url:"/mstile-150x150.png",revision:"0004286575689176342"},{url:"/pwa-192x192.png",revision:"0004286575689176342"},{url:"/pwa-512x512.png",revision:"0004286575689176342"},{url:"/robots.txt",revision:"0004286575689176342"},{url:"/safari-pinned-tab.svg",revision:"0004286575689176342"},{url:"/zsnout.icns",revision:"0004286575689176342"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html")))}));