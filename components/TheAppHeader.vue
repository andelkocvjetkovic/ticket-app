<template>
  <header
    class="bg-gray-200 sticky dark:bg-gray-800 text-gray-800 dark:text-gray-100 w-full px-6 py-8 flex items-center justify-between top-0 z-50 lg:py-9 lg:justify-start lg:px-12 xl:px-16 xl:py-6"
  >
    <div class="flex">
      <app-color-icon class="" />
      <nuxt-link to="/cart">
        <lazy-app-svg-cart
          v-if="!isCartEmpty"
          class="w-8 h-8 lg:w-9 lg:h-9 lg:block ml-4 xl:h-10 xl:w-10 xl:ml-6"
        />
      </nuxt-link>
    </div>
    <nuxt-link
      to="/"
      class="absolute left-1/2 transform -translate-x-1/2 focus:outline-none w-28 h-7 lg:w-32 lg:h-9"
    >
      <app-logo class="w-full h-full" @click="clickOnLogo" />
    </nuxt-link>
    <div class="flex h-auto">
      <lazy-app-user-menu
        v-if="isUserSignIn"
        class="w-7 h-7 lg:h-9 lg:w-9 lg:block mr-4 lg:ml-4 lg:mr-0 xl:h-10 xl:w-10 xl:ml-6"
      />
      <button
        type="button"
        class="right-6 w-8 h-6 focus:outline-none lg:hidden"
        @click="toggleNavBar"
      >
        <app-svg-nav ref="hamSvg" class="w-full h-full stroke-1" />
      </button>
    </div>
    <app-nav-pc class="hidden lg:block ml-auto" />
    <client-only>
      <portal to="destination">
        <app-nav-modal-transition :is-open="isNavOpen">
          <lazy-app-nav-modal
            v-if="isNavOpen"
            :is-open="isNavOpen"
            :is-user-sign-in="isUserSignIn"
            @click="navModalClick"
          />
        </app-nav-modal-transition>
      </portal>
    </client-only>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isNavOpen: false,
      tlNavBar: null,
    };
  },
  computed: {
    isUserSignIn() {
      return this.$store.getters.isLoggedIn;
    },
    isCartEmpty() {
      return this.$store.getters.getCartAmount === 0;
    },
  },
  methods: {
    initGsapHamAnimation() {
      this.tlNavBar = this.$gsap.timeline({
        paused: true,
        defaults: {
          ease: "back.inOut(1.7)",
          duration: 0.2,
        },
      });
      this.tlNavBar.to(this.$refs.hamSvg.$refs.rectSvg, {
        x: -40,
      });
    },
    toggleNavBar() {
      if (Object.is(this.tlNavBar, null)) {
        this.initGsapHamAnimation();
      }
      if (this.tlNavBar.isActive()) {
        return;
      } else if (!this.isNavOpen) {
        this.tlNavBar.play();
      } else {
        this.tlNavBar.reverse();
      }

      this.isNavOpen = !this.isNavOpen;
    },
    navModalClick(e) {
      if (e.target.tagName == "A" || e.target.tagName == "BUTTON") {
        this.toggleNavBar();
      }
    },
    clickOnLogo() {
      if (this.isNavOpen) {
        this.toggleNavBar();
      }
    },
  },
};
</script>

<style></style>
