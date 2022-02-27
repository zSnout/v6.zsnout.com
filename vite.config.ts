import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VitePWA({
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      devOptions: { enabled: false },
      workbox: { cleanupOutdatedCaches: true },
      manifest: false,
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
