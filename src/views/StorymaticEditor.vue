<script lang="ts" setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import StorymaticEditor from "@/components/StorymaticEditor.vue";
  import TextConsole, { type Message } from "@/components/TextConsole.vue";
  import { reactive } from "vue";

  let messages: Message[] = reactive([]);
</script>

<template>
  <DocumentDisplay explicit-height>
    <div class="container">
      <StorymaticEditor class="editor" />

      <TextConsole
        class="console"
        :messages="messages"
        placeholder="Send messages to program..."
      />
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

  .console {
    width: min(50%, 300px);
    overflow: scroll;
  }
</style>
