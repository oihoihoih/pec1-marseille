import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger, TextPlugin } from "gsap/all";
import barba from "@barba/core";

gsap.registerPlugin(ScrollTrigger);

const etapes = document.querySelectorAll(".itinerary");

gsap.from(".itinerary__header", {
  opacity: 0,
  yPercent: 50,
  duration: 1,
  ease: "power2"
});

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

etapes.forEach((etape) => {
  console.log(etape);

  const tl = gsap.timeline().from(etape, {
    opacity: 0,
    yPercent: 20
  });

  ScrollTrigger.create({
    trigger: etape,
    start: "top 90%",
    toggleActions: "play none none reverse",
    animation: tl
  });
});
