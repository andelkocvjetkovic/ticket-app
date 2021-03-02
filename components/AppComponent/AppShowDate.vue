<template>
  <h2 class="">
    <span
      >{{ getDay(dateStart) }}
      -
      {{ getDay(dateEnd) }}</span
    >
    <span>{{ getMonth(dateStart) }}</span>
    <span>{{ getYear(dateStart) }}</span>
  </h2>
</template>

<script>
export default {
  props: {
    dateStart: {
      type: String,
      required: true,
    },
    dateEnd: {
      type: String,
      required: true,
    },
  },
  methods: {
    getDay(date) {
      return new Date(date).getDate();
    },
    getMonth(date) {
      return new Date(date).toLocaleDateString("en-US", {
        month: "long",
      });
    },
    getYear(date) {
      return new Date(date).getFullYear();
    },
  },
};
</script>

<style></style>
