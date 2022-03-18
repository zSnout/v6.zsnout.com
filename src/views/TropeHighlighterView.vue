<script setup lang="tsx">
  import { getCookie, setCookie } from "@/assets/cookie";
  import { alert } from "@/assets/modal";
  import { onMounted, onUnmounted, ref } from "vue";
  import DocumentDisplay from "../components/DocumentDisplay.vue";
  import NavLink from "../components/NavLink.vue";

  let textbox = ref<HTMLDivElement | null>(null);

  /** The possible names for Torah tropes. */
  type TropeNames = keyof typeof Tropes;

  /** A list of Torah tropes. */
  let Tropes = {
    Etnachta: "ב֑",
    SofPassuk: "סֽ",
    Segol: "ב֒",
    Shalshelet: "ב֓",
    ZakefKatan: "ב֔",
    ZakefGadol: "ב֕",
    Tifcha: "ב֖",
    Rivia: "ב֗",
    Zarka: "ב֮",
    Pashta: "ב֙",
    Yetiv: "ב֚",
    Tevir: "ב֛",
    Pazer: "ב֡",
    QarneFarah: "ב֟",
    TelishaGedola: "ב֠",
    Geresh: "ב֜",
    Gershayim: "ב֞",
    Mercha: "ב֥",
    Munach: "ב֣",
    Mahpach: "ב֤",
    Darga: "ב֧",
    Kadma: "ב֨",
    TelishaKetana: "ב֩",
    MerchaKefula: "ב֦",
    YerachBenYomo: "ב֪",
  };

  for (let [key, val] of Object.entries(Tropes)) Tropes[key] = val[1];
  let tropes = Object.entries(Tropes);

  function tropeOf(word: string) {
    let lastIndex = -1;
    let lastName: TropeNames | `Munach${TropeNames}` | null = null;
    for (const [name, trope] of tropes) {
      if (word.indexOf(trope) > lastIndex) {
        lastIndex = word.indexOf(trope);
        lastName = name;
      }
    }

    return lastName;
  }

  function onPaste(event: ClipboardEvent) {
    event.preventDefault();
    let data = event.clipboardData!;
    if (!data) return;

    let text = data.getData("text/plain");
    if (!text) return;

    // Modified from https://htmldom.dev/paste-as-plain-text/

    let selection = document.getSelection()!;
    if (!selection) return;

    let range = selection.getRangeAt(0);
    range.deleteContents();

    let textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.selectNodeContents(textNode);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);

    onInput();
    highlight();
  }

  function highlight() {
    if (!textbox.value) return;
    let text = [...textbox.value.childNodes]
      .map((e) => (e.textContent || "").trim())
      .join(" ");
    if (!text) return;

    let span = document.createElement("span");
    span.textContent = text.trim().replace(/\s+/g, " ");

    let words = span.innerHTML.split(" ");
    let initial = words.map((word) => ({ word, trope: tropeOf(word) })); // First check for tropes
    let final = initial.map(({ word, trope }, index, array) => {
      // Second check to ensure that Munach____ tropes are captured properly
      if (trope == "Munach" && array[index + 1].trope)
        return { word, trope: `Munach${array[index + 1].trope}` };
      else return { word, trope: trope as string };
    });

    let elements = final.map(({ word, trope }) => {
      let element = document.createElement("span");
      element.textContent = word;
      element.classList.add(trope);
      return element;
    });

    let nodes: (Node | string)[] = [elements[0]];
    for (let el of elements.slice(1)) {
      nodes.push(" ", el);
    }

    textbox.value.replaceChildren(...nodes);
  }

  function onInput() {
    if (!textbox.value) return;
    textbox.value.classList.toggle("empty", !!textbox.value.textContent);
  }

  onMounted(() => {
    onInput();
    document.documentElement.classList.add("theme-light");

    if (getCookie("hasVisitedTropeHighlighter") != "1")
      alert(
        "Hey! If you're using dark mode, you might notice that our trope highlighter always uses light mode. This is to allow for a better printing and screenshot experience by default."
      ).then(() => setCookie("hasVisitedTropeHighlighter", "1"));
  });

  onUnmounted(() => document.documentElement.classList.remove("theme-light"));
</script>

<template>
  <DocumentDisplay explicit-height>
    <template #nav>
      <NavLink @click="highlight">Highlight Tropes</NavLink>
    </template>

    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500&display=swap"
    />

    <div
      contenteditable
      class="textbox empty"
      ref="textbox"
      role="textbox"
      @paste="onPaste"
      @input="onInput"
    />
  </DocumentDisplay>
</template>

<style scoped lang="scss">
  @use "@/assets/util.scss" as *;

  $tropes: (
    Etnachta: #38761d40,
    SofPassuk: #5b0f0040,
    Segol: #0097a740,
    Shalshelet: none,
    ZakefKatan: #9900ff40,
    ZakefGadol: #1b00af40,
    Tifcha: #ff000040,
    Rivia: #0000ff40,
    Zarka: #d3ff0040,
    Pashta: #00ffff40,
    Yetiv: #ffff0040,
    Tevir: #00008040,
    Pazer:
      linear-gradient(
        110deg,
        #ff000040,
        #ffff0040,
        #00ff0040,
        #0000ff40,
        #ff00ff40
      ),
    QarneFarah: none,
    TelishaGedola: #90909040,
    Geresh: #7f600040,
    Gershayim: #ff00ff40,
    Mercha: #ff990040,
    Munach: none,
    Mahpach: #ffff0040,
    Darga: #98000040,
    Kadma: #00ffff40,
    TelishaKetana: #90909040,
    MerchaKefula: none,
    YerachBenYomo: none,
    MunachEtnachta: #00ff0040,
    MunachSofPassuk: none,
    MunachSegol: none,
    MunachShalshelet: none,
    MunachZakefKatan: #cb7eff40,
    MunachZakefGadol: none,
    MunachTifcha: none,
    MunachRivia: #6d9eeb40,
    MunachZarka: #69800040,
    MunachPashta: none,
    MunachYetiv: none,
    MunachTevir: none,
    MunachPazer: none,
    MunachQarneFarah: none,
    MunachTelishaGedola: #00000040,
    MunachGeresh: none,
    MunachGershayim: none,
    MunachMercha: none,
    MunachMunach: none,
    MunachMahpach: none,
    MunachDarga: none,
    MunachKadma: none,
    MunachTelishaKetana: #00000040,
    MunachMerchaKefula: none,
    MunachYerachBenYomo: none,
  );

  .textbox {
    &:not(.empty)::before {
      content: "Enter Hebrew with tropes here";
    }

    height: 100%;
    overflow: hidden auto;
    font-size: 3em;
    font-family: "Frank Ruhl Libre", "Times New Roman", serif;
    line-height: 1.5em;
    direction: rtl;

    @each $trope, $color in $tropes {
      :deep() .#{$trope} {
        background: $color;
      }
    }

    :deep() span {
      padding: 0.125em;
      margin: 0 -0.125em;
      white-space: nowrap;
    }

    @include focus {
      outline: none;
    }
  }
</style>
