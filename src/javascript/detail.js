// import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const wrapper = document.querySelectorAll(".etape__wrapper");
const postcards = document.querySelectorAll(".etape__postcard");
const totalHeight = document.querySelector(".itinerary__wrapper").offsetHeight;

postcards.forEach((postcard, index) => {
  const tl = gsap
    .timeline()
    .from(postcard, {
      rotation: 0
    })
    .to(postcard, {
      rotation: gsap.utils.random(-6, 6),
      duration: 0.1
    });

  ScrollTrigger.create({
    // markers: true,
    trigger: postcard,
    start: "center 50%",
    pin: true,
    end: () =>
      `+=${totalHeight - wrapper[index].offsetHeight * index - wrapper[index].offsetHeight}`,
    animation: tl
  });
});
