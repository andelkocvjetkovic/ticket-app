<template>
  <nuxt-link
    :to="{
      path: '/speakers',
      query: { speaker: getSlugSpeker(speaker) },
    }"
    class="underline"
    >Speaker:
    <span class="font-semibold"
      >{{ speaker }} <span>&#8594;</span></span
    ></nuxt-link
  >
</template>

<script>
export default {
  props: {
    speaker: {
      type: String,
      required: true,
    },
  },
  methods: {
    getSlugSpeker(name) {
      return name
        .split(" ")
        .map((i) => i.toLowerCase())
        .join("-");
    },
  },
};
</script>
