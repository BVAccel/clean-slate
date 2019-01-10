import PubSub from 'pubsub-js';

import dom from 'common/Dom';
import bva from 'common/Constants';

const handleOptionValueClick = ({ currentTarget: self })=> {
  const id = dom.getSelf(self).dataset.containerId;
  const { name, value } = self;
  const topic = `${bva.updateOptionGroupValue}.${name.toUpperCase()}`;
  const data = { id, name, value };

  PubSub.publish(topic, data);
};

export const bindActions = () => {
  $(dom.optionValue).on('click', handleOptionValueClick)
};
