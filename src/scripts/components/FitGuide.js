const $dom = {};

const cacheDom = () => {
  $dom.fitGuideToggle = $("[data-sizing-toggle]");
  $dom.fitGuideContainer = $("[data-fit-guide]");
  $dom.fitGuideTableWrap = $("[js-sizing-guide-table-wrap]");
  $dom.sizingUnitToggle = $("[data-sizing-unit]");
  $dom.sizingTable = $("table.sizing__table");
};

const hasCustomFitGuide = () =>
  $dom.fitGuideContainer.attr("data-fit-guide").length > 0 ? true : false;

const GetPageData = () => {
  const handle = $dom.fitGuideContainer.attr("data-fit-guide");
  const endPoint = `/pages/${handle}`;

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: endPoint,
      dataType: "json"
    })
      .done(
        (data, textStatus) =>
          textStatus == "success" ? (addDataToDOM(data), resolve()) : null
      )

      .error(err => {
        console.error(err);
        reject();
      });
  });
};

const addDataToDOM = data => {
  const HTMLData = data.page.body_html;
  $dom.fitGuideTableWrap.html(HTMLData);
};

const changeMeasurement = () => {
  const $table = $("table.sizing__table");
  $table.toggleClass("sizing__table--in sizing__table--cm");
};

const bindUIActions = () => {
  if (hasCustomFitGuide()) {
    console.log("new trigger laoded for custom fit guide");
    $(document).on("click", "[data-sizing-unit]", changeMeasurement);
  }
};

export const replaceWithCustomContent = () => {
  if (hasCustomFitGuide()) {
    return GetPageData();
  } else {
    console.log("does not have page data");
    return;
  }
};

export const init = function() {
  // console.log('custom fit guide loaded');
  cacheDom();
  hasCustomFitGuide();
  bindUIActions();
};
