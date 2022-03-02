/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { CSSProperties, Ref } from "vue";

declare global {
  declare type StyleValueRefs = {
    [K in keyof CSSProperties]: CSSProperties[K] | Ref<CSSProperties[K]>;
  };
}
