import React from 'react';
import classNames from 'classnames';

import LinksSubmit from './links-submit';
import ImageSubmit from './image-submit';

import classes from '../styles/containers/inputs.scss';

const Inputs = (props) => {
  const {
    profiles,
    addProfile,
    updateProfile,
    activeTab,
    ActiveInputComponent,
    setActiveTab,
    selectedProfileUrl,
    setSelectedProfileUrl,
  } = props;
  const [fullWidth, setFullWidth] = React.useState(true);

  const onSubmit = (profile) => {
    setFullWidth(false);
    addProfile(profile);
  };

  return (
    <div className={classNames(classes.inputs, fullWidth && classes.inputFullWidth)}>
      <div className={classes.navButtons}>
        <button
          className={classNames(classes.navButton, activeTab === 0 && classes.navButtonActive)}
          onClick={() => setActiveTab(0)}
        >
          Ссылки VK
        </button>
        <button
          className={classNames(classes.navButton, activeTab === 1 && classes.navButtonActive)}
          onClick={() => setActiveTab(1)}
        >
          Изображение
        </button>
      </div>

      <div>
        <ActiveInputComponent
          addProfile={onSubmit}
          profiles={profiles}
          updateProfile={updateProfile}
          selectedProfileUrl={selectedProfileUrl}
          setSelectedProfileUrl={setSelectedProfileUrl}
        />
      </div>
    </div>
  );
};

export default Inputs;
