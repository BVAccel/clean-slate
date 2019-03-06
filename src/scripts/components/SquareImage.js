const $dom = {};

const cacheDom = () => {
  $dom.squareImages = [...document.querySelectorAll(".js-square-image")];
};

const resizeImages = images =>
  images.forEach(image => (image.style.height = `${image.offsetWidth}px`));

const addListeners = () => {
  window.addEventListener("DOMContentLoaded", () =>
    resizeImages($dom.squareImages)
  );
  window.addEventListener("resize", () => resizeImages($dom.squareImages));
};

export const init = () => {
  cacheDom();
  addListeners();
};
