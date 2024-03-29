<script lang="ts" setup>
  import ace from "ace-builds";
  import { computed } from "vue";
  import AceEditor from "./AceEditor.vue";

  let props = defineProps<{
    modelValue?: string;
    options?: Partial<ace.Ace.EditorOptions>;
    readonly?: boolean;
  }>();

  let emit = defineEmits<{
    (event: "update:modelValue", value: string): void;
    (event: "init", editor: ace.Ace.Editor): void;
  }>();

  let model = computed<string>({
    get() {
      return props.modelValue || "";
    },
    set(value) {
      emit("update:modelValue", value);
    },
  });

  ace.define(
    "ace/mode/storymatic",
    ["require", "exports"],
    function (require, exports) {
      let oop = require("ace/lib/oop");
      let TextMode = require("ace/mode/text").Mode;
      let StorymaticHighlightRules =
        require("ace/mode/storymatic_highlight_rules").SMHighlightRules;

      let Mode = function (this: any) {
        this.HighlightRules = StorymaticHighlightRules;
        this.lineCommentStart = "#";
      };

      oop.inherits(Mode, TextMode);
      exports.Mode = Mode;
    }
  );

  ace.define(
    "ace/mode/storymatic_highlight_rules",
    ["require", "exports"],
    function (require, exports) {
      let oop = require("ace/lib/oop");
      let { TextHighlightRules } = require("ace/mode/text_highlight_rules");
      let SMHighlightRules = function (this: any) {
        let dq = [
          { token: "constant.language.escape", regex: /\\./ },
          { token: "string", regex: /"/, next: "start" },
          { token: "paren", regex: /\|/, next: "start" },
          { token: "variable.storymatic", regex: /\$\w+/ },
        ];

        this.$rules = {
          "start": [
            { token: "invisible", regex: /[^\x00-\xff]+/ },
            { token: "comment.line", regex: /^\s*#.*$/ },
            {
              token: "storage.type.function",
              regex: /\b(?:function|func|def|let)\b/,
            },
            {
              token: "keyword",
              regex:
                /\b(?:if|elif|else|unless|while|until|repeat|break|continue|each|return|and|or|not|isnt|is|in|of|be)\b/,
            },
            { token: "constant.language", regex: /true|false|null/ },
            { token: "keyword.operator", regex: /[+\-*\/%>=<!]|[&|]{2}/ },
            { token: "paren", regex: /[(){}[\]]/ },
            { token: "entity.name.function", regex: /@\w+\b/ },
            { token: ["text", "property"], regex: /(\.\s*)(\$?\w+)/ },
            { token: ["property", "text"], regex: /(\$?\w+\s*)(:)/ },
            { token: "constant.numeric", regex: /\b\d+(?:\.\d+)?\b/ },
            { token: "variable.storymatic", regex: /\$\w+/ },
            {
              token: "constant.language",
              regex: /\b(?:null|true|false|yes|no|on|off|y|n)\b/,
            },
            { token: "string", regex: /"/, next: "string-dq" },
            { token: "paren", regex: /\|/, next: "string-dq" },
            { token: "text", regex: /[,;]/ },
            { token: "text", regex: /\s+/ },
            { defaultToken: "invalid" },
          ],
          "string-dq": [
            ...dq,
            { token: "markup.bold", regex: /[*]/, next: "string-dq-b" },
            { token: "markup.italic", regex: /_/, next: "string-dq-i" },
            { defaultToken: "string" },
          ],
          "string-dq-b": [
            ...dq,
            { token: "markup.bold", regex: /[*]/, next: "string-dq" },
            { token: "markup.bold.italic", regex: /_/, next: "string-dq-bi" },
            { defaultToken: "string.markup.bold" },
          ],
          "string-dq-i": [
            ...dq,
            { token: "markup.bold.italic", regex: /[*]/, next: "string-dq-bi" },
            { token: "markup.italic", regex: /_/, next: "string-dq" },
            { defaultToken: "string.markup.italic" },
          ],
          "string-dq-bi": [
            ...dq,
            { token: "markup.bold.italic", regex: /[*]/, next: "string-dq-i" },
            { token: "markup.bold.italic", regex: /_/, next: "string-dq-b" },
            { defaultToken: "string.markup.bold.italic" },
          ],
        };
      };

      oop.inherits(SMHighlightRules, TextHighlightRules);
      exports.SMHighlightRules = SMHighlightRules;
    }
  );
</script>

<template>
  <AceEditor
    v-model="model"
    :options="{ mode: 'ace/mode/storymatic', ...options }"
    :readonly="readonly"
    placeholder="Write a story..."
    @init="$emit('init', $event)"
  />
</template>
