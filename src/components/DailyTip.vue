<script setup lang="ts">
  let tips = [
    'Double-click the "Escape" key to go home and focus the search bar.',
    'Hit the giant "zSnout" icon to go to the homepage!',
    "In the Fractal Generator, you can right-click to save a picture on desktop.",
  ];

  let timezoneOffset = new Date().getTimezoneOffset();
  let msInDay = 1000 * 60 * 60 * 24;
  let day = Math.floor((Date.now() + timezoneOffset) / msInDay) - 19062;
  let dailyTip = tips[day % tips.length];
</script>

<template>
  <p>Daily tip: {{ dailyTip }}</p>
</template>
