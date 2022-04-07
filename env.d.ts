/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import { CSSProperties, Ref, Component } from "vue";
import { ChessInstance } from "chess.js";

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

  declare module "*.md" {
    const file: Component;
    export default file;
  }
}

declare module "ace-builds" {
  export function define(
    name: string,
    deps: string[],
    factory: (...args: any[]) => void
  ): void;
}

// This is a temporary fix because @types/chess.js hasn't updated to support v0.13 yet.
declare module "chess.js" {
  export interface Chess13Instance
    extends Omit<
      ChessInstance,
      | "WHITE"
      | "BLACK"
      | "PAWN"
      | "KNIGHT"
      | "BISHOP"
      | "ROOK"
      | "QUEEN"
      | "KING"
      | "SQUARES"
      | "FLAGS"
    > {}

  export const Chess: {
    new (fen?: string): Chess13Instance;
    (fen?: string): Chess13Instance;
  };

  export const WHITE: "w";
  export const BLACK: "b";

  export const PAWN: "p";
  export const KNIGHT: "n";
  export const BISHOP: "b";
  export const ROOK: "r";
  export const QUEEN: "q";
  export const KING: "k";

  export const FlAGS: {
    BIG_PAWN: "b";
    CAPTURE: "c";
    EP_CAPTURE: "e";
    KSIDE_CASTLE: "k";
    NORMAL: "n";
    PROMOTION: "p";
    QSIDE_CASTLE: "q";
  };
}
