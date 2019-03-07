import { addClass, removeClass, toggleClass } from "components/Utils";

let variants;

const $dom = {};

const cacheDom = () => {
  variants = window.productJSON.variants;
  $dom.firstAvailableOrSelected = document.querySelector(
    ".pdp__option:checked"
  );
  $dom.options = [
    ...document.querySelectorAll('.pdp__options input[type="radio"]')
  ];
  $dom.productSlider = $(".pdp .slick");
  $dom.shipping = document.querySelector(".shipping");
  $dom.sizing = document.querySelector(".sizing");
  $dom.sizingTable = document.querySelector(".sizing__table");
  $dom.changeUnitButton = document.querySelectorAll(".sizing__unit");
  $dom.shippingToggles = [
    ...document.querySelectorAll("[data-shipping-toggle]")
  ];
  $dom.addToCartBtn = document.querySelector(".pdp__add-to-cart");
  $dom.priceWrapper = $dom.addToCartBtn.querySelector(
    ".pdp__add-to-cart-price"
  );
};

const initProductSlider = () => {
  $dom.productSlider.slick({
    fade: true,
    dots: true,
    prevArrow: `<div class="slick__arrow slick__arrow--prev"></div>`,
    nextArrow: `<div class="slick__arrow slick__arrow--next"></div>`
  });
};

const slideToSelection = () => {
  const checkedInputs = [
    ...document.querySelectorAll('input[type="radio"]:checked')
  ];
  const slides = [
    ...document.querySelectorAll(".pdp .slick .slick-slide:not(.slick-cloned)")
  ];

  const matchScores = new Array(slides.length).fill(0);

  checkedInputs.forEach(input => {
    // first get the product option and it's value
    const { optionName } = input.dataset;
    const { value } = input;

    slides.forEach((slide, index) => {
      const altText = slide.querySelector("img").getAttribute("alt");

      // support matching for PascalCase, camelCase, snake_case, spinal-case
      const match = altText.match(
        new RegExp(
          `${optionName}:(${value}|
                  ${value.split(" ").join("")}|
                  ${value.split(" ").join("-")}|
                  ${value.split(" ").join("_")})`,
          "im"
        )
      );

      // if the product image alt text matches the current select option:value
      // increment its match score
      if (match !== null) ++matchScores[index];
    });
  });

  const indexOfMax = matchScores.indexOf(Math.max(...matchScores));

  let slickIndex = "";

  if (indexOfMax > -1 && matchScores[indexOfMax] > 0) {
    slickIndex = slides[indexOfMax].dataset.slickIndex;

    if (slickIndex) {
      $dom.productSlider.slick("slickGoTo", parseInt(slickIndex, 10));
    }
  }
};

const initResponsiveSlick = () => {
  if (window.innerWidth < 768) {
    const slider = $(".slick-responsive--sm:not(.slick-initialized)");

    if (slider) {
      slider.slick({
        dots: true,
        arrows: false
      });
    }
  } else {
    const slider = $(".slick-responsive--sm.slick-initialized");

    if (slider) {
      slider.slick("unslick");
    }
  }

  if (window.innerWidth < 1024) {
    const slider = $(".slick-responsive--md:not(.slick-initialized)");

    if (slider) {
      slider.slick({
        dots: true,
        arrows: false
      });
    }
  } else {
    const slider = $(".slick-responsive--md.slick-initialized");

    if (slider) {
      slider.slick("unslick");
    }
  }
};

const updateCartButton = data => {
  if (data && data[0]) {
    const { id, available, price } = data[0];

    $dom.addToCartBtn.dataset.cartAdd = id;

    if (!available) {
      $dom.addToCartBtn.setAttribute("disabled", "disabled");
    } else {
      $dom.addToCartBtn.removeAttribute("disabled");
    }

    if (Flow.getExperience()) return;

    $dom.priceWrapper.innerHTML = "";
    $dom.priceWrapper.appendChild(
      document.createTextNode(`${penniesToDollars(price)} - Add To Cart`)
    );
  } else {
    $dom.addToCartBtn.setAttribute("disabled", "disabled");
  }
};

const abbreviationToLongForm = size => {
  let value = null;

  switch (size) {
    case "XS":
      value = "X-Small";
      break;
    case "S":
      value = "Small";
      break;
    case "M":
      value = "Medium";
      break;
    case "L":
      value = "Large";
      break;
    case "XL":
      value = "X-Large";
      break;
    case "2XL":
      value = "2X-Large";
      break;
    case "3XL":
      value = "3X-Large";
    default:
      value = size;
  }

  return value;
};

const setLabelValues = allCheckedOptions => {
  allCheckedOptions.map(option => {
    let { name, value } = option;
    const element = document.querySelector(`[data-value-for="${name}"]`);

    const longForm = abbreviationToLongForm(value);

    // set the value of labels
    if (element) {
      element.innerHTML = "";
      element.appendChild(document.createTextNode(longForm));
    }
  });
};

const disableOutOfStockOptions = lastCheckedOption => {
  const numFromString = aString => aString.match(/\d+/)[0];

  const variantsWithLastCheckedOption = variants.filter(
    variant => variant[lastCheckedOption.property] === lastCheckedOption.value
  );

  const otherOptions = $dom.options.filter(
    option =>
      numFromString(option.name) > numFromString(lastCheckedOption.property)
  );

  otherOptions.forEach(option => {
    const { name, value } = option;

    const variantIndex = variantsWithLastCheckedOption.findIndex(variant => {
      return variant[name] === value;
    });

    const isVariantAvailable =
      variantIndex > -1 &&
      variantsWithLastCheckedOption[variantIndex].available;

    removeClass(option, "pdp__option--oos");
    if (!isVariantAvailable) {
      addClass(option, "pdp__option--oos");
    }
  });
};

const disableInitialOutOfStockOptions = () => {
  const availableVariants = variants.filter(variant => variant.available);

  const firstOptions = $dom.options.filter(option => option.name === "option1");

  firstOptions.forEach(option => {
    const { name, value } = option;

    const variantIndex = availableVariants.findIndex(variant => {
      return variant[name] === value;
    });

    addClass(option, "pdp__option--oos");
    if (variantIndex > -1) {
      removeClass(option, "pdp__option--oos");
    }
  });
};

const findSelectedVariant = optionValues => {
  return variants.filter(variant => {
    let isMatch = true;

    optionValues.forEach(optionValue => {
      if (variant[optionValue.property] !== optionValue.value) {
        isMatch = false;
      }
    });

    return isMatch;
  });
};

const onOptionsChange = e => {
  const allCheckedOptions = [
    ...document.querySelectorAll('.pdp__options input[type="radio"]:checked')
  ];

  // get the selected option name and it's value
  const optionValues = allCheckedOptions.map(option => ({
    property: option.name,
    value: option.value
  }));

  const lastCheckedOption = {
    property: e.target.name,
    value: e.target.value
  };

  disableOutOfStockOptions(lastCheckedOption);

  setLabelValues(allCheckedOptions);

  updateCartButton(findSelectedVariant(optionValues));
};

const addListeners = () => {
  // when an option is selected slide to the selection (if match is found)
  document.addEventListener("click", e => {
    if (!e.target.matches('.pdp__options input[type="radio"]')) return;
    slideToSelection();
  });

  // toggle sizing table section
  document.addEventListener("click", async e => {
    // console.log("$dom.sizingTable.classList", $dom.sizingTable.classList)
    // console.log("e.target", e.target)
    if (!e.target.matches("[data-sizing-unit]")) return;
    await FitGuide.replaceWithCustomContent();
    if ($dom.sizingTable.classList.contains("sizing__table--in")) {
      removeClass($dom.sizingTable, "sizing__table--in");
      addClass($dom.sizingTable, "sizing__table--cm");
    } else {
      removeClass($dom.sizingTable, "sizing__table--cm");
      addClass($dom.sizingTable, "sizing__table--in");
    }
  });

  document.addEventListener("click", e => {
    if (!e.target.matches("[data-shipping-toggle]")) return;
    toggleClass($dom.shipping, "shipping--toggled");
    toggleClass(document.documentElement, "modal-open");
  });

  // toggle shipping options section
  document.addEventListener("click", async e => {
    if (!e.target.matches("[data-sizing-toggle]")) return;
    await FitGuide.replaceWithCustomContent();
    toggleClass($dom.sizing, "sizing--toggled");
    toggleClass(document.documentElement, "modal-open");
  });

  // render responsive slick sliders if the viewport size matches criteria
  window.addEventListener("resize", initResponsiveSlick);
  window.addEventListener("DOMContentLoaded", initResponsiveSlick);

  // anytime an option is changed
  $dom.options.forEach(el => el.addEventListener("change", onOptionsChange));
};

export const init = () => {
  console.log("%cinit: PDP.js", "color: green;");

  cacheDom();
  addListeners();
  initProductSlider();
  onOptionsChange({
    target: {
      value: $dom.firstAvailableOrSelected.value,
      name: $dom.firstAvailableOrSelected.name
    }
  });
  disableInitialOutOfStockOptions();
};
