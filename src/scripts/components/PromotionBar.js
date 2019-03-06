let $dom = {};
var isCollapsed = Cookies.get("bva_bar_collapsed") === "true";
var isSignedUp = Cookies.get("bva_bar_complete") === "true";

const cacheDom = () => {
  $dom.body = $("body");
  $dom.promoBar = $(".promo-bar");
  $dom.promoForm = $(".promo-form");
  $dom.promoMessage = $(".promo-bar__message");
  $dom.promoOpen = $("[data-promotion-open]");
  $dom.trigger = $("[js-header-trigger]");
};

const media = {
  tablet: 720,
  desktop: 1020
};

// Set cookie and adds animation to remove sign up form (slide up)
const saveCompleteState = function() {
  try {
    Cookies.set("bva_bar_complete", "true");
    showCompletedState();
    $dom.promoBar.addClass("success-state");
    // disablePromoBar();
  } catch (e) {
    console.log("error setting cookie");
  }
};

const enablePromoBar = () => {
  const successState = $dom.promoBar.hasClass("success-state");
  const desktopSize = $(window).width() >= media.desktop;

  if (desktopSize) {
    $(window).on("load", function() {
      setTimeout(function() {
        successState
          ? $dom.body.addClass("promo-open-success")
          : $dom.body.addClass("promo-open");
        $dom.promoBar.slideDown();
      }, 2000);
    });
  }
};

const disablePromoBar = () => {
  Cookies.set("bva_bar_collapsed", "true");
  $dom.body.removeClass("promo-open promo-open-success");

  if ($(window).width() < media.desktop) {
    $dom.promoBar.slideUp(350);
  } else {
    $dom.promoBar.fadeOut();
  }
};

const showCompletedState = () => {
  const successMessage = $dom.promoMessage.attr("data-promotion-message");
  const promoSuccess = `
      <p class="promo-bar__title promo-bar__title--success">${successMessage}</p>
      <button class="promo-form__submit" data-promotion-close>Close</button>`;
  $dom.promoMessage.html(promoSuccess);

  const headerHeight = $(".header").outerHeight();
  if ($(window).width() < media.desktop) {
    $dom.body.addClass("promo-open-success");
  }
};

const togglePromoBar = ({ currentTarget: self }) => {
  let $self = $(self);
  $dom.body.toggleClass("promo-open");
  $dom.promoBar.fadeToggle();
  $self.toggleClass("is-active");
  Cookies.set("bva_bar_collapsed", "true");
};

const bindUIActions = function() {
  $dom.promoForm.on("submit", event => {
    const element = $(event.currentTarget); // the specific element that was clicked
    return Newsletter.validateForm(element);
  });

  $dom.body.on("click", "[data-promotion-close]", disablePromoBar);

  // $dom.promoOpen.on("click", enablePromoBar);

  $dom.trigger.on("click", togglePromoBar);
};

export const success = $form => {
  // $form comes from Klaviyo success callback
  $form.find(".promo-bar__input").css("outline", "none");
  saveCompleteState();
  // hide modal after 2.5 seconds
  setTimeout(() => {
    // disablePromoBar();
  }, 2500);
};

export const init = function() {
  cacheDom();
  bindUIActions();

  //If cookies are not set display email sign up.
  if (!isSignedUp && !isCollapsed) {
    setTimeout(() => {
      enablePromoBar();
    }, 1000);
  }
};
