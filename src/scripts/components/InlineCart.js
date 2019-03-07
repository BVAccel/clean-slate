import * as FlowCart from "components/FlowCart";
import * as Select3 from "components/Select3";
import * as SetInternational from "components/SetInternational";
import {
  addClass,
  penniesToDollars,
  removeClass,
  toggleClass
} from "components/Utils";

let $dom = {};

const cacheDom = () => {
  $dom.cart = document.querySelector(".inline-cart");
  $dom.products = $dom.cart.querySelector(".inline-cart__products");
  $dom.subtotal = $dom.cart.querySelector(".inline-cart__subtotal-price");
  $dom.item_count = $dom.cart.querySelector(".inline-cart__subheading");
  $dom.footer = $dom.cart.querySelector(".inline-cart__footer");
  $dom.cart_count = document.querySelectorAll(".header-cart-count");
};

const updateCartPrice = ({ isFlowCart }) => {
  const price = !isFlowCart
    ? penniesToDollars(CartJS.cart.total_price)
    : CartJS.cart.local.total_price.label;

  $dom.subtotal.innerText = price;
};

const updateCartItemCount = () => {
  const { item_count } = CartJS.cart;
  const itemCountStr = `You have ${item_count} item${
    item_count === 0 || item_count > 1 ? "s" : ""
  }`;

  $dom.item_count.innerText = itemCountStr;

  if (CartJS.cart.item_count > 0) {
    [...$dom.cart_count].forEach(elem => {
      elem.innerText = item_count;
      addClass(elem, "active");
    });
  } else {
    [...$dom.cart_count].forEach(elem => {
      removeClass(elem, "active");
    });
  }
};

const updateCartOptions = (inventoryQty, qtySelected, maxQty) => {
  // TODO: limit # of options created if inventory is less than 9

  return new Array(maxQty ? maxQty : 10)
    .fill(null)
    .map((el, index) => {
      // prettier-ignore
      const twoDigitQty = (index.toString().length === 1) ? `0${index}` : index;
      const isSelected = qtySelected === index ? " selected" : "";

      return `
          <option value="${index}"${isSelected}>
            ${twoDigitQty}
          </option>
        `;
    })
    .join("");
};

const updateCartItems = ({ isFlowCart }) => {
  if (CartJS.cart.item_count > 0) {
    const CustomQty = $dom.products.getAttribute("data-max-item-qty");
    const CustomQtyNum = parseInt(CustomQty);

    $dom.products.innerHTML = CartJS.cart.items
      .map(
        item => `<div class="inline-cart__product">
            <img src="${item.image}" alt="${
          item.product_title
        }" class="inline-cart__product-img">

            <div class="inline-cart__product-text">
              <h3 class="inline-cart__product-title"><a href="/products/${
                item.handle
              }">${item.product_title}</a></h3>
                <h5 class="inline-cart__product-color">${
                  !isFlowCart
                    ? item.variant_options[0]
                    : item.variant_title.split(" - ")[1].split("/")[0]
                }</h5>
                <h5 class="inline-cart__product-size">${
                  !isFlowCart
                    ? item.variant_options[1]
                    : item.variant_title.split(" - ")[1].split("/")[1]
                }</h5>
                <span class="inline-cart__price">${penniesToDollars(
                  !isFlowCart ? item.line_price : item.local.line_price.label
                )}</span>
            </div>

            <div class="inline-cart__product-options">
              <select name="qty" class="inline-cart__qty select3" value="${
                item.quantity
              }" data-product-id="${item.variant_id}" value="${item.quantity}">
                ${updateCartOptions(null, item.quantity, CustomQtyNum)}
              </select>
              <span class="inline-cart__price">${
                !isFlowCart
                  ? penniesToDollars(item.line_price)
                  : item.local.price.label
              }</span>
            </div>
          </div>`
      )
      .join("");
    removeClass($dom.footer, "hidden");
  } else {
    $dom.products.innerHTML = `<div class="empty-cart"><p class="empty-cart__text">Your cart is empty. Start shopping!</p><a href="/collections/mens" class="btn empty-cart__btn btn--striped">Shop Men</a><a href="/collections/womens" class="btn empty-cart__btn btn--striped">Shop Women</a></div>`;
    addClass($dom.footer, "hidden");
  }
};

const updateInternationalForm = () => {
  const formHTML = `<form name="BongoCheckoutForm" method="post" action=" https://tranzaction.bongous.com/pay/c1fc8/index.php ">
      <input type="hidden" name="PARTNER_KEY" value=" cb27aee122f95a21269fc64de849b508cb1db7946490a63886b32b28428a78ac ">
      <input type="hidden" name="TOTAL_DOMESTIC_SHIPPING_CHARGE" value="0">
      ${CartJS.cart.items
        .map(
          (item, index) =>
            `<input type="hidden" name="PRODUCT_ID_${index}" value="${
              item.sku
            }">
        <input type="hidden" name="PRODUCT_NAME_${index}" value="${item.title}">
        <input type="hidden" name="PRODUCT_PRICE_${index}" value="${(
              item.price / 100
            ).toFixed(2)}">
        <input type="hidden" name="PRODUCT_Q_${index}" value="${item.quantity}">
        <input type="hidden" name="PRODUCT_SHIPPING_${index}" value="">
        <input type="hidden" name="PRODUCT_CUSTOM_1_${index}" value="${
              item.variant_title
            }">
        <input type="hidden" name="PRODUCT_CUSTOM_2_${index}" value="">
        <input type="hidden" name="PRODUCT_CUSTOM_3_${index}" value="">`
        )
        .join("")}
    </form>`;

  $('[name="BongoCheckoutForm"]').replaceWith(formHTML);
};

const addSelectListeners = ({ isFlowCart }) => {
  [...document.querySelectorAll(".inline-cart select")].forEach(select =>
    select.addEventListener("change", async e => {
      const { value } = e.target;
      const { productId } = e.target.dataset;
      const index =
        CartJS.cart.items.findIndex(
          item => item.variant_id === parseInt(productId, 10)
        ) + 1;

      if (!index) return;

      // delete the item if the new quantity is 0
      if (value === 0) {
        !isFlowCart
          ? CartJS.removeItem(index)
          : Flow.cart.removeItem(index, FlowCart.genericFlowOptions);
      } else {
        !isFlowCart
          ? CartJS.updateItemById(parseInt(productId, 10), parseInt(value, 10))
          : Flow.cart.updateItem(
              index,
              parseInt(value, 10),
              {},
              FlowCart.genericFlowOptions
            );
      }
    })
  );
};

const addListeners = ({ isFlowCart }) => {
  // cart toggles
  $("[data-toggle-cart]").on("click", function() {
    toggleClass($dom.cart, "inline-cart--toggled");
    toggleClass(document.documentElement, "inline-cart-open");
    toggleClass(document.querySelector("body"), "inline-cart-open");
  });

  // cart initialize && updates
  $(document).on("cart.ready cart.requestComplete", (e, cart) => {
    updateCartPrice({ isFlowCart });
    updateCartItemCount();
    updateCartItems({ isFlowCart });
    addSelectListeners({ isFlowCart });
    Select3.init(document.querySelector(".inline-cart"));

    if (
      e.namespace === "requestComplete" &&
      !window.location.pathname.startsWith("/cart")
    ) {
      addClass($dom.cart, "inline-cart--toggled");
      addClass(document.documentElement, "inline-cart-open");
      addClass(document.querySelector("body"), "inline-cart-open");
    }
    if (SetInternational.isItInternational()) {
      updateInternationalForm();
    }
  });
};

export const init = ({ isFlowCart }) => {
  console.log("%cinit: InlineCart.js", "color: green;");
  cacheDom();
  addListeners({ isFlowCart });
};
