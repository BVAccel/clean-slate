import * as Accordion from "components/Accordion";
import * as FitGuide from "components/FitGuide";
// import Modal from "components/Modal";
// import OptionGroup from "components/OptionGroup";
import * as PDP from "components/PDP";
// import Price from "components/Price";
// import Slider from "components/Slider";
import * as SquareImage from "components/SquareImage";
import * as YotpoApp from "components/YotpoApp";
import * as YotpoUGC from "components/YotpoUGC";
// import "styles/templates/product/index.scss";

// OptionGroup.initSubscribers();
// Modal.initSubscribers();
// Price.initSubscribers();
// Slider.initSubscribers();

document.addEventListener("DOMContentLoaded", () => {
  // Modal.bindActions();
  // OptionGroup.bindActions();
  Accordion.init();
  PDP.init();
  YotpoApp.init();
  YotpoUGC.init();
  SquareImage.init();
  FitGuide.init();

  // Slider.initSliders()
  //   .then(sliders => Slider.filterSlides())
  //   .then(sliders => Slider.bindActions());
});

window.addEventListener("load", () => {});
