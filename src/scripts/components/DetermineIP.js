import Cookies from "../vendor/Cookies";

export const init = async () => {
  console.log("%cinit: DetermineIP.js", "color: green;");

  let ipData;

  if (Cookies.get("ipData")) {
    // get from cookie
    ipData = JSON.parse(Cookies.get("ipData"));
  } else {
    // get from freegeoip-fork
    ipData = await fetch("https://freegeoip-fork.herokuapp.com/json/")
      .then(res => res.json())
      .catch(err => console.error(err));
    // set cookie
    Cookies.set("ipData", ipData, { expires: 7 });
  }

  // passes (event, data)
  $(document).trigger("ip.set", ipData);
};
