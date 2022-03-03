import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import glob from "glob";

let publicDir = fileURLToPath(new URL("./public", import.meta.url));
let revision = Math.random().toString().slice(2);
export default new Promise(async (resolve) =>
  resolve(
    defineConfig({
      publicDir: publicDir,
      plugins: [
        vue(),
        vueJsx(),
        VitePWA({
          devOptions: { enabled: false },
          manifest: false,
          workbox: {
            navigateFallback: "/index.html",
            cleanupOutdatedCaches: true,
            sourcemap: false,
            clientsClaim: true,
            skipWaiting: true,
            additionalManifestEntries: await new Promise<string[]>((resolve) =>
              glob(`${publicDir}/**/*`, (_err, matches) => resolve(matches))
            ).then((matches) =>
              matches.map((url) => ({
                url: url.slice(publicDir.length + 1),
                revision,
              }))
            ),
          },
        }),
      ],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
    })
  )
);
