((Helpers, $) => {
  'use strict';

  /**
    * Debounce
    *
    * Returns a function, that, as long as it continues to be invoked, will not
    * be triggered. The function will be called after it stops being called for
    * N milliseconds. If `immediate` is passed, trigger the function on the
    * leading edge, instead of the trailing.
    *
    * Usage:
    * var lazyLayout = Helpers.debounce(calculateLayout, 300);
    * $(window).resize(lazyLayout);
    */

  Helpers.debounce = (func, wait, immediate) => {
    let timeout;

    return function () {
      const self = this;
      const args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(self, args);
        }
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(self, args);
      }
    };
  };

})(window.Helpers = window.Helpers || {}, jQuery);
