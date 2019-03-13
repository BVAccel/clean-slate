import * as CartPage from "components/CartPage.js";
import "styles/templates/cart/index.scss";

Flow.set("on", "ready", function() {
  CartPage.init({ isFlowCart: window.isFlowCart });
});

window.addEventListener("load", () => {});
