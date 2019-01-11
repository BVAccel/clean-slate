import 'styles/templates/collection.scss';

import Quickshop from 'components/Quickshop';
import Modal from 'components/Modal';

Quickshop.initSubscribers();
Modal.initSubscribers();

document.addEventListener('DOMContentLoaded', () => {
  Quickshop.bindActions();
  Modal.bindActions();
});

window.addEventListener('load', () => {

});
