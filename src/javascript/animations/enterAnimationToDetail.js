const enterAnimationToDetail = (container) => {
  const header = container.querySelector(".hero-detail__wrapper");
  const image = container.querySelector(".hero-detail__image");

  window.scrollTo(0, 0);
  // Animación título
  gsap.set(".hero-detail__title-wrapper h1", {
    translateY: 400,
    transformOrigin: "bottom"
  });

  gsap.to(".hero-detail__title-wrapper h1", {
    visibility: "visible",
    translateY: 0,
    duration: 3.5,
    ease: "power4.out"
  });
};

export default enterAnimationToDetail;
