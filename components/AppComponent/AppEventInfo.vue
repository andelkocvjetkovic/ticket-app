<template>
  <section class="">
    <header class="py-8 md:flex">
      <h4
        class="font-semibold italic text-right sm:text-lg md:text-left md:order-last md:ml-auto lg:text-xl xl:text-2xl"
      >
        <span
          >{{ getDay(event.dateStart) }}
          -
          {{ getDay(event.dateEnd) }}</span
        >
        <span>{{ getMonth(event.dateStart) }}</span>
        <span>{{ getYear(event.dateStart) }}</span>
      </h4>
      <h2
        class="text-3xl font-semibold sm:text-4xl mt-4 md:text-5xl xl:flex-grow xl:text-6xl"
      >
        <nuxt-link
          class="underline text-app-orange"
          :to="`events/${event.slug}`"
          >{{ event.title }} <span>&#8594;</span>
        </nuxt-link>
      </h2>
    </header>
    <figure class="mt-4 md:flex md:flex-wrap md:mt-12">
      <svg
        ref="svgElement"
        role="image"
        viewBox="0 0 500 400"
        class="rounded-md sm:w-full sm:max-h-64 md:w-1/2 xl:w-2/5 xl:max-h-full"
        preserveAspectRatio="none"
        :aria-labelledby="event.slug"
      >
        <title :id="event.slug">{{ event.title }}</title>
        <defs>
          <clipPath :id="event.uuid">
            <rect
              ref="rect1"
              x="0"
              y="0"
              width="251"
              height="500"
            ></rect>
            <rect
              ref="rect2"
              x="250"
              y="0"
              width="250"
              height="500"
            ></rect>
          </clipPath>
        </defs>
        <image
          preserveAspectRatio="xMinYMin slice"
          class="w-full h-full"
          :href="`/events/${event.image}`"
          :clip-path="`url(#${event.uuid})`"
        ></image>
      </svg>
      <figcaption
        class="mt-6 sm:mt-10 md:order-first md:mt-0 md:w-1/2 md:pr-5 md:flex md:flex-col xl:flex-grow"
      >
        <h3 class="text-lg md:mt-8">
          <app-link-speaker
            class="underline"
            :speaker="event.speakers"
          />
        </h3>
        <p
          class="mt-6 text-sm sm:text-base md:order-first md:mt-0 md:text-lg"
        >
          {{ event.description }}
        </p>
        <nuxt-link
          class="block underline mt-6 sm:text-lg md:text-2xl xl:text-3xl"
          :to="`events/${event.slug}`"
          >Read more <span>&#8594;</span></nuxt-link
        >
      </figcaption>
    </figure>
    <app-button-black
      class="px-12 py-2 mt-8 block mx-auto sm:px-24 sm:py-3 sm:text-lg md:px-32 md:text-xl md:mt-12 xl:px-36 xl:mt-20"
      @click="addToCart"
    />
  </section>
</template>
<script>
export default {
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    var tl = this.$gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.svgElement,
        start: "top bottom",
        end: "center-=50px center",
        scrub: 1,
        id: this.event.uuid,
      },
    });
    tl.from(this.$refs.rect1, {
      scale: 0,
      duration: 1,
    }).from(
      this.$refs.rect2,
      {
        scale: 0,
        duration: 1,
        transformOrigin: "50% 50%",
      },
      "<"
    );
  },
  destroyed() {
    this.$scrollTrigger.getById(this.event.uuid).kill();
  },
  methods: {
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
    addToCart() {
      this.$store.commit("addToCart", this.event);
    },
  },
};
</script>
