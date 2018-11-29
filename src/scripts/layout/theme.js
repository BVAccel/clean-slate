import { bindUIActions as bindToggle } from 'components/Toggle';
import { bindUIActions as bindButton } from 'components/Button';

document.addEventListener('DOMContentLoaded', async () => {
  bindToggle();
  bindButton();
});


import 'styles/theme.scss';
import 'styles/theme.scss.liquid';

import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/blur-up/ls.blur-up';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import { focusHash, bindInPageLinks } from '@shopify/theme-a11y';

import { $$ } from '../common/Helpers';

// import { configureStore } from '../_store/configureStore';
// import reducer from '../_store/reducer';
// import configureStore from '../_store';

// const store = configureStore();


import QuantitySelect from '../components/QuantitySelect';

const QuantitySelects = $$('[data-quantity-select]').map(node => {
  return new QuantitySelect(node);
});

QuantitySelects.forEach(QuantitySelect => QuantitySelect.addEvents())

console.log(QuantitySelects);

// import 'subscribers/_Events';

// import { bindUIActions } from 'bindings/_GlobalUIActions';
// import { initContainers } from 'containers/_InitContainers';

// Common a11y fixes
focusHash();
bindInPageLinks();


document.addEventListener('DOMContentLoaded', async () => {
  // initContainers();
  // bindUIActions();
});

window.addEventListener('load', () => {

});


// HMR
// if (module.hot) {
//   module.hot.accept();
// }

// if (module.hot) {
//   module.hot.dispose(() => {
//     // reset/undo the behavior/side effect that as possibly enabled/enacted

//     // $('*').unbind();
//     // PubSub.clearAllSubscriptions();


//     // bindUIActions();
//     // initContainers();
//   });
// }

console.log(`hello from theme.js!`);
// alert(`hello from theme.js`);
