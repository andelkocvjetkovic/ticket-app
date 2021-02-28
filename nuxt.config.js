// manually change if emulators needed
const isDev = process.env.NODE_ENV === "development";
const useEmulators = false;
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "Vera %s",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "Vera a web platform for web developers",
      },
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        hid: "twitter:site",
        name: "twitter:site",
        content: "@AndelkoCvjetko1",
      },
      {
        hid: "twitter:url",
        name: "twitter:url",
        content: "https://blissful-shaw-ec916f.netlify.app",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
    ],
  },
  router: {
    linkActiveClass: "underline text-app-orange",
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/gsap.client.js",
    "~/plugins/scrollTrigger.client.js",
    "~/plugins/scrollTo.client.js",
    "~/plugins/portal-vue.client.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/color-mode",
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
    "@nuxtjs/composition-api",
    "@nuxtjs/firebase",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
  ],
  firebase: {
    lazy: false,
    config: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedAction: "onAuthStateChangedAction",
          subscribeManually: false,
        },
      },
      firestore: {
        memoryOnly: false,
        enablePersistence: true,
        emulatorPort: isDev && useEmulators ? 8080 : undefined,
      },
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: "prism-themes/themes/prism-hopscotch.css",
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "gsap",
      "gsap/ScrollToPlugin",
      "gsap/ScrollTrigger",
      "portal-vue",
    ],
    babel: {
      plugins: ["@babel/plugin-proposal-optional-chaining"],
    },
  },
  generate: {
    fallback: true,
    exclude: ["/dashboard"],
  },
  pageTransition: {
    name: "page",
    mode: "out-in",
    css: false,
    beforeEnter(el) {
      this.$gsap.set(el, { opacity: 0 });
    },
    enter(el, done) {
      this.$gsap.to(el, {
        opacity: 1,
        duration: 0.3,
        ease: "expo.out",
        onComplete: done,
      });
    },
    leave(el, done) {
      this.$gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        ease: "expo.out",
        onComplete: done,
      });
    },
  },
  purgeCSS: {
    whitelist: ["dark-mode"],
  },
};
