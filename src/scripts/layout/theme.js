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

// State.initSubscribers();
// Toggle.initSubscribers();
// CartControls.initSubscribers();
// QuantitySelect.initSubscribers();

document.addEventListener("DOMContentLoaded", () => {
  SetInternational.init();
  CartControls.bindActions();
  Toggle.bindActions();
  QuantitySelect.bindActions();
  DetermineDevice.init();
  DetermineIP.init();
  Meganav.init();
  Header.init();
  Select3.init();
  PromotionBar.init();
  Newsletter.init();
  MobileImageCheck.init();
  Sliders.init();
});

Flow.set("on", "ready", function() {
  window.isFlowCart = !!Flow.getExperience();

  window.flow.countryPicker.createCountryPicker({});
  window.flow.countryPicker.createCountryPicker({
    containerId: "country-picker-mobile"
  });

  FlowCart.init();
  InlineCart.init({ isFlowCart });
  CartUpsell.init();

  if (isFlowCart) {
    $("head").append(
      '<style type="text/css">[id$="_ribbon_container"] { display: none; }</style>'
    );
    $('a[href="/pages/referral"]')
      .parent()
      .hide();
  } else {
    CartJS.init(window.BVA.cartJSON);
  }
});

window.addEventListener("load", () => {});
