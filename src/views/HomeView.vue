<script setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import ImageGrid from "../components/ImageGrid.vue";
  import GridElement from "../components/GridElement.vue";
</script>

<template>
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap"
  />

  <DocumentDisplay>
    <h1>Welcome to zSnout!</h1>
    <p>
      zSnout is collection of different projects created for fun by Zachary
      Sakowitz during COVID-19. Our source code is publicly available on our
      <a href="https://gitbub.com/zSnout/zsnout-vue">GitHub page</a>, meaning
      that anybody can help out by contributing code or reporting an
      <a href="https://github.com/zSnout/zsnout-vue/issues/new/choose"
        >issue or bug</a
      >. You can also
      <a href="https://store.zsnout.com/">buy a fractal shirt</a>.
    </p>

    <ImageGrid :cols="5" :rows="2">
      <GridElement
        src="https://placekitten.com/640/360"
        alt=""
        :row-start="1"
        :row-end="3"
        :col-start="1"
        :col-end="3"
      />
    </ImageGrid>
  </DocumentDisplay>
</template>

<style scoped>
  h1 {
    margin: 0;
    color: var(--accent-color);
    font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 700;
    padding-bottom: 0.25em;
    border-bottom: 1px solid var(--accent-color);
  }
</style>
