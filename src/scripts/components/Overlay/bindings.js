import dom from 'common/Dom';
import bva from 'common/Constants';

const handleOverlayClick = ({ currentTarget: self }) => {
  PubSub.publish(bva.hideOverlay, {});
};

export const bindActions = () => {
  $(dom.overlay).on('click', handleOverlayClick);
};
