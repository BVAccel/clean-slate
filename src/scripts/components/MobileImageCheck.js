const $dom = {};

const cacheDom = () => {
  $dom.MobileImageCheck = $("[data-mobile-image-check]");
};

const MobileImage = currentBg => {
  const mobileSrc = currentBg.attr("data-mobile-image");
  const desktopSrc = currentBg.attr("data-desktop-image");
  if ($(window).width() < 992) {
    if (
      currentBg.css("background-image") != 'url("https:' + mobileSrc + '")' &&
      mobileSrc != ""
    ) {
      currentBg.css("background-image", "url(https:" + mobileSrc + ")");
    }
  } else {
    if (
      currentBg.css("background-image") !=
      'url("https:' + desktopSrc + '")'
    ) {
      currentBg.css("background-image", "url(https:" + desktopSrc + ")");
    }
  }
};

export const init = function() {
  console.log("%cinit: MobileImageCheck.js", "color: green;");

  cacheDom();
  $dom.MobileImageCheck.each(function() {
    let currentBg = $(this);
    MobileImage(currentBg);
    $(window).on("resize", function() {
      MobileImage(currentBg);
    });
  });
};
