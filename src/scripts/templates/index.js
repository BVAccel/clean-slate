import Slider from "components/Slider";
import "styles/templates/index/index.scss";

Slider.initSubscribers();

document.addEventListener("DOMContentLoaded", () => {});

window.addEventListener("load", () => {
  Slider.initSliders();
});
