import React from 'react';
import classNames from 'classnames';

import classes from '../styles/components/svg-icon.scss';

const SVGIcon = (props) => {
  const { icon, className } = props;
  return (
    <svg className={classNames(classes.icon, className)}>
      <use xlinkHref={`/svg-icons.svg#${icon}`} />
    </svg>
  );
};

export default SVGIcon;
