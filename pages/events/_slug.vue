<template>
  <main
    class="py-12 px-6 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-50 lg:py-24"
  >
    <header class="sm:max-w-lg mx-auto lg:max-w-2xl">
      <h1
        class="text-4xl font-bold md:text-5xl pt-12 md:pt-16 lg:text-5xl"
      >
        {{ event.title }}
      </h1>
      <app-show-date
        :date-start="event.dateStart"
        :date-end="event.dateEnd"
        class="text-right mt-4 italic"
      />
    </header>
    <figure class="mt-8 sm:max-w-lg mx-auto lg:max-w-2xl">
      <div
        role="image"
        class="relative pb-2/3 md:pb-2/4 rounded-md overflow-hidden lg:pb-2/6"
      >
        <img
          class="absolute w-full h-full inset-0 object-cover object-center"
          :src="`/events/${event.image}`"
          :alt="event.slug"
        />
      </div>
      <figcaption class="mt-6">
        <span class="text-lg md:text-xl lg:text-2xl text-app-orange">
          <app-link-speaker :speaker="event.speakers" />
        </span>
        <app-button-black
          class="mt-6 block w-1/2 mx-auto px-6 py-2 md:px-8 md:text-lg lg:text-xl lg:font-semibold lg:py-3 lg:px-10 lg:mt-12"
          @click="addToCart"
        />
      </figcaption>
    </figure>
    <nuxt-content
      class="mt-12 xl:mt-24 prose dark:prose-light sm:prose-sm lg:mt-24 lg:prose-xl mx-auto xl:prose-2xl"
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
    getDay(date) {
      return new Date(date).getDate();
    },
    getMonth(date) {
      return new Date(date).toLocaleDateString("en-US", {
        month: "long",
      });
    },
    getYear(date) {
      return new Date(date).getFullYear();
    },
  },
};
</script>

<style></style>
