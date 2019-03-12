console.log("%cmodule: CartPage", "color: green;");

import * as SetInternational from "components/SetInternational";
import { addClass, removeClass, toggleClass } from "components/Utils";

const $dom = {};

const cacheDom = () => {
  $dom.cart = document.querySelector(".cart");
  $dom.products = $dom.cart.querySelector(".cart__products");
  $dom.subtotal = $dom.cart.querySelector(".cart__subtotal-price");
};

const penniesToDollars = pennies => `$${(pennies / 100).toFixed(2)}`;

const updateCartSubtotal = ({ isFlowCart }) => {
  const price = !isFlowCart
    ? penniesToDollars(CartJS.cart.total_price)
    : CartJS.cart.local.total_price.label;

  $dom.subtotal.textContent = price;
};

const updateCartOptions = qtySelected => {
  return new Array(10)
    .fill(null)
    .map(
      // prettier-ignore
      (el, index) => {
          const isSelected = qtySelected === index ? ' selected' : '';
          const twoDigitIndex = (index.toString().length === 1) ? `0${index}` : index;

          return `
            <option value="${index}"${isSelected}>
              ${twoDigitIndex}
            </option>
          `;
        }
    )
    .join("");
};

const updateCartItems = ({ isFlowCart }) => {
  if (CartJS.cart.items.length === 0) {
    addClass($dom.cart, "cart--empty");

    return;
  }

  removeClass($dom.cart, "cart--empty");

  $dom.products.innerHTML = `<div class="tr cart__product-headings">
      <div class="td th">Item</div>
      <div class="td th">Color</div>
      <div class="td th">Size</div>
      <div class="td th">Qty</div>
      <div class="td td--right th">Price</div>
    </div>`;

  $dom.products.innerHTML += CartJS.cart.items
    .map(
      (item, index) =>
        `<div class="tr cart__product">
        <div class="td cart__product-details"><img class="cart__product-img" src="${
          item.image
        }" alt="${item.product_title}"/>
          <div class="cart__product-details-text">
            ${item.product_title}<br>
            ${
              !isFlowCart
                ? item.variant_options[0]
                : item.variant_title.split(" - ")[1].split("/")[0]
            }<br>
            ${
              !isFlowCart
                ? item.variant_options[1]
                : item.variant_title.split(" - ")[1].split("/")[1]
            }
            <button class="cart__product-remove" data-remove-item="${index}">Remove</button>
          </div>
        </div>
        <div class="td cart__product-color">${
          !isFlowCart
            ? item.variant_options[0]
            : item.variant_title.split(" - ")[1].split("/")[0]
        }</div>
        <div class="td cart__product-size">${
          !isFlowCart
            ? item.variant_options[1]
            : item.variant_title.split(" - ")[1].split("/")[1]
        }</div>
        <div class="td cart__product-qty">
          <select name="qty" class="select3" value="${
            item.quantity
          }" data-product-id="${item.variant_id}" value="${item.quantity}">
            ${updateCartOptions(item.quantity)}
          </select>
          <div class="cart__product-price cart__product-price--mobile">
            ${
              !isFlowCart
                ? penniesToDollars(item.line_price)
                : item.local.price.label
            }
          </div>
        </div>
        <div class="td td--right cart__product-price cart__product-price--desktop">
          ${
            !isFlowCart
              ? penniesToDollars(item.line_price)
              : item.local.price.label
          }
        </div>
      </div>`
    )
    .join("");
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
  [...document.querySelectorAll(".cart select")].forEach(select =>
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
    updateCartSubtotal({ isFlowCart });
    updateCartItems({ isFlowCart });
    addSelectListeners({ isFlowCart });

    Select3.reInit(document.querySelector(".cart"));

    if (SetInternational.isItInternational()) {
      updateInternationalForm();
    }
  });

  window.addEventListener("click", async e => {
    if (!e.target.matches("[data-remove-item]")) return;

    const { removeItem } = e.target.dataset;
    await CartJS.removeItem(removeItem + 1);
  });

  window.addEventListener("click", e => {
    if (!e.target.matches("[data-go-back]")) return;

    window.history.back();
  });
};

export const init = ({ isFlowCart }) => {
  console.log("%cinit: CartPage.js", "color: green;");
  cacheDom();
  addListeners({ isFlowCart });
};
