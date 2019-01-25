import React from 'react';

export default ({ width: _width, height: _height, fill = "#31373D", }) => {
  const width = (_width) ? _width.toString().replace('px', '') : undefined;
  const height = (_height) ? _height.toString().replace('px', '') : undefined;
  const style = { width, height, };
  return (
    <div className="oo-icon icon-add ">
      <svg
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        style={style}>
        <path d="M17 9h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2" fill={fill} fillRule="evenodd"/>
      </svg>
    </div>
  )
};
