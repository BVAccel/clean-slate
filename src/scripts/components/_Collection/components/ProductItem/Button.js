import React, { Component } from 'react';

const Button = (props) => {
  const { name = '', size = 'auto', type = 'primary', modifier = '', action = '', text = '' } = props;

  return (
    <button className={`oo-button ${name} button--${type} flex-${size} ${modifier}`} data-action={action}>
      <p>{text}</p>

      {props.children}
    </button>
  );
};

export default Button;
