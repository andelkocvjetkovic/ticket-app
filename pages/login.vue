<template>
  <main
    class="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 px-6 flex flex-col items-stretch justify-start min-h-screen"
  >
    <section class="mt-12 max-w-sm mx-auto">
      <h2 class="text-2xl">
        Do not have account?
        <nuxt-link class="underline block" to="/signup"
          >Sign up for free <span>&#8594;</span></nuxt-link
        >
      </h2>
    </section>
    <form
      class="mt-12 w-full sm:max-w-lg sm:mx-auto"
      @submit.prevent.stop
    >
      <fieldset
        class="border-t-2 border-gray-400 flex justify-around"
      >
        <legend class="mx-auto px-4 py-2">Or continue with</legend>
        <button
          class="line-through w-20 h-10"
          type="button"
          value="gitHub"
        >
          GitHub
        </button>
        <button
          type="button"
          class="w-20 h-10"
          @click="loginWithGoogle"
        >
          <app-google-icon class="w-full h-full" />
        </button>
        <button
          class="line-through w-20 h-10"
          type="button"
          value="facebook"
        >
          Facebook
        </button>
      </fieldset>
    </form>
    <app-form-sign
      :is-login="true"
      class="w-full sm:max-w-lg sm:mx-auto"
      @sumbit-form="signInWithEmailPassword"
    >
      <span v-if="loader">Loading...</span>
      <span v-else>Log in</span>
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
      loader: false,
      error: "",
    };
  },
  computed: {
    isError() {
      return this.error.length > 0;
    },
  },
  methods: {
    loginWithGitHub(e) {},
    async loginWithGoogle(e) {
      this.loader = true;
      try {
        var provider = new this.$fireModule.auth.GoogleAuthProvider();
        await this.$fire.auth.signInWithPopup(provider);
        this.$router.replace("/dashboard");
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loader = false;
      }
    },
    loginWithFacebook(e) {},
    signInWithEmailPassword({ email, password, isRemeber }) {
      this.loader = true;
      // TODO handler error on promise chain
      switch (isRemeber) {
        case true:
          this.$fire.auth
            .setPersistence(
              this.$fireModule.auth.Auth.Persistence.LOCAL
            )
            .then(() => {
              return this.$fire.auth.signInWithEmailAndPassword(
                email,
                password
              );
            })
            .then(() => {
              this.$router.replace("/dashboard");
            })
            .catch((e) => (this.error = e.message))
            .finally(() => (this.loader = false));
          break;
        case false:
          this.$fire.auth
            .setPersistence(
              this.$fireModule.auth.Auth.Persistence.SESSION
            )
            .then(() =>
              this.$fire.auth.signInWithEmailAndPassword(
                email,
                password
              )
            )
            .then(() => {
              this.$router.replace({ name: "dashboard" });
            })
            .catch((e) => (this.error = e.message))
            .finally(() => (this.loader = false));
          break;
        default:
      }
    },
  },
};
</script>
