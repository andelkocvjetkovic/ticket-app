<template>
  <main
    class="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-6"
  >
    <header
      class="py-20 max-w-md mx-auto sm:max-w-xl lg:flex lg:flex-col lg:max-w-none lg:w-full lg:pt-10 lg:relative lg:min-h-screen lg:items-center lg:justify-center"
    >
      <app-home-svg
        class="sm:max-w-lg mx-auto lg:max-w-none lg:w-full lg:h-screen lg:mx-0 lg:absolute top-20"
      />
      <h1
        class="text-4xl font-bold break-words mt-12 text-center lg:order-first relative z-30 lg:text-7xl"
      >
        Vera is is a new web platform for learning web dev
      </h1>
    </header>
    <article
      class="max-w-sm py-12 mx-auto sm:py-6 o sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl lg:py-16"
    >
      <h3
        class="text-4xl text-center mt-10 md:text-5xl lg:text-5xl xl:text-6xl"
      >
        Upcoming events
      </h3>
      <app-event-info
        v-for="event in events"
        :key="event.slug"
        :event="event"
        class="mt-24"
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
  methods: {},
};
</script>
