import App from "@/App.vue";
import HomeView from "@/views/HomeView.vue";
import { registerSW } from "virtual:pwa-register";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

export let router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    {
      path: "/practice/mult-div",
      component: () => import("@/views/MultDivQuiz.vue"),
    },
    {
      path: "/fractal",
      redirect: "/fractal/z^2+c/2/0/50/-2,2,-2,2",
      children: [
        { path: "mandelbrot-set", redirect: "/fractal/z^2+c" },
        { path: "multibrot-set", redirect: "/fractal/z^3+c" },
        { path: "burning-ship", redirect: "/fractal/abs(z)^2+c" },
        { path: "feather", redirect: "/fractal/z^3%2F(rawsqr(z)+1)+c/10" },
        { path: "flower", redirect: "/fractal/z^2+z+c" },
        { path: "raindrop", redirect: "/fractal/z^2+1%2Fc" },
        { path: "telescope", redirect: "/fractal/z^2+z+1%2Fc" },
        { path: "sunlight", redirect: "/fractal/z^2-z+1%2Fc" },
        { path: "snowflake", redirect: "/fractal/z^3-z^2-z-c" },
        { path: "puddles", redirect: "/fractal/(z^3+1)%2F(cz^2+1)" },
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
            },
          ],
        },
      ],
    },
    {
      path: "/fractal/:equation/:limit/:theme/:iterations/:coords",
      component: () => import("@/views/FractalView.vue"),
    },
    { path: "/:path(.*)", component: () => import("@/views/NotFoundView.vue") },
  ],
});

let app = createApp(App);
app.use(router);
app.mount("#app");

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
