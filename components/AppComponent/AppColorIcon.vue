<template>
  <button
    type="button"
    class="w-6 h-6 lg:h-8 lg:w-8 focus:outline-none"
    @click="toogleMod"
  >
    <transition
      :css="false"
      mode="out-in"
      @enter="enterAnimation"
      @leave="leaveAnimation"
    >
      <components :is="getCurentComponent" class="w-full h-full" />
    </transition>
  </button>
</template>

<script>
import AppIconSun from "~/components/AppIcons/AppIconSun.vue";
import AppIconMoon from "~/components//AppIcons/AppIconMoon.vue";
export default {
  components: {
    AppIconSun,
    // eslint-disable-next-line vue/no-unused-components
    AppIconMoon,
  },
  computed: {
    getCurentComponent() {
      if (this.$colorMode.value === "light") {
        return AppIconSun;
      } else {
        return AppIconMoon;
      }
    },
  },
  methods: {
    toogleMod() {
      this.$colorMode.preference =
        this.$colorMode.value === "light" ? "dark" : "light";
    },
    enterAnimation(el, done) {
      this.$gsap.from(el, {
        y: 20,
        opacity: 0,
        duration: 0.1,
        ease: "expo.out",
        onComplete: done,
      });
    },
    leaveAnimation(el, done) {
      this.$gsap.to(el, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: "expo.in",
        onComplete: done,
      });
    },
  },
};
</script>

<style></style>
