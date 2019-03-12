import CartControls from "components/CartControls";
import * as CartUpsell from "components/CartUpsell";
import * as DetermineDevice from "components/DetermineDevice";
import * as DetermineIP from "components/DetermineIP";
import * as FlowCart from "components/FlowCart";
import * as Header from "components/Header";
import * as InlineCart from "components/InlineCart";
import * as Meganav from "components/Meganav";
import * as MobileImageCheck from "components/MobileImageCheck";
import * as Newsletter from "components/Newsletter";
import * as PromotionBar from "components/PromotionBar";
import QuantitySelect from "components/QuantitySelect";
import * as Select3 from "components/Select3";
import * as SetInternational from "components/SetInternational";
import * as Sliders from "components/Sliders";
import Toggle from "components/Toggle";
import "lazysizes";
import PubSub from "pubsub-js";
import State from "state";
import "styles/theme.scss";
import "styles/theme.scss.liquid";

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
  Header.init();
  Meganav.init();
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
    init();
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
