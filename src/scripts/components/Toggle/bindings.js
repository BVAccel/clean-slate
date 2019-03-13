import dom from 'common/Dom';
import bva from 'common/Constants';

const handleToggleClick = ({ currentTarget: self }) => {
  const selector = self.dataset.toggle;
  const action = self.dataset.toggleAction;
  const animated = self.dataset.toggleAnimated == 'true';
  const group = self.dataset.toggleGroup;
  const className = self.dataset.activeClass || dom.isActiveClassName;
  const activeSelfClass = self.dataset.activeSelfClass || dom.isActiveClassName;
  const toggleSelfClass = self.dataset.toggleSelfClass || dom.isActiveClassName;

  if (!$(self).hasClass(activeSelfClass)) {
    if (group) {
      $(`[data-toggle-group="${group}"]`).toggleClass(toggleSelfClass);
    }

    PubSub.publish(bva.toggle, { selector, className, action, animated });
  }
};

export const bindActions = () => {
  $(dom.toggle).on('click', handleToggleClick);
};
