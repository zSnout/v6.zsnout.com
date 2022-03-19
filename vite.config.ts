import Vue from "@vitejs/plugin-vue";
import VueJSX from "@vitejs/plugin-vue-jsx";
import glob from "glob";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItTOC from "markdown-it-toc-done-right";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import ViteMD from "vite-plugin-md";
import { VitePWA } from "vite-plugin-pwa";

let publicDir = fileURLToPath(new URL("./public", import.meta.url));
let revision = Math.random().toString().slice(2);

export default new Promise(async (resolve) =>
  resolve(
    defineConfig({
      publicDir: publicDir,
      plugins: [
        Vue({ include: [/\.vue$/, /\.md$/] }),
        VueJSX(),
        ViteMD({
          markdownItSetup(markdown) {
            markdown
              .use(MarkdownItAnchor)
              .use(MarkdownItTOC, { listType: "ul" });
          },
        }),
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
