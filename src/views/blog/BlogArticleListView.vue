<script lang="ts" setup>
  import DocumentDisplay from "@/components/DocumentDisplay.vue";
  import SearchBar, { type Link } from "@/components/SearchBar.vue";
  import Title from "@/components/Title.vue";

  let links: Link[] = [
    {
      name: "Github Copilot is Amazing",
      desc: "Zachary Sakowitz talks about his experience using the coding assistant GitHub Copilot. He shares some of the benefits of using GitHub Copilot as well as the downsides.",
      to: "/blog/github-copilot-is-amazing",
    },
    {
      name: "What Makes zSnout Different",
      desc: "Learn why zSnout is so different when compared to most other websites, including our unique theme system, offline capabilities, and more.",
      to: "/blog/what-makes-zsnout-different",
    },
  ];
</script>

<template>
  <DocumentDisplay>
    <Title>Blog Articles</Title>
    <SearchBar :links="links" autofocus />
  </DocumentDisplay>
</template>
