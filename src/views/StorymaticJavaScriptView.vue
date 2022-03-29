<script lang="ts" setup>
  import { storyToJS } from "@/assets/storymatic";
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import StorymaticEditor from "@/components/StorymaticEditor.vue";
  import StorymaticViewer from "@/components/StorymaticViewer.vue";
  import { router } from "@/main";
  import { onUnmounted, ref, watch } from "vue";
  import { useRoute } from "vue-router";
  import AceEditor from "../components/AceEditor.vue";

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
  let javascript = ref(storyToJS(story.value));

  watch(story, (value) => {
    javascript.value = storyToJS(value);
  });

  let interval = setInterval(() => {
    router.replace(`/storymatic-to-javascript/${encode(story.value)}`);
  }, 5000);

  onUnmounted(() => clearInterval(interval));
</script>

<template>
  <DocumentDisplay explicit-height>
    <div class="container">
      <StorymaticEditor v-model="story" class="story" />
      <AceEditor
        v-model="javascript"
        class="javascript"
        :options="{ mode: 'ace/mode/javascript' }"
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

  .story {
    flex: 1;
    width: 50%;
    border-radius: 0.5em;
  }

  .javascript {
    width: 50%;
    overflow: scroll;
    border-radius: 0.5em;
  }
</style>
