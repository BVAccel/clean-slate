var miniActive = false;

var miniHeader = function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 20) {
    if (miniActive === true) {
    } else {
      $(".js-header-container").addClass("header-mini");
      miniActive = true;
    }
  } else {
    $(".js-header-container").removeClass("header-mini");
    miniActive = false;
  }
};

var hideMobile = function() {
  if ($(window).width() > 768) {
    $(window).resize(function() {
      $("body").removeClass("drawer-visible");
    });
  }
};

var bindUIActions = function() {
  $(window).scroll(function() {
    miniHeader();
  });
  $(window).resize(function() {
    miniHeader();
  });
};

export const init = function(show) {
  bindUIActions();
  miniHeader();
  hideMobile();
};
