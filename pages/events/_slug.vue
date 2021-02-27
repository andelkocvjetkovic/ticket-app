<template>
  <main
    class="py-12 px-6 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-50"
  >
    <header
      class="space-y-12 sm:max-w-lg mx-auto md:max-w-xl lg:max-w-3xl"
    >
      <h1 class="text-4xl font-bold md:text-5xl mt-12 md:mt-16">
        {{ event.title }}
      </h1>
      <div
        role="image"
        class="relative pb-2/3 md:pb-2/4 rounded-md overflow-hidden lg:pb-2/5"
      >
        <img
          class="absolute w-full h-full inset-0 object-cover object-center"
          :src="`/events/${event.image}`"
          :alt="event.slug"
        />
      </div>
      <app-button-black
        class="block w-1/2 mx-auto px-6 py-2 md:px-8 md:text-lg lg:text-xl lg:py-3"
        @click="addToCart"
      />
      <p>
        <span class="text-lg md:text-xl lg:text-2xl">
          <app-link-speaker :speaker="event.speakers" />
        </span>
      </p>
    </header>
    <nuxt-content
      class="mt-12 xl:mt-24 prose prose-sm dark:prose-light sm:prose lg:prose-2xl mx-auto"
      :document="event"
    />
  </main>
</template>

<script>
export default {
  async asyncData({ $content, params, error }) {
    var event = await $content("all-events", params.slug)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: "Page not found" });
      });
    return { event };
  },
  computed: {
    speaker() {
      return this.event.speakers;
    },
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.event);
    },
  },
};
</script>

<style></style>
