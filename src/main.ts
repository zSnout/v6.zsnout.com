import App from "@/App.vue";
import HomeView from "@/views/HomeView.vue";
import { registerSW } from "virtual:pwa-register";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

let router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/:path(.*)", component: () => import("@/views/NotFoundView.vue") },
  ],
});

let app = createApp(App);
app.use(router);
app.mount("#app");

let updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});
