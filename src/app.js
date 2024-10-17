import { gsap } from "gsap";

console.log("Hello world!");

gsap.to(".box", {
  duration: 3,
  rotation: 360,
  scale: 2,
});

function mirar() {
  console.log("Mirar");
}
