import React from 'react';
import classNames from 'classnames';

import LinksSubmit from './links-submit';
import ImageInput from '../components/image-input';

import classes from '../styles/containers/inputs.scss';

const Inputs = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);

  const ActiveComponent = activeTab === 0 ? LinksSubmit : ImageInput;

  return (
    <div className={classes.inputs}>
      <div className={classes.navButtons}>
        <button
          className={classNames(classes.navButton, activeTab === 0 && classes.navButtonActive)}
        >
          Ссылки VK
        </button>
        <button
          className={classNames(classes.navButton, activeTab === 1 && classes.navButtonActive)}
        >
          Изображение
        </button>
      </div>
    </div>
  );
};

export default Inputs;
