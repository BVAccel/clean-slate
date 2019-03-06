import { addClass, removeClass } from "components/Utils.js";

const $dom = {};

const cacheDom = () => {
  $dom.affixSections = [...document.querySelectorAll("[data-affix-section]")];
  $dom.affixElements = [...document.querySelectorAll("[data-affix-element]")];
};

const affixSection = (sections, elements) => {
  for (let i = 0; i < sections.length; i += 1) {
    const rect = sections[i].getBoundingClientRect();
    const el = elements[i];

    if (rect.top < 0) {
      addClass(el, "plp__headings--bottom");
      removeClass(el, "plp__headings--top");
    } else {
      addClass(el, "plp__headings--top");
      removeClass(el, "plp__headings--bottom");
    }

    if (rect.top < 0 && window.innerHeight - rect.bottom < 0) {
      addClass(el, "plp__headings--fixed");
      removeClass(el, "plp__headings--absolute");
    } else {
      addClass(el, "plp__headings--absolute");
      removeClass(el, "plp__headings--fixed");
    }
  }
};

export const init = () => {
  cacheDom();

  if ($dom.affixSections.length) {
    window.addEventListener("scroll", () =>
      affixSection($dom.affixSections, $dom.affixElements)
    );

    window.addEventListener("DOMContentLoaded", () =>
      affixSection($dom.affixSections, $dom.affixElements)
    );
  }
};
