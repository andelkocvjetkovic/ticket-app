<template>
  <button
    class="bg-gray-200 shadow-md dark:bg-black text-app-orange focus:outline-none font-semibold rounded-md lg:hover:bg-app-orange lg:hover:text-gray-50 lg:dark-hover:text-gray-900 active:bg-yellow-200 transition-all"
    v-on="$listeners"
  >
    <slot>Buy ticket</slot>
  </button>
</template>

<script>
export default {};
</script>
