<script setup lang="ts">
  let tips = [
    'Double-click the "Escape" key to go home and focus the search bar.',
    "Bookmark a fractal page to save its location and equation forever.",
    'Hit the giant "zSnout" icon to go to the homepage.',
    "In the Fractal Generator, you can right-click to save a picture on desktop.",
    "Copy the URL of a chess page (standard or auto flip) to save your game.",
    "You're looking at the sixth major version of zSnout.",
  ];

  let timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
  let msInDay = 1000 * 60 * 60 * 24;
  let day = Math.floor((Date.now() - timezoneOffset) / msInDay) - 19061;
  let dailyTip = tips[day % tips.length];
</script>

<template>
  <p>Daily tip: {{ dailyTip }}</p>
</template>
