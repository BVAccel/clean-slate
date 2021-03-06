import 'styles/templates/collection/index.scss';

import Quickshop from 'components/Quickshop';
import Modal from 'components/Modal';

import 'components/_Collection';

Quickshop.initSubscribers();
Modal.initSubscribers();

document.addEventListener('DOMContentLoaded', () => {
  Quickshop.bindActions();
  Modal.bindActions();
});

window.addEventListener('load', () => {});
