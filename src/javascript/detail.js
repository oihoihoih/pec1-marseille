import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger, TextPlugin } from "gsap/all";
import barba from "@barba/core";

gsap.registerPlugin(ScrollTrigger);

// const animation = gsap
//   .timeline({})
//   .from(".etape__wrapper", { transform: "rotate(0deg)" })
//   .to(".etape__wrapper", { transform: "rotate(5deg)" });

// gsap.utils.toArray(".etape__wrapper").forEach((postcard, index) => {
//   ScrollTrigger.create({
//     trigger: postcard,
//     start: "top top",
//     pin: true,
//     markers: true,
//     pinSpacing: false,
//     animation: animation
//   });
// });
const postcards = document.querySelectorAll(".etape__wrapper");
const postcardHeight = postcards[0].offsetHeight;

postcards.forEach((postcard, index) => {
  // animation.clear();

  const tl = gsap
    .timeline()
    .from(postcard, {
      rotation: 0
    })
    .to(postcard, {
      rotation: gsap.utils.random(-8, 8),
      duration: 0.3
    });

  ScrollTrigger.create({
    trigger: postcard,
    start: "top top",
    pin: true,
    end: () => `+=${(postcards.length - index) * postcardHeight}`,
    scrub: true,
    animation: tl,
    pinSpacing: false
  });
});
