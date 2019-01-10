import 'styles/templates/product.scss';

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
});

window.addEventListener('load', () => {
  Slider.initSliders()
    .then(sliders => Slider.filterSliders())
    .then(sliders => Slider.bindActions());
});
