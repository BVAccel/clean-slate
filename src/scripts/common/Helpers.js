import dom from 'common/Dom';
import bva from 'common/Constants';

export const $$ = (selector) => {
  const nodes = document.querySelectorAll(selector);
  return Array.from(nodes);
};

export const getAlternativeTemplate = ({ resource, templateName, json = false }) => {
  const url = `/${resource}?view=${templateName}`;
  const options = { credentials: 'include' };
  return fetch(url, options).then((res) => (json ? res.json() : res.text()));
};

export const unique = (array) => {
  return [...new Set(array)];
};

export const toggleElement = ({ selector, className = dom.isActive, action = 'toggle', animated = false }) => {
  const normalizedclassName = className[0] === '.' ? className.slice(1) : className;
  const normalizedSelectorString = className[0] !== '.' ? `.${className}` : className;

  const impossibleAdd = $(selector).is(normalizedSelectorString) && action == 'add';
  const impossibleRemove = !$(selector).is(normalizedSelectorString) && action == 'remove';

  if (impossibleAdd || impossibleRemove) {
    return Promise.resolve({});
  }

  const toggleClass = () => {
    if (action === 'toggle') {
      $(selector).toggleClass(normalizedclassName);
    } else if (action === 'add') {
      $(selector).addClass(normalizedclassName);
    } else if (action === 'remove') {
      $(selector).removeClass(normalizedclassName);
    }
  };

  if (animated) {
    return new Promise((resolve) => {
      $(selector).one('transitionend', () => resolve({ selector, className, action, animated }));
      toggleClass();
    });
  }

  toggleClass();

  return Promise.resolve({ selector, className, action, animated });
};

export const debounce = (callback, time = 250, interval) => (...args) => {
  clearTimeout(interval);
  interval = setTimeout(() => callback(...args), time);
};

export const getSearchParm = (params) => {
  const searchParams = new URLSearchParams(window.location.search);

  return typeof params === 'string' ? searchParams.get(params) : params.reduce((params, param) => ({ ...params, [param]: searchParams.get(param.toLowerCase()) }), {});
};

export const setSearchParm = (param, value) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(param, value);
  window.history.pushState('', '', `?${searchParams.toString()}`);
  return searchParams;
};

export const getHandle = (type = 'product') => {
  if (type === 'collection') {
    return window.location.pathname.replace(/\/collections\/(.*)\/?/, '$1');
  } else if (type === 'product') {
    return window.location.pathname.replace(/\/products\/(.*)\/?/, '$1');
  }
  return window.location.pathname.replace(/\/products\/(.*)\/?/, '$1');
};

export const random = (digits = 9) => {
  return Math.floor(Math.random() * Math.pow(10, digits));
};

export const handlize = (string) => {
  return string
    .trim()
    .toLowerCase()
    .replace(/[\s_]/g, '-');
};
