<script lang="ts" setup>
  import "ace-builds";
  import type { Ace } from "ace-builds";
  import "ace-builds/src-noconflict/theme-cobalt";
  import { computed } from "vue";
  import { VAceEditor } from "vue3-ace-editor";

  let props = defineProps<{
    modelValue?: string;
    options?: Partial<Ace.EditorOptions>;
    readonly?: boolean;
    placeholder?: string;
  }>();

  let emit = defineEmits<{
    (event: "update:modelValue", value: string): void;
    (event: "init", editor: Ace.Editor): void;
  }>();

  let model = computed<string>({
    get() {
      return props.modelValue || "";
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  function onInit(editor: Ace.Editor) {
    editor.commands.addCommand({
      name: "save",
      bindKey: { win: "Ctrl-S", mac: "Command-S" },
      exec: () => {},
    });

    editor.commands.addCommand({
      name: "options",
      bindKey: { win: "Ctrl-,", mac: "Command-," },
      exec: () => {},
    });

    emit("init", editor);
  }
</script>

<template>
  <div class="ace-outer">
    <VAceEditor
      v-model:value="model"
      :class="{ readonly }"
      class="ace-editor"
      :options="{ showGutter: false, tabSize: 2, ...options }"
      :placeholder="placeholder"
      :print-margin="false"
      :readonly="readonly"
      :wrap="true"
      theme="cobalt"
      @init="onInit"
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

  .readonly.ace-editor :deep() .ace_cursor-layer {
    display: none;
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
