import gsap from "gsap";
import ScrollTriger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTriger);

export default ({ app }, inject) => {
  inject("scrollTrigger", ScrollTriger);
};
