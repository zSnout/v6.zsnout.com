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
import type { ManifestEntry } from "workbox-build";

let publicDir = fileURLToPath(new URL("./public", import.meta.url));
if (publicDir.endsWith("/")) publicDir = publicDir.slice(0, -1);
let revision = Math.random().toString().slice(2);

async function getPublicEntries() {
  let entries: ManifestEntry[] = [];
  let files = await promisify(glob)(`${publicDir}/**/*`);

  for (let file of files) {
    let relativePath = file.slice(publicDir.length);
    if (relativePath.includes("404.html")) continue;
    entries.push({ url: relativePath, revision });
  }

  return entries;
}

export default new Promise<UserConfigExport>(async (resolve) =>
  resolve({
    publicDir,
    plugins: [
      Vue({ include: [/\.vue$/, /\.md$/] }),
      VueJSX(),
      ViteMD({
        wrapperComponent: "ZArticle",
        markdownItSetup(markdown) {
          markdown
            .use(MarkdownItKatex, { throwOnError: false })
            .use(MarkdownItAnchor)
            .use(MarkdownItTOC, { listType: "ul" });
        },
      }),
      VitePWA({
        workbox: {
          navigateFallback: "/index.html",
          cleanupOutdatedCaches: true,
          sourcemap: false,
          clientsClaim: true,
          skipWaiting: true,
          additionalManifestEntries: await getPublicEntries(),
          maximumFileSizeToCacheInBytes: 1024 ** 5,
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
