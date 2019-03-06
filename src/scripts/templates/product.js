import * as Accordion from "components/Accordion";
import * as AffixInParent from "components/AffixInParent.js";
import * as FitGuide from "components/FitGuide";
import Modal from "components/Modal";
import OptionGroup from "components/OptionGroup";
import Price from "components/Price";
import Slider from "components/Slider";
import "styles/templates/product/index.scss";

OptionGroup.initSubscribers();
Price.initSubscribers();
Slider.initSubscribers();
Modal.initSubscribers();

Accordion.init();

document.addEventListener("DOMContentLoaded", () => {
  AffixInParent.init();
  OptionGroup.bindActions();
  Modal.bindActions();
  FitGuide.init();

  Slider.initSliders()
    .then(sliders => Slider.filterSlides())
    .then(sliders => Slider.bindActions());
});

window.addEventListener("load", () => {});
