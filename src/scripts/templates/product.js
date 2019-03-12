import * as Accordion from "components/Accordion";
import * as AffixInParent from "components/AffixInParent.js";
import * as FitGuide from "components/FitGuide";
// import Modal from "components/Modal";
// import OptionGroup from "components/OptionGroup";
import * as PDP from "components/PDP";
import Price from "components/Price";
import Slider from "components/Slider";
import * as SquareImage from "components/SquareImage";
import * as YotpoApp from "components/YotpoApp";
import * as YotpoUGC from "components/YotpoUGC";
import "styles/templates/product/index.scss";

// OptionGroup.initSubscribers();
// Modal.initSubscribers();
Price.initSubscribers();
Slider.initSubscribers();

Accordion.init();

document.addEventListener("DOMContentLoaded", () => {
  // Modal.bindActions();
  // OptionGroup.bindActions();
  PDP.init();
  YotpoApp.init();
  YotpoUGC.init();
  SquareImage.init();
  AffixInParent.init();
  FitGuide.init();
  // SetInternational.init();

  Slider.initSliders()
    .then(sliders => Slider.filterSlides())
    .then(sliders => Slider.bindActions());
});

window.addEventListener("load", () => {});
