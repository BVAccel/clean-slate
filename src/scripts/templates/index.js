import 'styles/templates/index/index.scss';

import Slider from 'components/Slider';

Slider.initSubscribers();

document.addEventListener('DOMContentLoaded', () => {

});

window.addEventListener('load', () => {
  Slider.initSliders();
});
