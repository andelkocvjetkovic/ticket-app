<template>
  <main
    class="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-50"
  >
    <header class="pt-12 px-6 w-full sm:max-w-lg sm:mx-auto">
      <h2 class="text-4xl lg:text-5xl">
        Lorem ipsum dolor sit amet.
      </h2>
      <p class="text-lg mt-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nobis, libero. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Nisi, ipsum!
      </p>
    </header>
    <app-form-sign
      class="py-12 w-full sm:max-w-lg sm:mx-auto"
      @sumbit-form="submitFrm"
    >
      <span v-if="loading">Loading.....</span>
      <span v-else>Sign up</span>
      <template #error>
        <span v-if="isError">{{ error }}</span>
      </template>
    </app-form-sign>
  </main>
</template>
<script>
export default {
  middleware: "logged",
  data() {
    return {
      loading: false,
      error: "",
    };
  },
  computed: {
    isError() {
      return this.error.length > 0;
    },
  },
  methods: {
    async submitFrm({ email, password }) {
      // TODO validate input
      this.loading = true;
      try {
        await this.$fire.auth.createUserWithEmailAndPassword(
          email,
          password
        );
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
        this.$router.replace("/dashboard");
      }
    },
  },
};
</script>
