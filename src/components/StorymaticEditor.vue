<script lang="ts" setup>
  import ace from "ace-builds";
  import aceLoc from "ace-builds/src-noconflict/ace.js?url";
  import { computed } from "vue";
  import AceEditor from "./AceEditor.vue";

  let props = defineProps<{ modelValue?: string }>();
  let emit =
    defineEmits<{ (event: "update:modelValue", value: string): void }>();

  let model = computed<string>({
    get() {
      return props.modelValue || "";
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  ace.config.set("basePath", new URL("./", `file:${aceLoc}`).pathname);
</script>

<template>
  <AceEditor v-model:value="model" />
</template>
