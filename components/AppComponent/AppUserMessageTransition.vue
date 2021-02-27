<template>
  <transition
    :css="false"
    @enter="animationEnter"
    @leave="animationLeave"
    ><slot></slot
  ></transition>
</template>

<script>
export default {
  methods: {
    animationEnter(el, done) {
      this.$gsap.from(el, {
        opacity: 0,
        duration: 1,
        onComplete: done,
      });
    },
    animationLeave(el, done) {
      this.$gsap.to(el, {
        opacity: 0,
        duration: 1,
        onComplete: done,
      });
    },
  },
};
</script>
