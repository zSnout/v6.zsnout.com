if(!self.define){let s,e={};const i=(i,l)=>(i=new URL(i+".js",l).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(l,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const a=s=>i(s,n),o={module:{uri:n},exports:u,require:a};e[n]=Promise.all(l.map((s=>o[s]||a(s)))).then((s=>(r(...s),u)))}}define(["./workbox-c7240f55"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"404.html",revision:"d95150021d370aba800d3beb3b8e944a"},{url:"assets/AboutUsView.6e1acfe7.js",revision:null},{url:"assets/Article.749d81fd.css",revision:null},{url:"assets/Article.84956f27.js",revision:null},{url:"assets/AutoFlipChessboardView.40d6af50.js",revision:null},{url:"assets/BingoBoardView.52798ab1.js",revision:null},{url:"assets/BingoBoardView.876d6740.css",revision:null},{url:"assets/BingoMasterView.62e1ffaa.js",revision:null},{url:"assets/BingoMasterView.e5f59fc3.css",revision:null},{url:"assets/BlogArticleListView.6d11a99c.js",revision:null},{url:"assets/CalculatingWeekdays.f35e4c73.js",revision:null},{url:"assets/ChessVersusAI.07efdb91.js",revision:null},{url:"assets/ChessVersusBadAIView.844f7622.js",revision:null},{url:"assets/ChessVersusCaptureAIView.a8a6a2f3.js",revision:null},{url:"assets/ChessVersusNoCaptureAIView.f2004be0.js",revision:null},{url:"assets/ChessVersusRandomView.24fcdd0e.js",revision:null},{url:"assets/ChessVersusStockfish.b75e101e.js",revision:null},{url:"assets/ColorRemoverView.9321adc6.js",revision:null},{url:"assets/ConnectFourView.c3d6cf17.css",revision:null},{url:"assets/ConnectFourView.debe779d.js",revision:null},{url:"assets/cookie.648245ab.js",revision:null},{url:"assets/DivisibilityRules.45c652bb.js",revision:null},{url:"assets/Does0Equal1.3bc7ac54.js",revision:null},{url:"assets/EnglishIsWeirdView.360cc8ee.css",revision:null},{url:"assets/EnglishIsWeirdView.a82e76fd.js",revision:null},{url:"assets/FakeGradient2View.42bb286b.js",revision:null},{url:"assets/FakeGradientView.96539f28.js",revision:null},{url:"assets/Forcing1089.cbebb358.js",revision:null},{url:"assets/FractalPresetsView.1c04ea66.js",revision:null},{url:"assets/FractalView.f5222c25.js",revision:null},{url:"assets/FrameOverlayView.0e91aabc.css",revision:null},{url:"assets/FrameOverlayView.769ed667.js",revision:null},{url:"assets/FullscreenCanvas.da665f5e.js",revision:null},{url:"assets/FullscreenDisplay.2736bd36.css",revision:null},{url:"assets/FullscreenDisplay.81705755.js",revision:null},{url:"assets/GithubCopilotIsAmazingView.b17a1197.js",revision:null},{url:"assets/IllegalVersusStockfish.af86b9d7.js",revision:null},{url:"assets/index.26979f72.css",revision:null},{url:"assets/index.686ed3b0.js",revision:null},{url:"assets/InfinityIsMinusOneTwelfth.f779581f.js",revision:null},{url:"assets/LegalMoveChessboard.36e5065c.js",revision:null},{url:"assets/LegalMoveChessboard.5236be52.css",revision:null},{url:"assets/MathemagicalTricks.0a2d9916.js",revision:null},{url:"assets/MetaballView.8b632aea.js",revision:null},{url:"assets/MultDivQuizView.b6927d51.js",revision:null},{url:"assets/NotFoundView.d5b58104.js",revision:null},{url:"assets/OvercolorView.7b7c580b.js",revision:null},{url:"assets/Quiz.19fbb481.css",revision:null},{url:"assets/Quiz.b2951b4e.js",revision:null},{url:"assets/RainbowNoiseView.e89d020c.js",revision:null},{url:"assets/SquareQuizView.6e3d2ce0.js",revision:null},{url:"assets/StandardChessboardView.5cef574e.js",revision:null},{url:"assets/stockfish.0823b611.js",revision:null},{url:"assets/stockfish.3ac7f8d4.js",revision:null},{url:"assets/storymatic.3ba3a6d9.js",revision:null},{url:"assets/storymatic.ef4fb9e9.css",revision:null},{url:"assets/StorymaticEditorView.d0182440.js",revision:null},{url:"assets/StorymaticEditorView.f6181850.css",revision:null},{url:"assets/StorymaticJavaScriptView.75cd9a15.js",revision:null},{url:"assets/StorymaticJavaScriptView.93b04b4d.css",revision:null},{url:"assets/TicTacToeView.0fc8f914.js",revision:null},{url:"assets/TicTacToeView.3cb8349f.css",revision:null},{url:"assets/TropeHighlighterView.0b57f035.css",revision:null},{url:"assets/TropeHighlighterView.b15eae47.js",revision:null},{url:"assets/VideoCallView.2f861bb2.js",revision:null},{url:"assets/VideoCallView.3e7a6383.css",revision:null},{url:"assets/WebGL2Canvas.05c5fc30.css",revision:null},{url:"assets/WebGL2Canvas.8d5a9006.js",revision:null},{url:"assets/WhatMakesZSnoutDifferentView.d57000ed.js",revision:null},{url:"index.html",revision:"8a39ffaaf663cd54214bcf79b60535fa"},{url:"/android-chrome-192x192.png",revision:"8788833194419763"},{url:"/android-chrome-512x512.png",revision:"8788833194419763"},{url:"/apple-touch-icon.png",revision:"8788833194419763"},{url:"/browserconfig.xml",revision:"8788833194419763"},{url:"/CNAME",revision:"8788833194419763"},{url:"/favicon-16x16.png",revision:"8788833194419763"},{url:"/favicon-32x32.png",revision:"8788833194419763"},{url:"/favicon.ico",revision:"8788833194419763"},{url:"/manifest.json",revision:"8788833194419763"},{url:"/mstile-150x150.png",revision:"8788833194419763"},{url:"/pwa-192x192.png",revision:"8788833194419763"},{url:"/pwa-512x512.png",revision:"8788833194419763"},{url:"/robots.txt",revision:"8788833194419763"},{url:"/safari-pinned-tab.svg",revision:"8788833194419763"},{url:"/zsnout.icns",revision:"8788833194419763"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"},{url:"manifest.webmanifest",revision:"162b6f9e02f9aed051cf6a04f955c3d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("/index.html")))}));
