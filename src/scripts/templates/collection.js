import * as ChangeBackgroundOnProductHover from "components/ChangeBackgroundOnProductHover.js";
import * as Parallax from "components/Parallax";
import "components/_Collection";
import "styles/templates/collection/index.scss";

console.log("collection.js running?");

// Quickshop.initSubscribers();
// Modal.initSubscribers();

document.addEventListener("DOMContentLoaded", () => {
  // Quickshop.bindActions();
  // Modal.bindActions();
  Parallax.init();
  ChangeBackgroundOnProductHover.init();
});

window.addEventListener("load", () => {});
