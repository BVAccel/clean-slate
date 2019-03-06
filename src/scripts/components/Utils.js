export const addClass = (el, className) => {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ` ${className}`;
  }
};

export const removeClass = (el, className) => {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(
      new RegExp(`(^|\\b)${className.split(" ").join("|")}(\\b|$)`, "gi"),
      " "
    );
  }
};

export const toggleClass = (el, className) => {
  if (el.classList) {
    el.classList.toggle(className);
  } else {
    var classes = el.className.split(" ");
    var existingIndex = -1;
    for (var i = classes.length; i--; ) {
      if (classes[i] === className) {
        existingIndex = i;
      }
    }

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1);
    } else {
      classes.push(className);
    }

    el.className = classes.join(" ");
  }
};

export const isValidEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const penniesToDollars = pennies => `$${(pennies / 100).toFixed(2)}`;

export const is_touch_device = () => {
  var prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
  var mq = function(query) {
    return window.matchMedia(query).matches;
  };

  if (
    "ontouchstart" in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
  return mq(query);
};

// note, this method doesn't copy the object prototype
export const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export const getRandomElementInArray = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const itOrAncestorHasSelector = (el, selector) => {
  let currentEl = el;

  while (currentEl.parentNode) {
    if (currentEl.matches(selector)) {
      return currentEl;
    }

    currentEl = currentEl.parentNode;
  }

  return false;
};

export const delegateEvent = (listener, event, selector, cb) => {
  listener.addEventListener(event, e => {
    const delegateTarget = itOrAncestorHasSelector(e.target, selector);
    if (!delegateTarget) {
      return;
    }

    e.delegateTarget = delegateTarget;

    cb(e);
  });
};
