import { bindInPageLinks, focusHash } from "@shopify/theme-a11y";
import CartControls from "components/CartControls";
import * as DetermineDevice from "components/DetermineDevice";
import * as DetermineIP from "components/DetermineIP";
import * as Header from "components/Header";
import QuantitySelect from "components/QuantitySelect";
import Toggle from "components/Toggle";
import "lazysizes";
import PubSub from "pubsub-js";
import State from "state";
import "styles/theme.scss";
import "styles/theme.scss.liquid";

PubSub.immediateExceptions = true;

// Common a11y fixes
focusHash();
bindInPageLinks();

State.init();

State.initSubscribers();
Toggle.initSubscribers();
// Overlay.initSubscribers();
// InlineCart.initSubscribers();
CartControls.initSubscribers();
QuantitySelect.initSubscribers();

document.addEventListener("DOMContentLoaded", () => {
  CartControls.bindActions();
  Toggle.bindActions();
  // Overlay.bindActions();
  // InlineCart.init();
  QuantitySelect.bindActions();
  DetermineDevice.init();
  DetermineIP.init();
  Header.init();
});

window.addEventListener("load", () => {});

// PubSub.subscribe('BVA', (message, data) => console.log(message, data));

// HMR
// if (module.hot) {
//   module.hot.accept();
// }

// if (module.hot) {
//   module.hot.dispose(() => {
//     // reset/undo the behavior/side effect that as possibly enabled/enacted

//   });
// }
