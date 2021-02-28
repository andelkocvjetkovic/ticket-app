<template>
  <main
    class="pb-6 px-6 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
  >
    <header
      class="pt-24 pb-12 max-w-sm mx-auto sm:max-w-lg md:max-w-full md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-4 lg:max-w-4xl xl:max-w-6xl xl:gap-x-8"
    >
      <h1
        class="text-4xl font-semibold sm:text-5xl md:col-span-1 md:col-start-1 md:text-6xl lg:text-7xl"
      >
        Lorem ipsum dolor sit amet.
      </h1>
      <div
        role="img"
        class="mt-12 relative pb-2/3 overflow-hidden rounded-sm shadow sm:pb-1/2 md:col-span-2 md:col-start-2 md:row-span-2 md:mt-0 md:pb-0"
      >
        <img
          src="/speakers/hero.jpg"
          alt="class teacher and student"
          class="absolute inset-0 w-full h-full object-cover object-center md:object-right"
        />
      </div>
      <p
        class="mt-6 tracking-tight text-lg md:col-span-1 md:col-start-1 md:text-2xl xl:text-3xl"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
        facilis provident necessitatibus, illo vitae pariatur
        repellendus eligendi placeat voluptatum, suscipit quo illum
        temporibus enim numquam? Tempora, ipsa.
      </p>
    </header>
    <article
      class="max-w-sm mx-auto py-12 sm:max-w-lg md:max-w-full md:flex md:flex-wrap md:justify-between lg:max-w-4xl xl:max-w-6xl xl:py-32"
    >
      <section
        v-for="(speaker, index) in speakers"
        :id="speaker.slug"
        :key="speaker.slug"
        class="w-full mt-24 md:w-1/2 md:max-w-sm md:py-3 md:px-4 lg:max-w-md xl:max-w-lg"
        :class="[index % 2 != 0 ? 'md:mt-32 lg:mt-72' : 'md:mt-0']"
      >
        <figure
          class="flex items-center space-x-6 sm:space-x-0 sm:justify-between md:justify-start"
        >
          <figcaption
            class="flex-grow flex flex-col space-y-3 items-start sm:flex-grow-0 md:ml-6 xl:space-y-5"
          >
            <h2
              class="text-3xl font-semibold lg:text-4xl xl:text-5xl"
            >
              {{ speaker.name }}
            </h2>
            <p class="flex space-x-4">
              <a href="#"
                ><app-icon-git-hub class="w-6 h-6 lg:w-8 lg:h-8"
              /></a>
              <a href="#"
                ><app-icon-linkedin class="w-6 h-6 lg:w-8 lg:h-8"
              /></a>
            </p>
            <h4 class="text-sm text-gray-500 lg:text-base xl:text-xl">
              {{ speaker.company }}
            </h4>
          </figcaption>
          <img
            :src="`/speakers/${speaker.image}`"
            :alt="speaker.name"
            class="w-28 h-28 md:w-24 md:h-24 xl:w-32 xl:h-32 2xl:w-36 2xl:h-36 rounded-full object-cover object-center md:order-first"
          />
        </figure>
        <p
          class="leading-snug w-full mt-8 sm:mt-6 md:text-base lg:text-xl"
        >
          {{ speaker.about }}
        </p>
      </section>
    </article>
  </main>
</template>
<script>
import {
  nextTick,
  onMounted,
  useContext,
  useRoute,
} from "@nuxtjs/composition-api";
export default {
  setup() {
    var route = useRoute();
    var { $gsap: gsap } = useContext();
    onMounted(() => {
      if (route.value.query.speaker) {
        nextTick(() => {
          gsap.to(window, {
            scrollTo: {
              y: `#${route.value.query.speaker}`,
              offsetY: 130,
            },
          });
        });
      }
    });
  },
  async asyncData({ $content }) {
    var speakers = await $content("speakers").fetch();
    return { speakers };
  },
  head() {
    return {
      title: "Speakers",
      meta: [
        {
          hid: "description",
          name: "description",
          content: `Our speakers: ${this.speakerNames}`,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Vera speakers",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: `Our speakers: ${this.speakerNames}`,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80",
        },
        {
          hid: "twitter:image:alt",
          name: "twitter:image:alt",
          content: "Vera speakers",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Vera speakers",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `Our speakers: ${this.speakerNames}`,
        },
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80",
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80",
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: "Vera speakers",
        },
      ],
    };
  },
  computed: {
    speakerNames() {
      return this.speakers.map((s) => s.name).join();
    },
  },
};
</script>
