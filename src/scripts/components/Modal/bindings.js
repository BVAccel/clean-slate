import dom from 'common/Dom';
import bva from 'common/Constants';

const handleModalClose = ({ currentTarget: self }) => {
  const name = self.dataset.closeModal;
  const close = true;

  PubSub.publish(bva.hideModal, { name, close });
};

export const bindActions = () => {
  $(dom.modal).on('click', dom.closeModal, handleModalClose);
};
