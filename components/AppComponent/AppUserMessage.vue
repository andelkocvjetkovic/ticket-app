<template>
  <main
    ref="mainElement"
    class="w-screen h-screen absolute inset-0 bg-transparent flex justify-center items-center z-30"
    @click="hello"
  >
    <article
      ref="articleElement"
      class="w-2/3 h-1/2 mt-32 lg:mt-0 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-50 rounded-md sm:max-w-sm mx-auto"
    >
      <section
        class="px-4 py-8 relative h-full w-full lg:px-8"
        v-bind="$attrs"
      >
        <slot></slot>
        <button
          class="absolute right-3 top-3 w-8 h-8 p-1 bg-app-orange rounded-full text-gray-50 font-semibold shadow-xl"
          v-on="$listeners"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-full h-full"
            aria-labelledby="closeButton"
            role="presentation"
          >
            <title id="closeButton">Close button</title>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </section>
    </article>
  </main>
</template>

<script>
export default {
  inheritAttrs: false,
  mounted() {
    this.$store.commit("toggleNavModal", true);
  },
  destroyed() {
    this.$store.commit("toggleNavModal", false);
  },
  methods: {
    hello(e) {
      if (
        e.target == this.$refs.mainElement ||
        e.target == this.$refs.articleElements
      ) {
        this.$emit("click-outside");
      }
    },
  },
};
</script>

<style></style>
