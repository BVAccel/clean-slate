import { addClass, is_touch_device } from "components/Utils.js";

export const init = async () => {
  console.log("%cinit: DetermineDevice.js", "color: green;");

  if (is_touch_device()) {
    addClass(document.body, "device--touch");
  } else {
    addClass(document.body, "device--no-touch");
  }
};
