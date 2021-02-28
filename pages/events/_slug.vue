<template>
  <main
    class="py-12 px-6 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-50"
  >
    <header
      class="space-y-12 sm:max-w-lg mx-auto md:max-w-xl lg:max-w-3xl lg:pt-8 lg:space-y-16"
    >
      <h1
        class="text-4xl font-bold md:text-5xl pt-12 md:pt-16 lg:text-5xl xl:text-6xl"
      >
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
        class="block w-1/2 mx-auto px-6 py-2 md:px-8 md:text-lg lg:text-xl lg:font-semibold lg:py-4 lg:px-10"
        @click="addToCart"
      />
      <p>
        <span class="text-lg md:text-xl lg:text-2xl text-app-orange">
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
  head() {
    return {
      title: this.event.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.event.description,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: this.event.title,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: this.event.description,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: this.event.image,
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: this.event.title,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.event.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.event.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.event.image,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.event.image,
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.event.title,
        },
      ],
    };
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
