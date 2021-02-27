<template>
  <main>
    <p class="text-red-500 px-6">
      <slot name="error"></slot>
    </p>
    <form
      class="pt-8 space-y-6 px-6"
      action="#"
      @submit.prevent.stop="submitForm"
    >
      <input type="hidden" name="remember" value="true" />
      <div class="rounded-md shadow-sm space-y-4">
        <div>
          <label for="email-address" class="sr-only"
            ><slot name="labelEmail"> Email address</slot></label
          >

          <input
            id="email-address"
            v-model="form.email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            v-model.lazy="form.password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            maxlength="64"
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div v-if="isLogin" class="flex items-center">
          <input
            id="remember_me"
            v-model.lazy="form.isRemeber"
            name="remember_me"
            type="checkbox"
            class="h-4 w-4 text-gray-400 focus:ring-gray-300 border-gray-300 rounded"
          />
          <label
            for="remember_me"
            class="ml-2 block text-sm text-gray-900 dark:text-gray-200"
          >
            Remember me
          </label>
        </div>

        <div v-if="isLogin" class="text-sm">
          <nuxt-link
            to="/"
            class="font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500"
          >
            Forgot your password?
          </nuxt-link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-gray-300 dark:bg-gray-600 dark:text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <span
            class="absolute left-0 inset-y-0 flex items-center pl-3"
          >
            <!-- Heroicon name: solid/lock-closed -->
            <svg
              class="h-5 w-5 text-gray-700 dark:text-gray-200 group-hover:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <slot>
            <span>Log in</span>
          </slot>
        </button>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  props: {
    isLogin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        isRemeber: false,
      },
    };
  },
  methods: {
    submitForm() {
      // TODO validate input
      this.$emit("sumbit-form", this.form);
    },
  },
};
</script>

<style></style>
