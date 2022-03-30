<script lang="ts" setup>
  import { storyToJS } from "@/assets/storymatic";
  import TextConsole, { type Message } from "@/components/TextConsole.vue";
  import { reactive } from "vue";
  import preload from "@/assets/sm-worker-preload?raw";

  let { code } = defineProps<{ code: string }>();

  let _onField: ((value: string) => void) | undefined;
  function onField(value: string) {
    if (_onField) _onField(value);
  }

  let _onSelect: ((name: string, key: string) => void) | undefined;
  function onSelect(name: string, key: string) {
    if (_onSelect) _onSelect(name, key);
  }

  let messages: Message[] = reactive([]);
  let worker = createWorker(code, false);

  function isStringable(
    value: unknown
  ): value is string | number | boolean | bigint {
    return (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "bigint"
    );
  }

  function toString(value: unknown): string {
    if (value === null || value === undefined) return "";
    if (isStringable(value)) return "" + value;
    if (typeof value == "function") return `function ${value.name}()`;
    if (Array.isArray(value)) return value.map(toString).join("\n");
    if (typeof value == "object")
      return Object.keys(value)
        .map((key) => `${key}: ${(value as any)[key]}`)
        .join("\n");

    return "";
  }

  function onMessage({ data }: MessageEvent) {
    if (typeof data != "object" || data === null) return;

    if (data.type == "print") {
      let printed = toString(data.content);
      if (!printed) return;

      for (let line of printed.split("\n"))
        messages.push({ type: "info", content: line });
    } else if (data.type == "input") {
      // Store worker variable in case worker changes

      let _worker = worker;
      _onField = (value) => _worker?.postMessage(value);
    } else if (data.type == "menu") {
      let name = "" + Math.random();
      messages.push({ name, type: "select", options: data.options || {} });

      let _worker = worker;
      _onSelect = (_name, key) => name == _name && _worker?.postMessage(key);
    }
  }

  function createWorker(code: string, checkOldWorker?: boolean) {
    if (checkOldWorker) worker?.terminate();
    messages.map((value) => (value.hidden = true));

    try {
      let js = preload + storyToJS(code);

      let worker = new Worker(`data:text/javascript,${js}`, {
        name: Math.random().toString().slice(2),
        type: "module",
      });

      worker.onmessage = onMessage;
      worker.onerror = (event) => {
        event.preventDefault();
        messages.push({
          type: "error",
          content: event.message,
        });
      };

      _onField = undefined;

      return worker;
    } catch (error: any) {
      messages.push({
        type: "error",
        content: "" + (error?.message || error || "An unknown error occurred"),
      });
    }
  }
</script>

<template>
  <TextConsole
    class="console"
    :messages="messages"
    placeholder="Send messages to program..."
    @field="onField"
    @select="onSelect"
  />
</template>
