<script lang="ts" setup>
  import { captureFrame, streamToVideo } from "@/assets/image";
  import { onMounted, onUnmounted } from "vue";
  import FullscreenCanvas from "./FullscreenCanvas.vue";

  let { transform } = defineProps<{ transform(data: ImageData): ImageData }>();

  let _stream = new Promise<MediaStream>((resolve) => {
    onMounted(() => {
      resolve(navigator.mediaDevices.getUserMedia({ video: true }));
    });
  }).catch(() => {});

  let interval: number;

  async function onReady(canvas: HTMLCanvasElement) {
    let ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let stream = await _stream;
    if (!stream) return;

    let video = await streamToVideo(stream);

    interval = setInterval(() => {
      let frame = captureFrame(video, canvas.width, canvas.height);
      ctx.putImageData(transform(frame), 0, 0);
    }, 1000 / 30);
  }

  onUnmounted(() => clearInterval(interval));
</script>

<template>
  <FullscreenCanvas @ready="onReady" />
</template>
