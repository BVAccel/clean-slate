const $dom = {};

const cacheDom = () => {
  $dom.MegaNav = $("[data-meganav]");
  $dom.MegaNavOverlay = $("[data-meganav-overlay]");
};

const bez = () => {
  $.extend({
    bez: function(encodedFuncName, coOrdArray) {
      if ($.isArray(encodedFuncName)) {
        coOrdArray = encodedFuncName;
        encodedFuncName = "bez_" + coOrdArray.join("_").replace(/\./g, "p");
      }
      if (typeof $.easing[encodedFuncName] !== "function") {
        var polyBez = function(p1, p2) {
          var A = [null, null],
            B = [null, null],
            C = [null, null],
            bezCoOrd = function(t, ax) {
              (C[ax] = 3 * p1[ax]),
                (B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax]),
                (A[ax] = 1 - C[ax] - B[ax]);
              return t * (C[ax] + t * (B[ax] + t * A[ax]));
            },
            xDeriv = function(t) {
              return C[0] + t * (2 * B[0] + 3 * A[0] * t);
            },
            xForT = function(t) {
              var x = t,
                i = 0,
                z;
              while (++i < 14) {
                z = bezCoOrd(x, 0) - t;
                if (Math.abs(z) < 1e-3) break;
                x -= z / xDeriv(x);
              }
              return x;
            };
          return function(t) {
            return bezCoOrd(xForT(t), 1);
          };
        };
        $.easing[encodedFuncName] = function(x, t, b, c, d) {
          return (
            c *
              polyBez(
                [coOrdArray[0], coOrdArray[1]],
                [coOrdArray[2], coOrdArray[3]]
              )(t / d) +
            b
          );
        };
      }
      return encodedFuncName;
    }
  });
};

const bindUIActions = function() {
  // Desktop hover meganav functionality
  $dom.MegaNav.on("mouseenter", function(event) {
    $(".main-desktop-header").addClass("main-nav-is-active");
    $dom.MegaNavOverlay.addClass("overlay--active");
  });
  $dom.MegaNav.on("mouseleave", function(event) {
    $dom.MegaNav.removeClass("sub-header--active");
    $(".main-desktop-header").removeClass("main-nav-is-active");
    $dom.MegaNavOverlay.removeClass("overlay--active");

    if ($(window).width() > 992) {
      $(".header-nav-item--sub-menu")
        .removeClass("hover-between--inactive")
        .removeClass("hover-between--active")
        .removeClass("hover-inside--active")
        .addClass("hover-outside--active");
      $(".header-nav-item--sub-menu")
        .stop()
        .clearQueue()
        .animate(
          {
            opacity: 0.0,
            height: 0
          },
          600,
          $.bez([0.33, 1, 0.33, 1]),
          function() {
            $(this).css("visibility", "hidden");
          }
        );
    }
  });

  $(".main-desktop-header").on("mouseenter", function(event) {
    $(this).addClass("main-header-is-active");
  });

  $(".main-desktop-header").on("mouseleave", function(event) {
    $(this).removeClass("main-header-is-active");
    $(this).removeClass("sub-header--active");
  });

  $(".main-desktop-header .js-header-nav--item").on("mouseenter", function(
    event
  ) {
    var shopAllLinkHeight =
      $(this)
        .find(".sub-nav-shop-all-link")
        .outerHeight() || 0;

    var submenuHeight =
      $(this)
        .find(".header-nav-item--sub-images-container")
        .outerHeight() +
      shopAllLinkHeight +
      94;

    if ($(window).width() > 992) {
      if ($dom.MegaNav.hasClass("sub-header--active")) {
        $(this)
          .find(".header-nav-item--sub-menu")
          .css({
            visibility: "visible",
            opacity: "1",
            height: submenuHeight
          });

        $(this)
          .find(".header-nav-item--sub-menu")
          .removeClass("hover-between--inactive")
          .addClass("hover-between--active");
        setTimeout(function() {
          $(".hover-between--inactive").css({
            visibility: "hidden",
            height: "0",
            opacity: "0"
          });
        }, 200);
      } else {
        $(this)
          .find(".header-nav-item--sub-menu")
          .removeClass("hover-between--inactive")
          .removeClass("hover-between--active")
          .removeClass("hover-outside--active")
          .addClass("hover-inside--active");
        $(this)
          .find(".header-nav-item--sub-menu")
          .css("visibility", "visible")
          .stop()
          .clearQueue()
          .animate(
            {
              opacity: 1.0,
              height: submenuHeight
            },
            700,
            $.bez([0.33, 1, 0.33, 1])
          );
      }
    }

    $dom.MegaNav.addClass("sub-header--active");
    $(this).addClass("sub-header-is-active");
  });

  $(".main-desktop-header .js-header-nav--item").on("mouseleave", function(
    event
  ) {
    if ($dom.MegaNav.hasClass("sub-header--active")) {
      $(this)
        .find(".header-nav-item--sub-menu")
        .removeClass("hover-between--active")
        .addClass("hover-between--inactive");
    }
    $(this).removeClass("sub-header-is-active");
  });

  // Mobile meganav functionality
  $(".mobile-navigation .js-header-nav--item").on("click", function(e) {
    $(this).toggleClass("mobile-sub-menu-is-active");
    $(".js-mobile-icon-back, .js-drawer-toggle").toggle();
    $(".js-header-container").toggleClass("main-header-is-active");
  });

  $(".mobile-navigation .js-header-nav--item .header-nav-item--sub-menu").on(
    "click",
    function(e) {
      e.stopPropagation();
    }
  );

  $(".js-mobile-icon-back").on("click", function(e) {
    $(".mobile-navigation .js-header-nav--item").removeClass(
      "mobile-sub-menu-is-active"
    );
    $(".js-mobile-icon-back, .drawer-toggle-icon").toggle();
  });

  $(".drawer-toggle-icon").on("click", function(e) {
    $("body").toggleClass("showing-mobile-drawer");
    $("body").toggleClass("drawer-visible");
    $(".drawer-toggle-icon .icon-cross").toggle();
    $(".drawer-toggle-icon .icon-menu").toggle();
  });
};

export const init = function(show) {
  console.log("%cinit: Meganav.js", "color: green;");
  bez();
  cacheDom();
  bindUIActions();
};
