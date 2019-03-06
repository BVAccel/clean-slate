let isInternational = false;

const countriesThatUseImperial = [
  "US",
  "USA",
  "America",
  "United States",
  "United States of America",
  "Myanmar",
  "Burma",
  "Liberia"
];

const countriesThatUseLocalCheckout = [
  "US",
  "USA",
  "America",
  "United States",
  "United States of America",
  "Canada",
  "CA"
];

// const setCheckoutButton = country => {
//   if (!countriesThatUseLocalCheckout.includes(country)) {
//     addClass(document.body, 'cart--international');
//     removeClass(document.body, 'cart--local');
//     isInternational = true;
//   }
// };

const setUnits = country => {
  const unitElements = [...document.querySelectorAll(".unit")];

  if (countriesThatUseImperial.includes(country)) {
    unitElements.forEach(el => addClass(el, "unit--imperial"));
  } else {
    unitElements.forEach(el => addClass(el, "unit--metric"));
  }
};

export const isItInternational = () => isInternational;

export const init = async () => {
  $(document).on("ip.set", (e, json) => {
    const country = json.country_name ? json.country_name : json;
    // console.log(json);
    // setCheckoutButton(country);
    setUnits(country);
  });
};
