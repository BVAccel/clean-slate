import * as ChangeBackgroundOnProductHover from "components/ChangeBackgroundOnProductHover.js";
import "components/_Collection";
import "styles/templates/collection/index.scss";

// Quickshop.initSubscribers();
// Modal.initSubscribers();

document.addEventListener("DOMContentLoaded", () => {
  // Quickshop.bindActions();
  // Modal.bindActions();
  ChangeBackgroundOnProductHover.init();
});

window.addEventListener("load", () => {});
