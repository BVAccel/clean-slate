import { delegateEvent } from "components/Utils.js";

const $dom = {};

const cacheDom = () => {
  $dom.root = document.querySelector(".ugc");
  $dom.defaultSlider = document.querySelector(".ugc__main");
  $dom.modalDetailsSlider = document.querySelector(".ugc__details");
  $dom.modalImagesSlider = document.querySelector(".ugc__images");
};

const getYotpoData = () => {
  return fetch(
    "https://yotpo-seed-all.herokuapp.com/yotpo-fetch-user-photos?shop=www.orosapparel.com&pid=1385335291991",
    {
      headers: {
        "Content-type": "application/json",
        accept: "application/json"
      }
    }
  )
    .then(res => res.json())
    .then(json => json.splice(0, 5))
    .catch(err => console.error(err));
};

const getAllProducts = () => {
  return fetch("/products.json", {
    headers: {
      "Content-type": "application/json",
      accept: "application/json"
    }
  })
    .then(res => res.json())
    .then(json => json.products)
    .catch(err => console.error(err));
};

const createDefaultSliderMarkup = data =>
  data
    .map(
      (post, index) => `
        <div class="ugc__main-slide" data-goto-customer-image="${index}" data-toggle-ugc-modal>
          <img src="${post.low_resolution}" alt="" />
          <a href="${post.original_image_url}" class="ugc__link">
            @${post.post.user_name}
          </a>
        </div>
    `
    )
    .join("");

const createImagesSliderMarkup = data =>
  data
    .map(
      post => `
            <img class="ugc__images-slide" src="${
              post.standard_resolution
            }" alt="${!!post.post ? post.post.content : ""}" />
        `
    )
    .join("");

const makeHashTagsLinks = string => {
  const regex = new RegExp(/#\w+/g);
  return string.replace(
    regex,
    match =>
      `<a target="_blank" rel="noreferrer" href="https://www.instagram.com/explore/tags/${match.slice(
        1
      )}">${match}</a>`
  );
};

const createDetailsSliderMarkup = (reviews, allProducts) =>
  reviews
    .map(post => {
      let taggedProduct = "";

      hasTaggedProduct: if (post.tagged_products && post.tagged_products[0]) {
        // eslint-disable-next-line camelcase
        const { product_id } = post.tagged_products[0];

        // eslint-disable-next-line camelcase
        const indexOfProduct = allProducts.findIndex(
          // eslint-disable-next-line camelcase
          product => +product.id === +product_id
        );

        if (!indexOfProduct) {
          break hasTaggedProduct;
        }

        const product = allProducts[indexOfProduct];

        taggedProduct = `
            <div class="ugc__tagged">
              <img class="ugc__tagged-image" src="${
                product.images[0].src
              }" alt="${product.handle}" />

              <div class="ugc__tagged-text">
                <h4 class="ugc__tagged-title">${product.title}</h4>
                <a class="ugc__tagged-link" href="/products/${
                  product.handle
                }">Shop Now</a>
              </div>
            </div>
          `;
      }

      return `
          <div class="ugc__details-slide">
            <div class="ugc__post-wrap">
              <div class="ugc__post">
                <h3 class="ugc__post-heading">${
                  post.post.user_name ? `@${post.post.user_name}` : ""
                }</h3>
                <p class="ugc__post-content">
                  ${
                    post.post.content
                      ? makeHashTagsLinks(post.post.content)
                      : ""
                  }
                </p>
              </div>
              ${taggedProduct}
            </div>
          </div>
        `;
    })
    .join("");

const initSliders = () => {
  $($dom.defaultSlider).slick({
    mobileFirst: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
          arrows: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
          arrows: true
        }
      }
    ]
  });
};

const goToSlide = int => {
  $($dom.defaultSlider).slick("slickGoTo", int, true);
  // the details slider is synced (via asNavFor) to images slider
  $($dom.modalImagesSlider).slick("slickGoTo", int, true);
};

const bindUIActions = () => {
  delegateEvent(window, "click", "[data-toggle-ugc-modal]", () => {
    toggleClass($dom.root, "ugc--toggled");

    // we must explicitly resize, because slick doesnt do this automatically when hidden
    $(".ugc__images:not(.slick-initialized)")
      .slick({
        asNavFor: $(".ugc__details"),
        prevArrow:
          '<div class="slick__arrow slick__arrow--prev slick-arrow"></div>',
        nextArrow:
          '<div class="slick__arrow slick__arrow--next slick-arrow"></div>'
      })
      .on("setPosition", function(event, slick) {
        slick.$slideTrack.css("height", `${slick.$slider.height()}px`);
        slick.$slides.css("height", `${slick.$slideTrack.height()}px`);
      });

    $(".ugc__details:not(.slick-initialized)")
      .slick({
        arrows: false,
        asNavFor: $(".ugc__images"),
        fade: true
      })
      .on("beforeChange", (e, slick, currentSlide, nextSlide) => {
        const nextSlideEl = slick.$slides[nextSlide].querySelector(
          ".ugc__post-wrap"
        );

        nextSlideEl.scrollTop = 0;
      });
  });

  delegateEvent(window, "click", "[data-goto-customer-image]", e => {
    const { slickIndex } = e.delegateTarget.dataset;
    goToSlide(slickIndex);
  });
};

export const init = () => {
  cacheDom();
  if (!$dom.defaultSlider) {
    return;
  }

  Promise.all([getAllProducts(), getYotpoData()])
    .then(([allProducts, yotpoData]) => {
      $dom.defaultSlider.innerHTML = createDefaultSliderMarkup(yotpoData);
      $dom.modalImagesSlider.innerHTML = createImagesSliderMarkup(yotpoData);
      $dom.modalDetailsSlider.innerHTML = createDetailsSliderMarkup(
        yotpoData,
        allProducts
      );

      initSliders();
      bindUIActions();
    })
    .catch(err => {
      console.error({ errors: [err] });
    });
};
