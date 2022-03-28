<script lang="ts" setup>
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
</script>

<template>
  <AceEditor v-model:value="model" />
</template>
