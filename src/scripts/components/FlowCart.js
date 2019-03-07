import * as CartUpsell from "components/CartUpsell";
import * as InlineCart from "components/InlineCart";
/**
 *  Dependency: <div class="Flow" data-Flow></div> in theme.liquid,
 *              components/_Flow.scss
 *
 *  Note: _Flow.scss hold the styles for the Flow container
 *  Note: .Flow has a z-index of 1000, so any modal that needs to appear on top
 *        of the Flow need to have an z-index of 1001+
 *
 *
 */

const dom = {
  checkoutLink: 'a[href="/checkout"]',
  addToCart: "[data-cart-add]"
};

Flow.set("on", "ready", function() {
  window.isFlowCart = Flow.getExperience() ? true : false;

  window.flow.countryPicker.createCountryPicker({});
  window.flow.countryPicker.createCountryPicker({
    containerId: "country-picker-mobile"
  });

  InlineCart.init({ isFlowCart });
  CartUpsell.init({ isFlowCart });

  if (isFlowCart) {
    console.log(`using flowcart instead of cartjs`);

    $("head").append(
      '<style type="text/css">[id$="_ribbon_container"] { display: none; }</style>'
    );
    $('a[href="/pages/referral"]')
      .parent()
      .hide();
  } else {
    CartJS.init(window.BVA.cartJSON);
  }
});

export const genericFlowOptions = {
  success: (status, data) => {
    CartJS.cart = data;

    $(document).trigger("cart.requestComplete", [data]);
  },
  error: (status, error) => {
    console.log(error);
    throw error; // Add to cart failed.
  }
};

const getFlowCart = () =>
  new Promise((resolve, reject) => {
    Flow.cart.getCart({
      success: (status, cart) => {
        resolve(cart);
      },
      error: (status, error) => {
        reject(error);
      }
    });
  });

const flowAddToCart = ({ currentTarget: self }) => {
  const variantId = self.dataset.cartAdd;
  const productPrice = self.dataset.price;
  const quantity = 1;
  const properties = {};

  Flow.cart.addItem(variantId, quantity, properties, genericFlowOptions);
  logFlowAdd(variantId, productPrice, quantity);
};

const logFlowAdd = (variantId, productPrice, quantity) => {
  const params = {
    item_number: variantId,
    price: {
      amount: productPrice,
      currency: "USD"
    },
    quantity: quantity ? quantity : 1
  };

  //send cart_add event to Beacon
  window.Flow.beacon.processEvent("cart_add", params, { xhr: true });
};

const redirectToFlowCheckout = () => {
  Flow.cart.redirectToCheckout();
  return false;
};

const bindUIActions = () => {
  $(document).on("click", dom.checkoutLink, redirectToFlowCheckout);
  $(dom.addToCart).on("click", flowAddToCart);
};

export const init = () => {
  console.log("%cinit: FlowCart.js", "color: green;");
  bindUIActions();
  getFlowCart().then(cart => {
    CartJS.cart = cart;
    $(document).trigger("cart.ready");
  });
};
