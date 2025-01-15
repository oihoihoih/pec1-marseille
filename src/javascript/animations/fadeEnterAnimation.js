// import { gsap } from "gsap";

const fadeEnterAnimation = (container) => {
  window.scrollTo(0, 0);
  gsap.to(container.container, {
    opacity: 1
  });
};

export default fadeEnterAnimation;
