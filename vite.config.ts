import MarkdownItKatex from "@traptitech/markdown-it-katex";
import Vue from "@vitejs/plugin-vue";
import VueJSX from "@vitejs/plugin-vue-jsx";
import glob from "glob";
import MarkdownItAnchor from "markdown-it-anchor";
import MarkdownItTOC from "markdown-it-toc-done-right";
import { fileURLToPath, URL } from "url";
import type { UserConfigExport } from "vite";
import ViteMD from "vite-plugin-md";
import { VitePWA } from "vite-plugin-pwa";

let publicDir = fileURLToPath(new URL("./public", import.meta.url));
let revision = Math.random().toString().slice(2);

let mathMLElements =
  "math maction maligngroup malignmark menclose merror mfenced mfrac mi mlongdiv mmultiscripts mn mo mover mpadded mphantom mroot mrow ms mscarries mscarry mscarries msgroup mstack mlongdiv msline mstack mspace msqrt msrow mstack mstack mstyle msub msup msubsup mtable mtd mtext mtr munder munderover semantics annotation math mi mn mo ms mspace mtext menclose merror mfenced mfrac mpadded mphantom mroot mrow msqrt mstyle mmultiscripts mover mprescripts msub msubsup msup munder munderover none maligngroup malignmark mtable mtd mtr mlongdiv mscarries mscarry msgroup msline msrow mstack maction annotation semantics".split(
    " "
  );

export default new Promise<UserConfigExport>(async (resolve) =>
  resolve({
    publicDir: publicDir,
    plugins: [
      Vue({
        include: [/\.vue$/, /\.md$/],
        template: {
          compilerOptions: {
            isCustomElement: (tag) => mathMLElements.includes(tag),
          },
        },
      }),
      VueJSX(),
      ViteMD({
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
);
