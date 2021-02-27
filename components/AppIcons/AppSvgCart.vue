<template>
  <client-only>
    <transition
      :css="false"
      @before-enter="
        (el) => {
          this.$gsap.set(el, { opacity: 0 });
        }
      "
      @enter="
        (el, done) => {
          this.$gsap.to(el, {
            opacity: 1,
            duration: 0.2,
            onComplete: done,
          });
        }
      "
      @leave="
        (el, done) => {
          this.$gsap.to(el, {
            opacity: 0,
            duration: 0.2,
            onComplete: done,
          });
        }
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 -0 32 32"
        class="stroke-current text-gray-900 dark:text-gray-50 stroke-1 lg:stroke-2"
        aria-labelledby="cart"
        v-bind="$attrs"
      >
        <title id="cart">Cart</title>
        <path
          ref="cartPath"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
        <text
          x="17"
          y="10"
          class="fill-current font-medium text-app-orange text-sm stroke-1"
        >
          {{ ticketNumbers }}
        </text>
      </svg>
    </transition>
  </client-only>
</template>
<script>
import { computed, useStore } from "@nuxtjs/composition-api";
export default {
  inheritAttrs: false,
  setup() {
    var store = useStore();
    var ticketNumbers = computed(() => store.getters.getCartAmount);
    return {
      ticketNumbers,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$gsap.set(this.$refs.cartPath, {
        y: 3,
        x: -2,
      });
    });
  },
};
</script>
