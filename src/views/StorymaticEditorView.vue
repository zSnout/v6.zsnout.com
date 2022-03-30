<script lang="ts" setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import NavLink from "@/components/NavLink.vue";
  import StorymaticEditor from "@/components/StorymaticEditor.vue";
  import StorymaticViewer from "@/components/StorymaticViewer.vue";
  import { router } from "@/main";
  import type { Ace } from "ace-builds";
  import { onUnmounted, ref } from "vue";
  import { useRoute } from "vue-router";

  function encode(text: string) {
    try {
      return btoa(text.replace(/[^\x00-\xff]+/g, ""))
        .replace(/\+/g, "_")
        .replace(/\//g, "-")
        .replace(/=/g, "$");
    } catch {
      return "";
    }
  }

  function decode(text: string) {
    try {
      return atob(
        text.replace(/_/g, "+").replace(/-/g, "/").replace(/\$/g, "=")
      );
    } catch {
      return "";
    }
  }

  let _editor: Ace.Editor;
  function onInit(editor: Ace.Editor) {
    _editor = editor;
    editor.commands.addCommand({
      name: "run",
      bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },
      exec: run,
    });
  }

  function run() {
    code.value = `#${Math.random()}\n${_editor.getValue()}`;
  }

  let story = ref(
    decode("" + (useRoute().params.code || "")) ||
      `# After working on a project, bookmark your page to save your code.

# Surround text with quotation marks to print it.
"Welcome to my program!"



# Use @menu to create a menu the user can select from.
# Add @option blocks to create menu items.

@menu "What is your favorite ice cream flavor?"

  @option "Chocolate"
    "Well, I think that's an amazing flavor!"

  @option "Vanilla"
    "I like vanilla too!"

  @option "Brussel sprout"
    "You've got to be joking..."

  @option "Other"
    $flavor = @input "What flavor do you like?"
    "Well, I guess |$flavor| is good too.
`
  );
  let code = ref(
    '"Press Ctrl-Enter or Cmd-Enter while in the editor to run your program."'
  );

  let interval = setInterval(() => {
    router.replace(`/storymatic/${encode(story.value)}`);
  }, 5000);

  onUnmounted(() => clearInterval(interval));
</script>

<template>
  <DocumentDisplay explicit-height>
    <template #nav>
      <NavLink @click="run">Run Program</NavLink>
    </template>

    <div class="container">
      <StorymaticEditor v-model="story" class="editor" @init="onInit" />
      <StorymaticViewer class="viewer" :code="code" />
    </div>
  </DocumentDisplay>
</template>

<style scoped>
  .container {
    display: flex;
    flex-direction: row;
    gap: 1em;
    height: 100%;
  }

  .editor {
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    border-radius: 0.5em;
  }

  .viewer {
    width: min(50%, 300px);
    overflow: scroll;
  }
</style>
