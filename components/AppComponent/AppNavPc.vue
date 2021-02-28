<template>
  <client-only>
    <nav v-bind="$attrs">
      <ul
        class="flex space-x-4 lg:text-xl xl:text-2xl xl:space-x-5 2xl:font-semibold"
      >
        <li><nuxt-link to="/events">Events</nuxt-link></li>
        <li><nuxt-link to="/speakers">Speakers</nuxt-link></li>
        <li><nuxt-link to="/cart">Cart</nuxt-link></li>
        <li v-if="!isUserSignIn">
          <nuxt-link class="tracking-tighter italic" to="/login"
            >Log in</nuxt-link
          >
        </li>
        <li v-else>
          <button
            class="tracking-tighter italic"
            type="button"
            @click="signOut"
          >
            Log out
          </button>
        </li>
      </ul>
    </nav>
  </client-only>
</template>
<script>
export default {
  inheritAttrs: false,
  computed: {
    isUserSignIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    async signOut() {
      await this.$fire.auth.signOut();
    },
  },
};
</script>
