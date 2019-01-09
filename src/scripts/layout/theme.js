import 'lazysizes';
import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import Toggle from 'components/Toggle';
import Overlay from 'components/Overlay';
import InlineCart from 'components/InlineCart';
import CartControls from 'components/CartControls';
import OptionGroup from 'components/OptionGroup';
import QuantitySelect from 'components/QuantitySelect';
import Price from 'components/Price';
import Slider from 'components/Slider';
import Modal from 'components/Modal';

import State from 'state';

import 'styles/theme.scss';
import 'styles/theme.scss.liquid';

PubSub.immediateExceptions = true;

// Common a11y fixes
focusHash();
bindInPageLinks();

document.addEventListener('DOMContentLoaded', () => {
  State.initSubscribers();
  State.init();

  CartControls.initSubscribers();
  CartControls.bindActions();

  Toggle.initSubscribers();
  Toggle.bindActions();

  Overlay.initSubscribers();
  Overlay.bindActions();

  InlineCart.initSubscribers();
  InlineCart.bindActions();

  OptionGroup.initSubscribers();
  OptionGroup.bindActions();

  QuantitySelect.initSubscribers();
  QuantitySelect.bindActions();

  Price.initSubscribers();

  Slider.initSubscribers();
  Slider.initSliders();

  Modal.initSubscribers();
  Modal.bindActions();
});

window.addEventListener('load', () => {

});

PubSub.subscribe('BVA', (message, data) => console.log(message, data));

// HMR
// if (module.hot) {
//   module.hot.accept();
// }

// if (module.hot) {
//   module.hot.dispose(() => {
//     // reset/undo the behavior/side effect that as possibly enabled/enacted

//   });
// }
