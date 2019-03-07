/**
 *  Dependency: components/_scroll.scss
 *
 *
 */

const $dom = {};

const cacheDom = () => {
  $dom.header = $("[js-header-container]");
  $dom.scrollLink = $("[data-scroll-to]");
  $dom.scrollLinkNext = $("[data-scroll-to-next-section]");
};

const scrollTo = ({ currentTarget: self }) => {
  const scrollTarget = $(self).attr("data-scroll-to");
  const $scrollPosition = $(`[data-scroll-position="${scrollTarget}"]`);
  // const offsetAmount = parseInt(offset);
  const scrollOffset = $scrollPosition.offset().top - 150;

  $("body, html").animate(
    {
      scrollTop: scrollOffset
    },
    600
  );
};

const scrollToNextSection = ({ currentTarget: self }) => {
  const $self = $(self);
  const $nextSection = $self.closest(".shopify-section").next();

  const offset = $nextSection.offset().top - $dom.header.height();

  // Scroll to Element
  $("body, html").animate(
    {
      scrollTop: offset
    },
    450
  );
};

const bindUIActions = () => {
  $dom.scrollLink.on("click", scrollTo);
  $dom.scrollLinkNext.on("click", scrollToNextSection);
};

export const lock = menuName => {
  $("html, body").addClass("no-scroll");
};

export const unlock = menuName => {
  $("html, body").removeClass("no-scroll");
};

export const toggle = menuName => {
  $("html, body").toggleClass("no-scroll");
};

export const init = () => {
  console.log("%cinit: Scroll.js", "color: green;");
  cacheDom();
  bindUIActions();
};
