import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// const postcards = document.querySelectorAll(".etape__wrapper");
// const postcardHeight = postcards[0].offsetHeight;
//
// postcards.forEach((postcard, index) => {
//   // animation.clear();
//
//   const tl = gsap
//     .timeline()
//     .from(postcard, {
//       rotation: 0
//     })
//     .to(postcard, {
//       rotation: gsap.utils.random(-8, 8),
//       duration: 0.3
//     });
//
//   ScrollTrigger.create({
//     markers: true,
//     trigger: postcard,
//     start: "top top",
//     pin: true,
//     end: () => `+=${(postcards.length - index) * postcardHeight - postcardHeight}`,
//     scrub: true,
//     animation: tl,
//     pinSpacing: false
//   });
// });
