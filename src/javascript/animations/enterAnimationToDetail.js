// import { gsap } from "gsap";

const enterAnimationToDetail = (container) => {
  const header = container.querySelector(".hero-detail__wrapper");
  const image = container.querySelector(".hero-detail__image");

  window.scrollTo(0, 0);

  // Animación título

  gsap.set(".hero-detail__title-wrapper h1", {
    translateY: 400,
    transformOrigin: "bottom"
  });
  gsap.set(image, {
    opacity: 0,
    yPercent: 201
  });

  const tl = gsap.timeline();

  tl.to(header, { visibility: "visible", duration: 0.6 })
    .to(".hero-detail__image", {
      opacity: 1,
      yPercent: 0,
      duration: 0.6,
      ease: "power1.out"
    })
    .to(".hero-detail__title-wrapper h1", {
      visibility: "visible",
      translateY: 0,
      duration: 1,
      ease: "power4.out"
    });
};

export default enterAnimationToDetail;
