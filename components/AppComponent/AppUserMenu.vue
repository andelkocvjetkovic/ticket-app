<template>
  <client-only>
    <div ref="dropDownMenu" class="relative">
      <button
        id="menudropdown"
        type="button"
        class="focus:outline-none"
        v-bind="$attrs"
        @click="toggleUserMenu"
      >
        <img
          v-if="getUserPhoto"
          :src="getUserPhoto"
          alt="user photo"
          referrerpolicy="no-referrer"
          class="w-full h-full rounded-full"
        />
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="stroke-1 lg:stroke-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <transition
        :css="false"
        @enter="userMenuEnter"
        @leave="userMenuLeave"
      >
        <ul
          v-if="isUserMenuOpen"
          class="absolute top-10 right-0 lg:left-0 rounded-md bg-gray-300 dark:bg-gray-900 text-base py-4 px-8 space-y-2 w-64 lg:w-80 lg:text-xl lg:top-12"
          role="menu"
          aria-labelledby="menudropdown"
        >
          <li class="text-left">
            Profil: <span>{{ getUsers.email }}</span>
          </li>
          <li><nuxt-link to="/dashboard">Dashboard</nuxt-link></li>
          <li>
            <button
              type="button"
              class="block italic mt-4"
              @click="signOut"
            >
              Log out
            </button>
          </li>
        </ul>
      </transition>
    </div>
  </client-only>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      userMenu: false,
    };
  },
  computed: {
    isUserMenuOpen() {
      return this.userMenu;
    },
    getUsers() {
      return this.$store.state.authUser;
    },
    getUserPhoto() {
      return this.$store.getters.getUserPhoto;
    },
  },
  mounted() {
    document.addEventListener("click", this.closeDropDownMenu);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeDropDownMenu);
  },
  methods: {
    closeDropDownMenu(e) {
      this.$nextTick(() => {
        if (!this.$refs.dropDownMenu.contains(e.target)) {
          this.userMenu = false;
        }
      });
    },
    toggleUserMenu() {
      this.userMenu = !this.userMenu;
    },
    userMenuLeave(el, done) {
      this.$gsap.to(el, {
        opacity: 0,
        duration: 0.2,
        onComplete: done,
      });
    },
    userMenuEnter(el, done) {
      this.$gsap.from(el, {
        opacity: 0,
        duration: 0.2,
        onComplete: done,
      });
    },
    async signOut() {
      await this.$fire.auth.signOut();
    },
  },
};
</script>

<style></style>
