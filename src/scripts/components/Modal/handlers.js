import dom from 'common/Dom';
import { toggleElement } from 'common/Helpers';

import contents from './contents';

const generateModalMarkup = (data) => {
  const { name, data: modalData } = data;
  return contents[name](modalData);
};

const displayModal = () => {
  const action = 'add';
  const animated = true;

  return Promise.all([toggleElement({ selector: dom.overlay, action, animated }), toggleElement({ selector: dom.modal, action, animated })]);
};

const closeModal = () => {
  const action = 'remove';
  const animated = true;

  return Promise.all([toggleElement({ selector: dom.overlay, action, animated }), toggleElement({ selector: dom.modal, action, animated })]);
};

export const showModal = (data) => {
  console.log(data);
  const modalContents = generateModalMarkup(data);
  $(dom.modalContents).html(modalContents);
  return displayModal();
};

export const hideModal = (data) => {
  return closeModal().then(() => $(dom.modalContents).empty());
};
