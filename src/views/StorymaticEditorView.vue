<script lang="ts" setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import StorymaticEditor from "@/components/StorymaticEditor.vue";
  import StorymaticViewer from "@/components/StorymaticViewer.vue";
</script>

<template>
  <DocumentDisplay explicit-height>
    <div class="container">
      <StorymaticEditor class="editor" />
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
