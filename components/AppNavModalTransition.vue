<template>
  <transition
    :css="false"
    mode="out-in"
    @enter="onEnterNav"
    @leave="onLeaveNav"
  >
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      user: "andelko",
    };
  },
  methods: {
    onEnterNav(el, done) {
      var tl = this.$gsap.timeline({
        defaults: { ease: "circ.out" },
      });
      tl.to(el, {
        opacity: 1,
        duration: 4,
      });
      tl.fromTo(
        el.children[0].children,
        {
          opacity: 0,
          y: 30,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          onComplete: () => {
            this.$store.commit("toggleNavModal", this.isOpen);
            done();
          },
        },
        "<.2"
      );
    },
    onLeaveNav(el, done) {
      var tl = this.$gsap.timeline({
        defaults: { ease: "circ.in" },
      });
      tl.to(el.children[0].children, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
      }).to(
        el,
        {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            this.$store.commit("toggleNavModal", this.isOpen);
            done();
          },
        },
        "<.2"
      );
    },
  },
};
</script>

<style></style>
