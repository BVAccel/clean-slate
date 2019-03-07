import { removeClass, toggleClass } from "components/Utils";

const $dom = {
  accordionElements: [],
  accordionToggles: []
};

const cacheDom = () => {
  $dom.accordionElements = [...document.querySelectorAll(".Accordion")];
  $dom.accordionToggles = [...document.querySelectorAll(".Accordion__toggle")];
};

const bindUIActions = () => {
  $dom.accordionToggles.forEach((toggle, index) =>
    toggle.addEventListener("click", e => {
      $dom.accordionElements.forEach((el, index2) => {
        if (index === index2) {
          toggleAccordion($dom.accordionElements[index2], index2);
        } else {
          closeAccordion($dom.accordionElements[index2], index2);
        }
      });
    })
  );
};

const toggleAccordion = Accordion => {
  const accordionBody = Accordion.querySelector(".Accordion__body");

  if (!Accordion.classList.contains("Accordion--toggled")) {
    const { offsetHeight } = Accordion.querySelector(".Accordion__body-inner");

    accordionBody.style.maxHeight = offsetHeight + "px";
  } else {
    accordionBody.style.maxHeight = 0;
  }

  toggleClass(Accordion, "Accordion--toggled");
};

const closeAccordion = Accordion => {
  const accordionBody = Accordion.querySelector(".Accordion__body");

  accordionBody.style.maxHeight = 0;

  removeClass(Accordion, "Accordion--toggled");
};

export const init = () => {
  console.log("%cinit: Accordion.js", "color: green;");
  cacheDom();
  bindUIActions();
};
