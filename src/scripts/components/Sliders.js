const $dom = {};

const cacheDom = () => {
  $dom.FeatureProductMobileSlider = $("[data-mobile-product-slider]");
  $dom.PressSlider = $("[data-press-slider]");
  $dom.PressQuoteSlider = $("[data-press-quote-slider]");
};

const SlidersInit = () => {
  const pressOptions = {
    dots: false,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: $dom.PressQuoteSlider,
    fade: false,
    infinite: false,
    focusOnSelect: true,
    responsive: [
      // {
      //   breakpoint: 992,
      //   settings: {
      //     slidesToShow: 3
      //   }
      // },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  const pressQuoteOptions = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: $dom.PressSlider,
    fade: true,
    autoplay: true,
    autoplaySpeed: 3500,
    infinite: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          autoplay: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          autoplay: false,
          adaptiveHeight: true
        }
      }
    ]
  };

  $dom.PressSlider.slick(pressOptions);
  $dom.PressQuoteSlider.slick(pressQuoteOptions);
};

var slickActive = false;
const MobileSlidersInit = () => {
  const mobileOptions = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    fade: true
  };

  if ($(window).width() < 768) {
    if (slickActive == false) {
      $dom.FeatureProductMobileSlider.slick(mobileOptions);
      slickActive = true;
    }
  } else {
    if (slickActive == true) {
      $dom.FeatureProductMobileSlider.slick("destroy");
    }
    slickActive = false;
  }
};

const bindUIActions = () => {};

export const init = function() {
  cacheDom();
  SlidersInit();
  $(window).on("load", function() {
    MobileSlidersInit();
  });
  $(window).resize(function() {
    MobileSlidersInit();
  });
  bindUIActions();
};
