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
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        transformOrigin: "50% 100%",
        ease: "expo.out",
        onComplete: done,
      });
    },
    animationLeave(el, done) {
      this.$gsap.to(el, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        transformOrigin: "50% 100%",
        ease: "expo.in",
        onComplete: done,
      });
    },
  },
};
</script>
