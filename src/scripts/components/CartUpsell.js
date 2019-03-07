import {
  addClass,
  deepCopy,
  getRandomElementInArray,
  removeClass
} from "components/Utils";

let upsellAdded = false;

const $dom = {};

const cacheDom = () => {
  $dom.upsell = document.querySelector(".inline-cart__upsell");
};

const internationalPrice = id => {
  return new Promise(function(resolve, reject) {
    Flow.variants.load({
      variants: [id],
      experience: Flow.getExperience(),
      success: (status, variants) => {
        resolve(variants[id].prices.item.label);
      }
    });
  });
};

const findGenderFromTitle = string => {
  if (string.toLowerCase().indexOf("women") > -1) {
    return "women";
  }
  if (string.toLowerCase().indexOf("men") > -1) {
    return "men";
  }

  return "unisex";
};

const determineCartSizeAndGender = () => {
  // determines which size and gender is the most frequent
  // of all items within the cart

  const sizes = [];
  const genders = [];

  const sizeScores = [];
  const genderScores = [];

  CartJS.cart.items.forEach(item => {
    const gender = findGenderFromTitle(item.title);
    const size = !Flow.getExperience()
      ? item.variant_options[1]
      : item.variant_title.split(" - ")[1].split("/")[1];

    const indexOfGender = genders.indexOf(gender);
    const indexOfSize = sizes.indexOf(size);

    if (indexOfSize > -1) {
      sizeScores[indexOfSize] = sizeScores[indexOfSize] + item.quantity;
    } else {
      sizes.push(size);
      sizeScores.push(item.quantity);
    }

    if (indexOfGender > -1) {
      genderScores[indexOfGender] = genderScores[indexOfGender] + item.quantity;
    } else {
      genders.push(gender);
      genderScores.push(item.quantity);
    }
  });

  const indexOfMaxSize = sizeScores.indexOf(Math.max(...sizeScores));
  const indexOfMaxGender = genderScores.indexOf(Math.max(...genderScores));

  const size = sizes[indexOfMaxSize];
  let gender = genders[indexOfMaxGender];

  if (gender === "unisex") gender = Math.random() > 0.5 ? "men" : "women";

  return {
    size,
    gender
  };
};

const getAllProductRecommendations = async gender => {
  // Products from the Accessories collection should be offered
  // unless the user has already added a product to their cart
  const handle = `/collections/recommend-${gender}/products.json`;

  const data = await fetch(handle);
  const json = await data.json();

  return json;
};

const filterProductJSONBySize = (productJSON, productSize) => {
  // filters products that don't contain variants that are in stock
  // at the specified size
  const filteredProductJSON = deepCopy(productJSON);

  // if the majority of products are one size (OS)
  // only remove products that are out of stock
  filteredProductJSON.products = filteredProductJSON.products.filter(
    product => {
      let hasSizeInStock = false;

      const filteredVariants = product.variants.filter(variant => {
        if (
          (variant.option2 === productSize ||
            productSize === "OS" ||
            variant.option2 === "OS") &&
          variant.available
        ) {
          hasSizeInStock = true;
          return true;
        }
        return false;
      });

      if (hasSizeInStock) {
        product.variants = filteredVariants;
      }

      return hasSizeInStock;
    }
  );

  return filteredProductJSON;
};

const filterProductsAlreadyInCart = productJSON => {
  const filteredProductJSON = deepCopy(productJSON);

  // for each product in productJSON
  // check if the product.id is in CartJS.cart.items
  const productIdsInCart = CartJS.cart.items.map(item => item.product_id);

  return filteredProductJSON.products.filter(
    product => !productIdsInCart.includes(product.id)
  );
};

// prettier-ignore
const updateUpsell = async (product, variant, isFlowCart) => {
    const { title } = product;
    const { id, featured_image: { src }, option1, option2, price } = variant;
    const localizedPrice = (!isFlowCart) ? penniesToDollars(price) : await internationalPrice(id);

    $dom.upsell.innerHTML = `
    <div class="inline-cart__upsell-img">
      <img src="${src}" alt="${title}">
    </div>
    <div class="inline-cart__upsell-text">
      <div>
        <p>${title}</p>
        <p>${option1}</p>
        <p>${option2}</p>
      </div>
      <p>${localizedPrice}</p>
    </div>
    <div class="inline-cart__upsell-cta" data-add-upsell="${id}">
      <button class="btn btn--striped" data-add-upsell="${id}">Add</button>
    </div>`;

    removeClass($dom.upsell, 'inline-cart__upsell--hidden');
  };

const clearUpsell = () => {
  addClass($dom.upsell, "inline-cart__upsell--hidden");
  $dom.upsell.innerHTML = "";
};

const generateRecommendation = async ({ isFlowCart }) => {
  if (upsellAdded) {
    clearUpsell();
    return;
  }

  const cartInfo = determineCartSizeAndGender();

  const productJSON = await getAllProductRecommendations(cartInfo.gender);
  const productJSONFilteredBySize = filterProductJSONBySize(
    productJSON,
    cartInfo.size
  );

  const productJSONFilteredByAlreadyInCart = filterProductsAlreadyInCart(
    productJSONFilteredBySize
  );

  const product = getRandomElementInArray(productJSONFilteredByAlreadyInCart);

  if (!product) {
    clearUpsell();
    return;
  }

  const variant = getRandomElementInArray(product.variants);

  updateUpsell(product, variant, isFlowCart);
};

const bindUIActions = ({ isFlowCart }) => {
  $(document).on("cart.ready cart.requestComplete", () =>
    generateRecommendation({ isFlowCart })
  );

  window.addEventListener("click", e => {
    if (!e.target.matches("[data-add-upsell]")) return;

    upsellAdded = true;
    const { addUpsell } = e.target.dataset;

    if (isFlowCart) {
      Flow.cart.addItem(addUpsell, 1, {}, FlowCart.genericFlowOptions);
    } else {
      CartJS.addItem(addUpsell, 1);
    }
  });
};

export const init = ({ isFlowCart }) => {
  console.log("%cinit: CartUpsell.js", "color: green;");
  cacheDom();
  bindUIActions({ isFlowCart });
};
