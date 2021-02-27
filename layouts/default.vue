<template>
  <div>
    <the-app-header />
    <Nuxt />
    <app-footer />
    <client-only>
      <portal-target name="destination"></portal-target>
      <portal-target name="userMessage"></portal-target>
    </client-only>
  </div>
</template>
<script>
export default {
  computed: {
    isModalOpen() {
      return this.$store.getters.isNavModalOpen;
    },
  },
  watch: {
    isModalOpen(newValue) {
      if (newValue) {
        const scrollY = window.screenY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    },
  },
};
</script>
<style>
body {
  @apply min-w-full;
}
</style>
