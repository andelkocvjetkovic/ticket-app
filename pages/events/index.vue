<template>
  <main
    class="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-6"
  >
    <header
      class="pb-12 pt-24 max-w-xs mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl"
    >
      <h1 class="text-5xl md:text-7xl md:tracking-tight">
        Lorem ipsum dolor, sit amet.
      </h1>
      <p class="mt-8 text-xl tracking-tight md:text-2xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Cumque minima voluptatum dicta sequi distinctio sit assumenda
        esse voluptatem iste eligendi neque mollitia aut, expedita
        sunt voluptates, fuga odit earum tenetur obcaecati vero.
        Dolore deserunt voluptate doloribus voluptatem voluptas
        nesciunt nemo.
      </p>
    </header>
    <article
      class="py-10 sm:py-6 max-w-sm mx-auto sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl"
    >
      <app-event-info
        v-for="event in events"
        :key="event.slug"
        class="mt-24"
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
  methods: {},
};
</script>
