<template>
  <main
    class="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 min-h-screen w-full"
  >
    <article class="pt-6 px-6 relative sm:max-w-lg sm:mx-auto">
      <header class="mt-8 sm:mt-12">
        <h1 class="text-center text-2xl">
          Welcome
          <span class="lg:text-4xl mt-4 block">{{
            user.displayName
          }}</span>
        </h1>
      </header>
      <section class="mt-6 sm:mt-10">
        <img
          :src="[userImage ? userImage : '/user-anyo.png']"
          alt="User photo"
          class="w-24 h-24 rounded-md"
        />
        <div
          v-if="nameChanged || emailChanged"
          class="mt-6 text-center text-red-500"
        >
          Save changes before leave this page
        </div>
        <div
          v-for="(err, i) in errror"
          :key="i"
          class="text-red-500 mt-4"
        >
          {{ err }}
        </div>
        <form action="#" class="mt-8" @submit.prevent="updateUser">
          <fieldset
            class="border border-black dark:border-white px-4 py-6"
          >
            <legend class="text-lg font-semibold">
              Your Information
            </legend>
            <div class="flex items-center">
              <label class="w-2/12 text-sm" for="name">Name: </label>
              <input
                id="name"
                ref="nameInput"
                v-model.lazy.trim="name"
                name="name"
                :disabled="!isEdit"
                class="w-10/12 bg-transparent focus:ring-1 focus:ring-offset-app-orange focus:border-app-orange border-none ring-transparent focus:ring-app-orange"
                type="text"
                minlength="3"
              />
            </div>
            <div class="flex items-center">
              <label class="w-2/12 text-sm" for="email"
                >Email:
              </label>
              <input
                id="email"
                v-model.lazy.trim="email"
                name="email"
                :disabled="!isEdit"
                class="w-10/12 bg-transparent focus:ring-1 focus:ring-offset-app-orange focus:border-app-orange border-none ring-transparent focus:ring-app-orange"
                type="email"
                maxlength="64"
              />
            </div>
            <app-button-black
              v-if="isEdit"
              type="submit"
              class="bg-gray-200 text-gray-800 py-2 px-6 disabled:opacity-40 mt-6"
              :disabled="!nameChanged && !emailChanged"
            >
              Save Changes</app-button-black
            >
          </fieldset>
        </form>
        <app-button-black
          type="button"
          class="bg-gray-200 text-gray-800 py-2 px-6 absolute top-3 right-3"
          @click="editMode"
        >
          <span v-if="!isEdit">Update your profile</span
          ><span v-else>Cancel</span></app-button-black
        >
      </section>
    </article>
    <article class="py-12 px-6 sm:max-w-lg sm:mx-auto">
      <h1 class="text-2xl text-center font-semibold lg:text-4xl">
        Your ticket :
      </h1>
      <section class="mt-6">
        <div class="flex justify-between lg:text-xl">
          <span class="w-2/3">Events: </span>
          <span class="w-1/3 text-center">Tickets:</span>
        </div>
        <div v-for="(order, i) in tickets" :key="i" class="mt-6">
          <h3>Order: {{ i + 1 }}</h3>
          <p
            v-for="ticket in order.ticket"
            :key="ticket.uuid"
            class="flex justify-between"
          >
            <span class="w-2/3">{{ ticket.item }}</span>
            <span class="text-center w-1/3">{{ ticket.amount }}</span>
          </p>
          <div
            class="flex border-t border-app-orange pt-1 lg:border-t-2"
          >
            <span class="w-2/3">Price: </span>
            <span class="w-1/3 text-center">$ {{ order.price }}</span>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
export default {
  middleware({ store, redirect, $fire }) {
    if (
      !store.getters.isLoggedIn &&
      Object.is($fire.auth.currentUser, null)
    ) {
      return redirect("/login");
    }
  },
  async asyncData({ $fire: fire, store }) {
    var dataFirestore = await fire.firestore
      .collection("Tickets")
      // eslint-disable-next-line yoda
      .where(
        "userUid",
        "==",
        `${store.getters.getUser.uid || fire.auth.currentUser?.uid}`
      )
      .orderBy("dateOrder", "desc")
      .get();
    var tickets = [];
    dataFirestore.forEach((doc) => {
      var data = doc.data();
      tickets.push({
        id: doc.id,
        ticket: data.ticket,
        price: data.price,
      });
    });
    return { tickets };
  },
  data() {
    return {
      name: this.$store.getters.getUserName,
      email: this.$store.getters.getUserEmail,
      isEdit: false,
      errror: [],
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    userImage() {
      return this.$store.getters.getUserPhoto;
    },
    nameChanged() {
      return this.name != this.user.displayName;
    },
    emailChanged() {
      return this.email != this.user.email;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  watch: {
    isLoggedIn(newValue) {
      if (newValue === false) {
        this.$router.replace("/login");
      }
    },
  },
  methods: {
    editMode() {
      if (this.isEdit) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
        this.$nextTick(() => {
          this.$refs.nameInput.focus();
        });
      }
    },
    async updateUser() {
      if (!this.$store.getters.isLoggedIn) {
        this.$nuxt.error({
          message:
            "Please first log in then, change your personal information",
          statusCode: 403,
        });
      } else if (this.name.length < 3) {
        this.errror.push("Name must containt at least 3 character");
      } else {
        const user = this.$fire.auth.currentUser;
        try {
          if (this.nameChanged) {
            await user.updateProfile({
              displayName: this.name,
            });

            this.$store.commit("updateName", { name: this.name });
          }
          if (this.emailChanged) {
            await user.updateEmail(this.email);
            this.$store.commit("updateEmail", { email: this.email });
          }
        } catch (e) {
          this.errror.push(e.message);
        } finally {
          this.isEdit = false;
        }
      }
    },
  },
};
</script>

<style></style>
