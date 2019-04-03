import dom from 'common/Dom';
import bva from 'common/Constants';
import { toggleElement } from 'common/Helpers';

export const toggle = (data) => {
  const { selector, className, action, animated } = data;
  return toggleElement({ selector, className, action, animated });
};
