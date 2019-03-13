const modalTitle = (strings, ...values) =>
  `<h2 class="oo-modal-title">${strings[0]}</h2>`;

const modalSubtitle = (strings, ...values) =>
  `<h3 class="oo-modal-subtitle">${strings[0]}</h3>`;

const modalBody = (strings, ...values) =>
  `<div class="oo-modal-body">${strings[0]}</div>`;

const modalClose = (classes = '', modalName = '', text = 'close') =>
  `<button class="oo-button ${classes}" data-close-modal="${modalName}">${text}</button>`;

const notEnoughInventory = (data) => {
  const { newQuantity, inventory } = data;
  const title = modalTitle`Oops...`;
  const subtitle = modalSubtitle`We currently don't have enough inventory of that Item.`;
  const body = `<div class="modal-body">You requested ${newQuantity} but we only have ${inventory}. Please Adjust your selection and try again.</div>`;
  const close = modalClose('button--secondary', 'not-enough-inventory');

  return `
    ${title}
    ${subtitle}
    ${body}
    ${close}
  `;
};

const quickshop = (data) => {
  console.log(data);
};

export default {
  ['not-enough-inventory']: notEnoughInventory,
  quickshop,
};
