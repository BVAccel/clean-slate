/**
 *  Dependency: <div class="overlay" data-overlay></div> in theme.liquid,
 *              components/_overlay.scss
 *
 *  Note: _overlay.scss hold the styles for the overlay container
 *  Note: .overlay has a z-index of 1000, so any modal that needs to appear on top
 *        of the overlay need to have an z-index of 1001+
 *
 *
 */

const $dom = {};

const cacheDom = () => {
  $dom.overlay = $("[data-overlay]");
};

export const show = function() {
  return $dom.overlay.fadeIn(300);
};

export const hide = () => {
  return $dom.overlay.fadeOut(300);
};

export const toggle = () => {
  return $dom.overlay.fadeToggle(300);
};

const bindUIActions = () => {
  $dom.overlay.on("click", window.Overlay.hide);
};

export const init = () => {
  cacheDom();
  bindUIActions();
};
