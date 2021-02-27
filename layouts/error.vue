<template>
  <main
    class="bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-50 px-6 h-screen"
  >
    <header class="text-center py-8">
      <h1 class="text-3xl">An error occured</h1>
      <h2 class="mt-6 text-red-400">{{ error.message }}</h2>
    </header>
    <app-error-svg class="h-1/2 max-w-xs mx-auto py-6" />
    <div class="text-xl text-center mt-8">
      <nuxt-link to="/" class="text-app-orange underline text-2xl"
        >Home page <span>&#8594;</span></nuxt-link
      >
    </div>
  </main>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
