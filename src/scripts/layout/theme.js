import PubSub from 'pubsub-js';

import 'lazysizes';
import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import Toggle from 'components/Toggle';
import Overlay from 'components/Overlay';
import InlineCart from 'components/InlineCart';
import CartControls from 'components/CartControls';
import QuantitySelect from 'components/QuantitySelect';

import State from 'state';

import 'styles/theme.scss';
import 'styles/theme.scss.liquid';

PubSub.immediateExceptions = true;

// Common a11y fixes
// focusHash();
// bindInPageLinks();

State.init();

State.initSubscribers();
Toggle.initSubscribers();
Overlay.initSubscribers();
InlineCart.initSubscribers();
CartControls.initSubscribers();
QuantitySelect.initSubscribers();

document.addEventListener('DOMContentLoaded', () => {
  CartControls.bindActions();
  Toggle.bindActions();
  Overlay.bindActions();
  InlineCart.bindActions();
  QuantitySelect.bindActions();
});

window.addEventListener('load', () => {

});
