import { addClass, is_touch_device, removeClass } from "components/Utils.js";

const setHovers = () => {
  const hoverImage = document.querySelector(".plp__hover-image");
  const headings = document.querySelector(".plp__headings");
  const products = [...document.querySelectorAll(".plp__product")];

  products.forEach((product, index) => {
    product.addEventListener("mouseenter", e => {
      const url = e.target.dataset.hoverImage.trim();

      hoverImage.style.backgroundImage = `url("${url}")`;

      addClass(hoverImage, "plp__hover-image--active");
      addClass(headings, "plp__headings--hide");

      // hide all products except the one currently being hovered
      products.forEach((product2, index2) => {
        if (index === index2) {
          removeClass(product2, "plp__product--hide");
        } else {
          addClass(product2, "plp__product--hide");
        }
      });
    });

    product.addEventListener("mouseleave", e => {
      removeClass(hoverImage, "plp__hover-image--active");
      removeClass(headings, "plp__headings--hide");

      products.forEach(product => removeClass(product, "plp__product--hide"));
    });
  });
};

export const init = () => {
  console.log("%cinit: ChangeBackgroundOnProductHover.js", "color: green;");
  if (!is_touch_device()) {
    setHovers();
  }
};
