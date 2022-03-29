<script lang="ts" setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import StorymaticEditor from "@/components/StorymaticEditor.vue";
  import StorymaticViewer from "@/components/StorymaticViewer.vue";
  import { router } from "@/main";
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

  let story = ref(decode("" + (useRoute().params.code || "")));

  let interval = setInterval(() => {
    router.replace(`/storymatic/${encode(story.value)}`);
  }, 5000);

  onUnmounted(() => clearInterval(interval));
</script>

<template>
  <DocumentDisplay explicit-height>
    <div class="container">
      <StorymaticEditor v-model="story" class="editor" />
      <StorymaticViewer class="viewer" />
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
