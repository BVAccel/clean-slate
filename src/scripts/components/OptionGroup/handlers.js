import dom from 'common/Dom';
import bva from 'common/Constants';

export const updateOptionGroupSelectedText = (data) => {
  const { id, name, value } = data;

  dom
    .getContainer(id, true)
    .find(`[data-option-group="${name}"] ${dom.selectedOptionValue}`)
    .text(value);
};
