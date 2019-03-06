(function (c, u) {
    if (window.location.pathname.indexOf('checkouts') < 0)
        return;

    var deviceType = /iPad/.test(u) ? "t" : /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk/.test(u) ? "m" : "d";
    var products = [];
    for(var i in c.line_items) {
        var item = c.line_items[i];

        if (item.product_id) {
            products.push({
                id: item.product_id,
                price: item.price,
                quantity: item.quantity
            });
        }
    }
    window.criteo_q = window.criteo_q || [];
    window.criteo_q.push(
      { event: "setAccount", account: 41196 },
  { event: "setEmail", email: c.email },
{ event: "setSiteType", type: deviceType },
{ event: "trackTransaction", id: c.order_id, item: products }
);})(Shopify.checkout, navigator.userAgent);