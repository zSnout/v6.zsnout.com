import MarkdownItKatex from "@traptitech/markdown-it-katex";
import Vue from "@vitejs/plugin-vue";
import VueJSX from "@vitejs/plugin-vue-jsx";
import glob from "glob";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItTOC from "markdown-it-toc-done-right";
import { fileURLToPath, URL } from "url";
import { promisify } from "util";
import type { UserConfigExport } from "vite";
import ViteMD from "vite-plugin-md";
import { VitePWA } from "vite-plugin-pwa";

let publicDir = fileURLToPath(new URL("./public", import.meta.url));
let revision = Math.random().toString().slice(2);

export default new Promise<UserConfigExport>(async (resolve) =>
  resolve({
    publicDir,
    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/],
        template: {
          compilerOptions: {
            // Required because Vue seems to think that an `<a>` tag from Markdown is a custom element.
            isNativeTag: (tag) => tag.toLowerCase() == tag,
          },
        },
      }),
      VueJSX(),
      ViteMD({
        wrapperComponent: "Article",
        markdownItSetup(markdown) {
          markdown
            .use(MarkdownItKatex, { throwOnError: false })
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
          additionalManifestEntries: await promisify(glob)(
            `${publicDir}/**/*`
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
);
