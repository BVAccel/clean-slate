import 'styles/templates/product/index.scss';

import OptionGroup from 'components/OptionGroup';
import Price from 'components/Price';
import Slider from 'components/Slider';
import Modal from 'components/Modal';

OptionGroup.initSubscribers();
Price.initSubscribers();
Slider.initSubscribers();
Modal.initSubscribers();

document.addEventListener('DOMContentLoaded', () => {
  OptionGroup.bindActions();
  Modal.bindActions();

  Slider.initSliders()
    .then((sliders) => Slider.filterSlides())
    .then((sliders) => Slider.bindActions());
});

window.addEventListener('load', () => {});
