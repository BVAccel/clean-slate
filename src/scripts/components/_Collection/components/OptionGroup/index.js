import React, { Component } from 'react';

import { handlize, random } from 'common/Helpers';

const findMatchingOption = lookup => ({ name }) => handlize(lookup) === handlize(name);

const OptionValue = ({ name, value, }) => {
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
      <label className={`oo-label swatch swatch-${handlize(value)}`} htmlFor={id}>{value}</label>
    </div>
  );
};

const OptionGroup = props => {
  const { product: { options }, option: lookup } = props;
  const matchingOptionLookup = findMatchingOption(lookup);
  const matchingOption = options.find(matchingOptionLookup);

  if (matchingOption) {
    const { name, values } = matchingOption;

    return (
      <div className="oo-option-group flex-justify-center" data-option-group={name}>

        {values.map((value, i) => <OptionValue name={name} value={value} key={i} />)}

      </div>
    )
  }

  return null;
};

export default OptionGroup;
