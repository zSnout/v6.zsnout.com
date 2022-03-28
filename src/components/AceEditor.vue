<script lang="ts" setup>
  import ace from "ace-builds";
  import aceLoc from "ace-builds/src-noconflict/ace.js?url";
  import { computed } from "vue";
  import { VAceEditor } from "vue3-ace-editor";

  let props = defineProps<{
    modelValue?: string;
    options?: Partial<ace.Ace.EditorOptions>;
  }>();

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
  <div class="ace-outer">
    <VAceEditor
      class="ace-editor"
      :options="{ showGutter: false, ...options }"
      :print-margin="false"
      :wrap="true"
      theme="cobalt"
      v-model:value="model"
    />
  </div>
</template>

<style lang="scss" scoped>
  @use "@/assets/util.scss" as *;

  .ace-outer {
    box-sizing: border-box;
    padding: 0.5em 0.5em 0.5em 0.25em;
    background-color: #fff;

    @include dark {
      background-color: #193549;
    }
  }

  .ace-editor :deep() {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    color: #000;
    font-size: 1em;
    background-color: #fff;

    .ace_print-margin {
      width: 0;
    }

    .ace_active-line {
      background-color: transparent;
    }

    .ace_gutter {
      color: #808080;
    }

    .ace_cursor {
      color: #000;
    }

    .ace_marker-layer .ace_selection {
      background: #68b0ff80;
    }

    .ace_invisible {
      color: #00000020;
    }

    .ace_keyword {
      color: #d73a49;
    }

    .ace_meta {
      color: #6f42c1;
    }

    .ace_constant {
      color: #005cc5;
    }

    .ace_invalid {
      color: #fff;
      background: #cd3131;
    }

    .ace_support {
      color: #005cc5;

      &.ace_function {
        color: #d73a49;
      }
    }

    .ace_fold {
      background-color: #fff;
      border-color: #000;
    }

    .ace_storage {
      color: #d73a49;
    }

    .ace_entity {
      color: #6f42c1;
    }

    .ace_string {
      color: #22863a;
    }

    .ace_comment {
      color: #6a737d;
      font-style: italic;
    }

    .ace_heading,
    .ace_markup.ace_heading {
      font-weight: bold;
    }

    .ace_variable {
      color: #005cc5;

      &.ace_language,
      &.ace_storymatic {
        color: #e27f2d;
      }
    }

    .ace_property {
      color: #00a1a1;
    }

    @include dark {
      color: #fff;
      background-color: #193549;
      font-feature-settings: "liga" 0, "calt" 0;

      .ace_gutter {
        color: #8091a0;
      }

      .ace_cursor {
        color: #ffc600;
      }

      .ace_hidden-cursors {
        display: none;
      }

      .ace_marker-layer .ace_selection {
        background: #0050a480;
      }

      .ace_invisible {
        color: #ffffff20;
      }

      .ace_keyword {
        color: #ff9d00;
      }

      .ace_meta {
        color: #9effff;
      }

      .ace_constant {
        color: #ff628c;
      }

      .ace_invalid {
        color: white;
        background: #f44542;
      }

      .ace_support {
        color: #80ffbb;

        &.ace_function {
          color: #ff9d00;
        }
      }

      .ace_fold {
        background-color: #ff9d00;
        border-color: #ffffff;
      }

      .ace_storage {
        color: #ffc600;

        &.ace_function,
        &.ace_class {
          color: #ff9d00;
        }
      }

      .ace_entity {
        color: #ffc600;
      }

      .ace_string {
        color: #a5ff90;

        &.ace_template {
          color: #3ad900;
        }
      }

      .ace_comment {
        color: #0088ff;
        font-style: italic;
      }

      .ace_heading,
      .ace_markup.ace_heading {
        color: #ffc600;
        font-weight: bold;
      }

      .ace_list,
      .ace_markup.ace_list {
        color: #ffc600;
      }

      .ace_variable {
        color: #e1efff;

        &.ace_language,
        &.ace_storymatic {
          color: #fb94ff;
        }
      }

      .ace_property {
        color: #9effff;
      }
    }
  }
</style>
