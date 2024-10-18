// import { gsap } from "gsap";
//
// console.log("Hello world!");
//
// gsap.to(".box", {
//   duration: 3,
//   rotation: 360,
//   scale: 2,
// });
//
// function mirar() {
//   console.log("Mirar");
// }

// INDEX CARDS IMAGES

document.querySelectorAll(".hero__card--item").forEach((item) => {
  item.addEventListener("mouseover", function () {
    const imageName = this.getAttribute("data-image");
    console.log(imageName);

    // Mostrar imagen que coincida el nombre del archivo con imageName
    const prueba = document
      .querySelectorAll(".card__figure")
      .forEach((figure) => {
        const img = figure.childNodes.item(1);

        if (img && img.tagName === "IMG" && img.src.includes(imageName)) {
          figure.style.display = "block";
          figure.style.transition = "all 5s";
          figure.style.opacity = 1;
          figure.style.transform = "translateX(300px)";
        }
      });
  });

  // To remove image
  item.addEventListener("mouseout", function () {
    document.querySelectorAll(".card__figure").forEach((figure) => {
      figure.style.display = "none";
    });
  });
});
