/**
 *
 *   <div class="overlay" data-overlay></div> in theme.liquid
 *
 */

const $dom = {};

const cacheDom = () => {
  $dom.body = $("body");
  $dom.modal = $("[data-modal]");
  $dom.modalShow = $("[data-modal-show]");
  $dom.modalHide = $("[data-modal-hide]");
};

const bindUIActions = () => {
  $dom.modalShow.on("click", function(event) {
    event.preventDefault();
    window.Modal.show($(this).attr("data-modal-show"));
  });
  $dom.modalHide.on("click", function(event) {
    event.preventDefault();
    window.Modal.hide();
  });
};

export const show = modalName => {
  window.Overlay.show();
  window.Scroll.lock();
  $dom.body.attr("data-active-modal", modalName);
  return $('[data-modal="' + modalName + '"]').fadeIn(300);
};

export const hide = () => {
  window.Overlay.hide();
  window.Scroll.unlock();
  $dom.body.removeAttr("data-active-modal");
  return $dom.modal.fadeOut(300);
};

export const init = () => {
  cacheDom();
  bindUIActions();
};
