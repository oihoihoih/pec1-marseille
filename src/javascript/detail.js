import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const wrapper = document.querySelectorAll(".etape__wrapper");
const postcards = document.querySelectorAll(".etape__postcard");
//const wrapperHeight = wrapper[0].offsetHeight;
const colors = ["red", "green", "blue", "yellow", "fuchsia", "pink", "orange"];
const totalHeight = document.querySelector(".itinerary__wrapper").offsetHeight;

postcards.forEach((postcard, index) => {
  // animation.clear();
  const prueba = postcard.querySelector(".etape__postcard");
  const tl = gsap
    .timeline()
    .from(postcard, {
      rotation: 0
    })
    .to(postcard, {
      rotation: gsap.utils.random(-8, 8),
      duration: 0.1
    });

  ScrollTrigger.create({
    markers: { endColor: `${colors[index]}` },
    trigger: postcard,
    start: "top 20%",
    pin: true,
    end: () =>
      `+=${totalHeight - wrapper[index].offsetHeight * index - wrapper[index].offsetHeight}`,
    animation: tl,
    pinSpacing: false
  });
});
