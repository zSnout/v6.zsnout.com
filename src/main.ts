import App from "@/App.vue";
import HomeView from "@/views/HomeView.vue";
import { registerSW } from "virtual:pwa-register";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

export let router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/fractal", redirect: "/fractal/-2,2,-2,2" },
    {
      path: "/fractal/:coords",
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
