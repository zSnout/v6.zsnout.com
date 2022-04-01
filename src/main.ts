import App from "@/App.vue";
import HomeView from "@/HomeView.vue";
import { registerSW } from "virtual:pwa-register";
import { createApp, defineAsyncComponent } from "vue";
import { GlobalEvents } from "vue-global-events";
import { createRouter, createWebHistory } from "vue-router";

Object.entries = Object.entries || entries;
function entries<K extends string, V>(obj: { [X in K]: V }): [K, V][];
function entries<K extends string, V>(obj: { [X in K]?: V }): [K, V][];
function entries<K extends string, V>(obj: { [X in K]: V }): [K, V][] {
  let keys = Object.keys(obj) as K[];
  return keys.map((key) => [key, obj[key]]);
}

Object.fromEntries = Object.fromEntries || fromEntries;
function fromEntries<K extends string, V>(entries: [K, V][]): { [X in K]: V } {
  return entries.reduce((obj, [key, value]) => {
    obj[key] = value;
    return obj;
  }, {} as { [X in K]: V });
}

export let router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/about",
      component: () => import("@/views/AboutUsView.md"),
    },
    {
      path: "/bingo",
      component: () => import("@/views/BingoBoardView.vue"),
    },
    {
      path: "/bingo/master",
      component: () => import("@/views/BingoMasterView.vue"),
    },
    {
      path: "/blog",
      component: () => import("@/views/blog/BlogArticleListView.vue"),
    },
    {
      path: "/blog/calculating-weekdays",
      component: () => import("@/views/blog/CalculatingWeekdays.md"),
    },
    {
      path: "/blog/divisibility-rules",
      component: () => import("@/views/blog/DivisibilityRules.md"),
    },
    {
      path: "/blog/does-0-equal-1",
      component: () => import("@/views/blog/Does0Equal1.md"),
    },
    {
      path: "/blog/forcing-1089",
      component: () => import("@/views/blog/Forcing1089.md"),
    },
    {
      path: "/blog/github-copilot-is-amazing",
      component: () => import("@/views/blog/GithubCopilotIsAmazingView.md"),
    },
    {
      path: "/blog/infinity-is-minus-one-twelfth",
      component: () => import("@/views/blog/InfinityIsMinusOneTwelfth.md"),
    },
    {
      path: "/blog/what-makes-zsnout-different",
      component: () => import("@/views/blog/WhatMakesZSnoutDifferentView.md"),
    },
    {
      path: "/call/",
      component: () => import("@/views/VideoCallView.vue"),
    },
    {
      path: "/call/:id",
      component: () => import("@/views/VideoCallView.vue"),
    },
    {
      path: "/chess/board",
      redirect:
        "/chess/board/rnbqkbnr_pppppppp_8_8_8_8_PPPPPPPP_RNBQKBNR:w:KQkq:-:0:1",
    },
    {
      path: "/chess/board/:position",
      component: () => import("@/views/chess/StandardChessboardView.vue"),
    },
    {
      path: "/chess/autoflip",
      redirect:
        "/chess/autoflip/rnbqkbnr_pppppppp_8_8_8_8_PPPPPPPP_RNBQKBNR:w:KQkq:-:0:1",
    },
    {
      path: "/chess/autoflip/:position",
      component: () => import("@/views/chess/AutoFlipChessboardView.vue"),
    },
    {
      path: "/chess/random",
      redirect: () =>
        `/chess/random/${Math.random() < 0.5 ? "white" : "black"}`,
    },
    {
      path: "/chess/random/:mode",
      component: () => import("@/views/chess/ChessVersusRandomView.vue"),
    },
    {
      path: "/chess/capture",
      redirect: () =>
        `/chess/capture/${Math.random() < 0.5 ? "white" : "black"}`,
    },
    {
      path: "/chess/capture/:mode",
      component: () => import("@/views/chess/ChessVersusCaptureAIView.vue"),
    },
    {
      path: "/chess/nocapture",
      redirect: () =>
        `/chess/nocapture/${Math.random() < 0.5 ? "white" : "black"}`,
    },
    {
      path: "/chess/nocapture/:mode",
      component: () => import("@/views/chess/ChessVersusNoCaptureAIView.vue"),
    },
    {
      path: "/chess/stockfish",
      redirect: () =>
        `/chess/stockfish/${Math.random() < 0.5 ? "white" : "black"}`,
    },
    {
      path: "/chess/stockfish/:mode",
      component: () => import("@/views/chess/ChessVersusStockfish.vue"),
    },
    {
      path: "/chess/illegal-stockfish",
      redirect: () =>
        `/chess/illegal-stockfish/${Math.random() < 0.5 ? "white" : "black"}`,
    },
    {
      path: "/chess/illegal-stockfish/:mode",
      component: () => import("@/views/chess/IllegalVersusStockfish.vue"),
    },
    {
      path: "/chess/vsbad",
      redirect: () => `/chess/vsbad/${Math.random() < 0.5 ? "white" : "black"}`,
    },
    {
      path: "/chess/vsbad/:mode",
      component: () => import("@/views/chess/ChessVersusBadAIView.vue"),
    },
    {
      path: "/color-remover",
      component: () => import("@/views/ColorRemoverView.vue"),
    },
    {
      path: "/color-remover/:colors",
      component: () => import("@/views/ColorRemoverView.vue"),
    },
    {
      path: "/connect-four",
      component: () => import("@/views/ConnectFourView.vue"),
    },
    {
      path: "/english-is-weird",
      component: () => import("@/views/EnglishIsWeirdView.vue"),
    },
    {
      path: "/fake-gradient",
      redirect: "/fake-gradient/100",
    },
    {
      path: "/fake-gradient/:detail",
      component: () => import("@/views/FakeGradientView.vue"),
    },
    {
      path: "/fake-gradient-2",
      redirect: "/fake-gradient-2/100",
    },
    {
      path: "/fake-gradient-2/:detail",
      component: () => import("@/views/FakeGradient2View.vue"),
    },
    {
      path: "/fractal/presets",
      component: () => import("@/views/FractalPresetsView.vue"),
    },
    {
      path: "/fractal",
      redirect: "/fractal/z^2+c/2/0/50/-2,2,-2,2",
      children: [
        {
          path: "mandelbrot-set",
          redirect: "/fractal/z^2+c",
        },
        {
          path: "multibrot-set",
          redirect: "/fractal/z^4+c",
        },
        {
          path: "burning-ship",
          redirect: "/fractal/abs(z)^2+c",
        },
        {
          path: "feather",
          redirect: "/fractal/z^3%2F(rawsqr(z)+1)+c/10",
        },
        {
          path: "flower",
          redirect: "/fractal/z^2+z+c/2/4",
        },
        {
          path: "raindrop",
          redirect: "/fractal/z^2+1%2Fc",
        },
        {
          path: "telescope",
          redirect: "/fractal/z^2+z+1%2Fc/2/5",
        },
        {
          path: "sunlight",
          redirect: "/fractal/z^2-z+1%2Fc/2/6/50/-4,4,-4,4",
        },
        {
          path: "snowflake",
          redirect: "/fractal/z^3-z^2-z-c/2/4",
        },
        {
          path: "puddles",
          redirect: "/fractal/(z^3+1)%2F(cz^2+1)/2/4/50/-8,8,-8,8",
        },
        {
          path: "mandelball",
          redirect: "/fractal/z-(zzz+z*(c-1)-c)%2F(3zz+c-1)",
        },
        {
          path: "chinese-lantern",
          redirect: "/fractal/1%2F(z%5E4+c+1)",
        },
        {
          path: ":equation",
          redirect({ params: { equation } }) {
            return `/fractal/${encodeURIComponent("" + equation)}/2/0/50/-2,2,-2,2`; // prettier-ignore
          },
          children: [
            {
              path: ":limit",
              redirect({ params: { equation, limit } }) {
                return `/fractal/${encodeURIComponent("" + equation)}/${limit}/0/50/-2,2,-2,2`; // prettier-ignore
              },
              children: [
                {
                  path: ":theme",
                  redirect({ params: { equation, limit, theme } }) {
                    return `/fractal/${encodeURIComponent("" + equation)}/${limit}/${theme}/50/-2,2,-2,2`; // prettier-ignore
                  },
                  children: [
                    {
                      path: ":iterations",
                      // prettier-ignore
                      redirect({ params: { equation, limit, theme, iterations } }) {
                        return `/fractal/${encodeURIComponent("" + equation)}/${limit}/${theme}/${iterations}/-2,2,-2,2`;
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/fractal/:equation/:limit/:theme/:iterations/:coords",
      component: () => import("@/views/FractalView.vue"),
    },
    {
      path: "/frame",
      component: () => import("@/views/FrameOverlayView.vue"),
    },
    {
      path: "/metaballs",
      component: () => import("@/views/MetaballView.vue"),
    },
    {
      path: "/overcolor",
      component: () => import("@/views/OvercolorView.vue"),
    },
    {
      path: "/practice/mult-div",
      component: () => import("@/views/MultDivQuizView.vue"),
    },
    {
      path: "/practice/squares",
      component: () => import("@/views/SquareQuizView.vue"),
    },
    {
      path: "/rainbow-noise",
      redirect: "/rainbow-noise/50",
    },
    {
      path: "/rainbow-noise/:chance",
      component: () => import("@/views/RainbowNoiseView.vue"),
    },
    {
      path: "/storymatic",
      component: () => import("@/views/StorymaticEditorView.vue"),
    },
    {
      path: "/storymatic/:code",
      component: () => import("@/views/StorymaticEditorView.vue"),
    },
    {
      path: "/storymatic-to-javascript",
      component: () => import("@/views/StorymaticJavaScriptView.vue"),
    },
    {
      path: "/storymatic-to-javascript/:code",
      component: () => import("@/views/StorymaticJavaScriptView.vue"),
    },
    {
      path: "/tictactoe",
      component: () => import("@/views/TicTacToeView.vue"),
    },
    {
      path: "/trope-highlighter",
      component: () => import("@/views/TropeHighlighterView.vue"),
    },
    {
      path: "/:path(.*)",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

let Article = defineAsyncComponent(() => import("@/components/Article.vue"));

export let app = createApp(App);
app.component("Article", Article);
app.component("GlobalEvents", GlobalEvents);
app.use(router).mount("#app");

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

let lastEscapeKeyTime = 0;
window.addEventListener("keydown", ({ key }) => {
  if (key == "Escape") {
    if (lastEscapeKeyTime + 1000 > Date.now()) {
      router.push("/");
      lastEscapeKeyTime = 0;
    } else lastEscapeKeyTime = Date.now();
  }
});

let loc = new URL(location.href);
let path = loc.searchParams.get("path");
if (path) router.replace(path);

declare global {
  interface ObjectConstructor {
    entries<K extends string, V>(obj: { [X in K]: V }): [K, V][];
    entries<K extends string, V>(obj: { [X in K]?: V }): [K, V][];
    fromEntries<K extends string, V>(entries: [K, V][]): { [X in K]: V };
  }
}

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Article: typeof Article;
    GlobalEvents: typeof GlobalEvents;
  }
}

let { classList } = document.documentElement;
function applyTheme() {
  try {
    let { theme } = localStorage;

    classList.remove("theme-light", "theme-dark");
    if (theme == "light" || theme == "dark") classList.add(`theme-${theme}`);
  } catch {}
}

applyTheme();
window.addEventListener("storage", applyTheme);
