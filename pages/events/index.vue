<template>
  <main
    class="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-6"
  >
    <header
      class="pb-12 pt-12 max-w-xs mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl lg:pt-32"
    >
      <h1 class="text-5xl md:text-7xl md:tracking-tight lg:text-8xl">
        Lorem ipsum dolor, sit amet.
      </h1>
      <p class="mt-12 text-xl tracking-tight md:text-2xl lg:text-3xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Cumque minima voluptatum dicta sequi distinctio sit assumenda
        esse voluptatem iste eligendi neque mollitia aut, expedita
        sunt voluptates, fuga odit earum tenetur obcaecati vero.
        Dolore deserunt voluptate doloribus voluptatem voluptas
        nesciunt nemo.
      </p>
    </header>
    <article
      class="sm:py-6 max-w-sm mx-auto sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
    >
      <app-event-info
        v-for="event in events"
        :key="event.slug"
        class="py-24"
        :event="event"
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
      .fetch();

    return { events };
  },
  head() {
    return {
      title: "Upcoming events",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Explore upcoming events read about it and see our spekers",
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Vera Events",
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
          content: "Vera events",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Vera events",
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
          content: "Vera events",
        },
      ],
    };
  },
  methods: {},
};
</script>
