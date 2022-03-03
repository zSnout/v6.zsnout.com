/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { CSSProperties, Ref } from "vue";

declare global {
  type StyleValueRefs = {
    [K in keyof CSSProperties]: CSSProperties[K] | Ref<CSSProperties[K]>;
  };

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{
      readonly outcome: "accepted" | "dismissed";
      readonly platform: string;
    }>;

    prompt(): Promise<void>;
  }

  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}
