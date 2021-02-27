<template>
  <main
    class="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 min-h-screen w-full relative"
  >
    <h1 class="text-4xl text-center pt-12 font-bold">Your Tickets</h1>
    <article
      class="relative pt-12 px-6 sm:max-w-xl sm:mx-auto lg:pt-24"
    >
      <ol class="mt-12">
        <li
          class="flex justify-between text-center font-semibold text-lg space-x-2 lg:text-xl"
        >
          <span class="w-4/6 text-left">Event</span>
          <span class="w-1/6">Price</span>
          <span class="w-1/6">Tickets</span>
        </li>
        <li
          v-for="item in getUniqeCart"
          :key="item.name"
          class="flex justify-between space-y-4 items-baseline space-x-2 lg:text-lg"
        >
          <span class="w-4/6">{{ item.item }}</span>
          <span class="w-1/6 text-center text-sm">{{
            item.price
          }}</span>
          <span class="w-1/6 text-center">{{ item.amount }}</span>
        </li>
      </ol>
      <p class="mt-7 flex border-t border-app-orange pt-2">
        <span class="w-2/3 text-3xl font-semibold">Total: </span>
        <span class="text-right w-1/3 text-2xl">{{
          getAmountInDollats(getAmountMoney)
        }}</span>
      </p>
      <app-button-black
        :disabled="getCartAmount === 0"
        class="w-full px-6 py-3 mt-16 text-lg disabled:opacity-30 disabled:cursor-not-allowed md:max-w-xl md:mx-auto md:block"
        @click="buyTicket"
        >Checkout</app-button-black
      >
      <app-button-black
        v-if="getCartAmount !== 0"
        class="absolute top-5 right-6 sm:right-6 px-4 py-2 lg:top-6 lg:right-14 bg-gray-300 dark:bg-gray-800"
        @click="cleanCart"
        >Clean cart</app-button-black
      >
    </article>
    <client-only>
      <portal to="userMessage">
        <app-user-message-transition>
          <lazy-app-user-message
            v-if="isMessage"
            @click="isMessage = !isMessage"
            @click-outside="isMessage = !isMessage"
          >
            <header class="flex flex-col h-full">
              <div class="text-2xl mt-8 sm:text-3xl">
                <span v-if="errorMessage">{{ errorMessage }}</span>
                <span v-else-if="userMessage">{{ userMessage }}</span>
              </div>
              <nuxt-link
                :to="
                  !!errorMessage
                    ? '/login'
                    : !!userMessage
                    ? '/dashboard'
                    : '/'
                "
                class="mt-auto text-3xl sm:text-4xl text-app-orange underline"
              >
                <span v-if="errorMessage">Log in</span>
                <span v-else-if="userMessage">Dashoard</span>
                <span v-else>Home</span>
                <span>&#8594;</span></nuxt-link
              >
            </header>
          </lazy-app-user-message>
        </app-user-message-transition>
      </portal>
    </client-only>
  </main>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isMessage: false,
      errorMessage: "",
      userMessage: "",
    };
  },
  computed: {
    ...mapGetters(["getCartAmount"]),
    getUniqeCart() {
      return this.cart.reduce((acc, next) => {
        var el = acc.find((a) => a.uuid === next.uuid);
        if (typeof el === "undefined") {
          acc.push({
            uuid: next.uuid,
            item: next.title,
            price: next.price,
            amount: 1,
            timeOrder: new Date().toLocaleString(),
          });
        } else {
          el.amount++;
        }

        return acc;
      }, []);
    },
    cart() {
      return this.$store.state.cart;
    },
    getAmountMoney() {
      return this.$store.state.cart.reduce(
        (acc, next) => acc + +next.price,
        0
      );
    },
  },
  watch: {
    isMessage(newValue) {
      if (newValue === false) {
        this.errorMessage = "";
        this.userMessage = "";
      }
    },
  },
  methods: {
    getAmountInDollats(amount) {
      return `$ ${amount.toFixed(2)}`;
    },
    cleanCart() {
      this.$store.commit("cleanCart");
    },
    async buyTicket() {
      if (!this.$store.getters.isLoggedIn) {
        this.errorMessage =
          "You have to be logged in, to make an order.";
        this.isMessage = true;
        return;
      }
      try {
        await this.$fire.firestore.collection("Tickets").add({
          userUid: this.$store.getters.getUser.uid,
          userName: this.$store.getters.getUser.displayName,
          ticket: [...this.getUniqeCart],
          price: this.getAmountMoney,
          dateOrder: new Date().toLocaleString(),
        });
        this.$store.commit("cleanCart");
        this.userMessage =
          "Your purchases have been successfully sent, thank you for shopping";
        this.isMessage = true;
      } catch (e) {
        this.$nuxt.error({
          message: e.message,
          statusCode: 403,
        });
      }
    },
  },
};
</script>

<style></style>
