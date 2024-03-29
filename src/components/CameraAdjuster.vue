<script lang="ts" setup>
  import { captureFrame, streamToVideo } from "@/assets/image";
  import { alert } from "@/assets/modal";
  import { onMounted, onUnmounted } from "vue";
  import FullscreenCanvas from "./FullscreenCanvas.vue";

  let { transform } = defineProps<{
    transform(data: ImageData): ImageData;
    breakpoint?: number;
  }>();

  let _stream = new Promise<MediaStream>((resolve) => {
    onMounted(() => {
      resolve(
        navigator.mediaDevices.getUserMedia({
          video: {
            aspectRatio: {
              ideal: innerWidth / innerHeight,
            },
          },
        })
      );
    });
  }).catch(() => {
    alert("Oops, we weren't able to get camera permissions. Try again later.");
  });

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

  onUnmounted(async () => {
    clearInterval(interval);
    let stream = await _stream;
    if (!stream) return;

    stream.getTracks().map((track) => {
      if (track.readyState == "live") track.stop();
    });
  });
</script>

<template>
  <FullscreenCanvas :breakpoint="breakpoint" @ready="onReady">
    <template #nav>
      <slot name="nav" />
    </template>
  </FullscreenCanvas>
</template>
