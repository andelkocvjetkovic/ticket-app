<template>
  <main
    class="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100 px-6"
  >
    <header
      class="py-20 max-w-md mx-auto sm:max-w-xl lg:flex lg:flex-col lg:max-w-none lg:w-full lg:pt-10 lg:relative lg:min-h-screen lg:items-center lg:justify-start"
    >
      <app-home-svg
        class="sm:max-w-lg mx-auto lg:max-w-none lg:w-3/5 lg:max-h-full lg:mx-0 lg:absolute top-52"
      />
      <h1
        class="text-4xl font-bold break-words mt-12 text-center lg:order-first relative z-30 lg:text-7xl lg:tracking-wide"
      >
        Stay tuned stay Vera
      </h1>
    </header>
    <article
      class="max-w-sm py-12 mx-auto sm:py-6 o sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl lg:pt-32 lg:pb-12"
    >
      <h2
        class="text-4xl text-center mt-10 md:text-5xl lg:text-5xl xl:text-6xl"
      >
        Upcoming events
      </h2>
      <app-event-info
        v-for="event in events"
        :key="event.slug"
        :event="event"
        class="py-24"
      >
      </app-event-info>
    </article>
  </main>
</template>

<script>
export default {
  async asyncData({ $content }) {
    var events = await $content("all-events")
      .sortBy("dateStart")
      .limit(3)
      .fetch();
    return { events };
  },
  head() {
    return {
      title: "Home",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Vera is is a new web platform for learning web dev",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Vera",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content:
            "Explore upcoming events read about it and see our spekers",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: "Vera",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Vera",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Explore upcoming events read about it and see our spekers",
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: "Vera",
        },
      ],
      script: [
        {
          src:
            "https://identity.netlify.com/v1/netlify-identity-widget.js",
        },
      ],
    };
  },
};
</script>
