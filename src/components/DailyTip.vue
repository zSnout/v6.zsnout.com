<script lang="ts" setup>
  let tips = [
    'Double-click the "Escape" key to go home and focus the search bar.',
    "Bookmark a fractal page to save its location and equation forever.",
    'Hit the giant "zSnout" icon to go to the homepage.',
    "In the Fractal Generator, you can right-click to save a picture on desktop.",
    "Copy the URL of a chess page (standard or auto flip) to save your game.",
    "You're looking at the sixth major version of zSnout.",
    'Right-click the giant "zSnout" icon to choose a new theme.',
    'Right-click the "Theme" button in the Fractal Explorer to go to the previous theme.',
  ];

  let today = new Date();
  let timezoneOffset = today.getTimezoneOffset() * 60 * 1000;
  let msInDay = 1000 * 60 * 60 * 24;
  let day = Math.floor((Date.now() - timezoneOffset) / msInDay) - 19061;
  let dailyTip = tips[day % tips.length];

  if (today.getMonth() == 2 && today.getDate() == 15)
    // Special message for my dog Zorro's birthday on March 15
    dailyTip = "Today is the birthday of the original zSnout, my dog Zorro.";

  if (today.getMonth() == 3 && today.getDate() == 1)
    // April Fools' Message
    dailyTip = "Happy Halloween!";

  if (today.getMonth() == 3 && today.getDate() == 3)
    // zSnout Anniversary
    dailyTip = "Today is the anniversary of when zSnout was created in 2019!";
</script>

<template>
  <p>Daily tip: {{ dailyTip }}</p>
</template>
