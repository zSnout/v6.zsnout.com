<script lang="ts" setup>
  import FullscreenDisplay from "@/components/FullscreenDisplay.vue";
  import NavLink from "@/components/NavLink.vue";
  import { onMounted, ref } from "vue";

  let muted = ref(false);
  let camera = ref(true);
  let connected = ref(false);
  let me = ref<HTMLVideoElement | null>(null);
  let other = ref<HTMLVideoElement | null>(null);
  let stream: MediaStream | undefined;

  function toggleMute() {
    muted.value = !muted.value;
    if (stream) stream.getAudioTracks()[0].enabled = !muted.value;
  }

  function toggleVideo() {
    camera.value = !camera.value;
    if (stream) stream.getVideoTracks()[0].enabled = !camera.value;
  }

  onMounted(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          aspectRatio: {
            ideal: innerWidth / innerHeight,
          },
        },
        audio: true,
      })
      .then((stream) => {
        stream = stream;

        if (!me.value) return;
        me.value.srcObject = stream;
        me.value.muted = true;
        me.value.play();
      });
  });
</script>

<template>
  <FullscreenDisplay>
    <template #nav>
      <NavLink @click="toggleMute">
        {{ muted ? "Unmute" : "Mute" }}
      </NavLink>

      <NavLink @click="toggleVideo">
        {{ camera ? "Hide Camera" : "Show Video" }}
      </NavLink>
    </template>

    <video
      ref="me"
      :class="{ me: true, main: !connected, small: connected }"
      autoplay
      @contextmenu="$event.preventDefault()"
    />

    <video
      ref="other"
      :class="{ other: true, main: connected }"
      autoplay
      @contextmenu="$event.preventDefault()"
    />
  </FullscreenDisplay>
</template>

<style scoped>
  .me {
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
