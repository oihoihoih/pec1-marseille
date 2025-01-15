import { gsap } from "gsap";

const leaveAnimationToDetail = (container) => {
  // Elements to hide
  const cards = [...container.querySelectorAll(".card-list__content")];
  const header = container.querySelector(".header");
  const sectionDivider = container.querySelector(".section-divider");

  const tl = gsap.timeline({
    defaults: {
      ease: "expo.inOut",
      duration: 1
    }
  });

  tl.to(cards, {
    yPercent: 50,
    autoAlpha: 0,
    stagger: 0.1
  }).to(
    [header, sectionDivider],
    {
      autoAlpha: 0,
      duration: 1
    },
    0
  );

  return tl;
};

export default leaveAnimationToDetail;
