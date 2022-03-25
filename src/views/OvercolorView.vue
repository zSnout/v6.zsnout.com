<script lang="ts" setup>
  import CameraAdjuster from "@/components/CameraAdjuster.vue";

  function rgbToHsl(
    red: number,
    green: number,
    blue: number
  ): [hue: number, saturation: number, lightness: number] {
    (red /= 255), (green /= 255), (blue /= 255);

    let l = Math.max(red, green, blue);
    let s = l - Math.min(red, green, blue);
    let h = s
      ? l === red
        ? (green - blue) / s
        : l === green
        ? 2 + (blue - red) / s
        : 4 + (red - green) / s
      : 0;

    let finalHue = 60 * h < 0 ? 60 * h + 360 : 60 * h;
    let finalSat =
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0);
    let finalLight = (100 * (2 * l - s)) / 2;

    return [finalHue, finalSat / 100, finalLight / 100];
  }

  function hslToRgb(
    hue: number,
    saturation: number,
    lightness: number
  ): [red: number, green: number, blue: number] {
    let k = (n: number) => (n + hue / 30) % 12;
    let a = saturation * Math.min(lightness, 1 - lightness);
    let f = (n: number) =>
      lightness - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }

  function transform(data: ImageData) {
    for (let i = 0; i < data.data.length; i += 4) {
      let [r, g, b] = data.data.slice(i, i + 3);
      let [r2, g2, b2] = hslToRgb(rgbToHsl(r, g, b)[0], 1, 0.5);

      if (Math.max(r, g, b) - Math.min(r, g, b) < 8) {
        let avg = (r + g + b) / 3;
        r2 = g2 = b2 = avg;
      }

      data.data[i] = r2;
      data.data[i + 1] = g2;
      data.data[i + 2] = b2;
    }

    return data;
  }
</script>

<template>
  <CameraAdjuster :transform="transform" />
</template>
