import { removeClass, toggleClass } from "components/Utils";

// this module will hide native select
export const reInit = (root = document.body) => {
  const selects = [...root.querySelectorAll("select.select3")];

  selects.forEach((select, index) => {
    const classes = [...select.classList].join(" ");
    const options = [...select.querySelectorAll("option")];

    // create new select
    const newSelector = document.createElement("div");
    newSelector.setAttribute("data-name", select.name);
    newSelector.setAttribute("class", classes);

    // create options list
    const ul = document.createElement("ul");
    ul.setAttribute("class", "select3__options");

    // create current selected
    const styledSelected = document.createElement("div");
    styledSelected.setAttribute("data-toggle", "");
    styledSelected.setAttribute("class", "select3__selected");

    const selected = select.querySelector("select.select3 option:checked");

    if (selected) {
      styledSelected.appendChild(document.createTextNode(selected.textContent));
    } else {
      styledSelected.innerHTML = "&nbsp";
    }

    // add options
    options.forEach((option, optionIndex) => {
      const el = document.createElement("li");
      el.setAttribute("class", "select3__option");
      el.setAttribute("data-value", option.value);
      el.appendChild(document.createTextNode(option.textContent));

      const isDisabled = option.hasAttribute("disabled");

      if (!isDisabled) {
        el.addEventListener(
          "click",
          e => {
            const { value } = e.currentTarget.dataset;
            const { textContent } = e.currentTarget;

            const textNode = document.createTextNode(textContent);
            styledSelected.innerHTML = "";
            styledSelected.appendChild(textNode);

            // hide dropdown
            removeClass(newSelector, "select3--toggled");

            // change value then manually construct an event
            select.value = value;
            select.dispatchEvent(new Event("change"), true);
          },
          false
        );
      } else {
        el.setAttribute("data-disabled", "");
      }

      ul.appendChild(el);
    });

    newSelector.appendChild(styledSelected);
    newSelector.appendChild(ul);

    select.parentNode.insertBefore(newSelector, select);

    newSelector.style.displa = "block !important";
    select.style.display = "none";

    // close dropdown if clicked away
    document.addEventListener("click", e => {
      if (!(e.target === newSelector || newSelector.contains(e.target))) {
        removeClass(newSelector, "select3--toggled");
      }
    });

    newSelector.addEventListener("click", e => {
      // if an option is clicked
      if (e.target.dataset && e.target.dataset.toggle !== undefined) {
        toggleClass(newSelector, "select3--toggled");
      }
    });
  });
};

export const init = () => {
  console.log("%cinit: Select3.js", "color: green;");
  reInit();
};
