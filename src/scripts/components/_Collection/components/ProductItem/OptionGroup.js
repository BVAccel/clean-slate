import React, { Component } from 'react';

import { handlize, random } from 'common/Helpers';

const findMatchingOptions = (name) => ({ group }) =>
  handlize(name) === handlize(group);

const OptionValue = ({ name, value }) => {
  const id = `${handlize(name)}-${handlize(value)}-${random(9)}`;

  return (
    <div className="oo-input-group">
      <input
        required
        data-option-value
        type="radio"
        value={value}
        name={name}
        id={id}
        className="oo-input oo-input--radio u-visually-hidden"
      />
      <label
        className={`oo-label swatch swatch-${handlize(value)}`}
        htmlFor={id}
      >
        {value}
      </label>
    </div>
  );
};

class OptionGroup extends Component {
  render() {
    const {
      product: { options },
      option: name,
    } = this.props;

    const matchingOptionsName = findMatchingOptions(name);
    const matchingOptions = options.filter(matchingOptionsName);

    if (matchingOptions.length) {
      return (
        <div
          className="oo-option-group flex-justify-center"
          data-option-group={name}
        >
          {matchingOptions.map(({ value }, i) => (
            <OptionValue name={name} value={value} key={`${name}-${value}`} />
          ))}
        </div>
      );
    }

    return null;
  }
}

export default OptionGroup;
