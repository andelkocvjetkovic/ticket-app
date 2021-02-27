<template>
  <nav
    key="isOpen"
    class="fixed inset-0 w-screen h-screen bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100 flex flex-col items-center justify-start text-3xl z-40"
    v-on="$listeners"
  >
    <ul ref="menuItems" class="mt-32 space-y-6 pl-10">
      <li><nuxt-link to="/events">Events</nuxt-link></li>
      <li><nuxt-link to="/speakers">Speakers</nuxt-link></li>
      <li><nuxt-link to="/cart">Cart</nuxt-link></li>
      <li v-if="!isUserSignIn">
        <nuxt-link to="/login">Log in</nuxt-link>
      </li>
      <li v-else>
        <button type="button" @click="signOut">Log out</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    isUserSignIn: {
      type: Boolean,
      required: true,
    },
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    async signOut() {
      await this.$fire.auth.signOut();
    },
  },
};
</script>

<style></style>
