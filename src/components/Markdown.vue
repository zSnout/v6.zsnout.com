<script lang="ts">
  export function dedent(content: TemplateStringsArray, ...els: any[]) {
    return (
      content[0] +
      content
        .slice(1)
        .map((e, i) => els[i] + e)
        .join("")
    );
  }
</script>

<script setup lang="ts">
  import MarkdownIt from "markdown-it";
  let instance = MarkdownIt();

  defineProps<{ source: string }>();
</script>

<template>
  <div class="markdown" v-html="instance.render(source)" />
</template>

<style scoped lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap");

  .markdown {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
      color: var(--accent-color);
      font-weight: normal;
      font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    h1,
    h2,
    h3 {
      margin: 0.67em 0;
      padding-bottom: 0.125em;
      border-bottom: 0.0625em solid var(--accent-color);
    }

    h1 {
      font-weight: 600;
      font-size: 2em;
    }

    h2 {
      font-size: 1.5em;
    }

    h3 {
      font-size: 1.25em;
    }

    h4 {
      margin-top: 1em;
      margin-bottom: 0.125em;
      font-size: 1.25em;
    }

    p {
      margin-top: 0;
      margin-bottom: 0.5em;
    }

    ol,
    ul {
      margin-top: 0;
      margin-bottom: 0.5em;
      padding-left: 2em;

      ol {
        list-style-type: lower-roman;
      }

      ol,
      ul {
        margin-top: 0.25em;
        margin-bottom: 0;

        ol {
          list-style-type: lower-alpha;
        }
      }
    }

    li {
      word-wrap: break-all;

      > p {
        margin-top: 1em;
      }

      + li {
        margin-top: 0.25em;
      }
    }

    hr {
      margin: 1em 0;
      border: 0;
      border-top: 0.125em solid var(--accent-color);
    }

    blockquote,
    q {
      margin-right: 1em;
      margin-left: 1em;
      padding: 1em 0 1em 1em;
      background: var(--field-background);
      border-left: 0.25em solid var(--accent-color);

      > :first-child {
        margin-top: 0;
      }

      > :last-child {
        margin-bottom: 0;
      }

      code {
        padding: 0;
      }
    }

    code {
      padding: 0.25em;
      font-size: inherit;
      font-family: "Courier New", Courier, monospace;
      background: var(--field-background);
      border-radius: 0.25em;
    }

    table {
      min-width: 50%;
      max-width: 100%;
      margin: 0 auto;
      margin-bottom: 0.5em;
      overflow-x: auto;
      text-align: center;
      border-collapse: collapse;
      border-spacing: 0;

      thead {
        font-weight: bold;
        background: var(--field-background);
      }

      td,
      th {
        padding: 0.5em;
        border: 0.0625em solid var(--accent-color);
      }
    }

    > :first-child {
      margin-top: 0;
    }

    > :last-child {
      margin-bottom: 0;
    }
  }
</style>
