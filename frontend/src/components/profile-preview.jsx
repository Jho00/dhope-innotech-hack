import React from 'react';
import classNames from 'classnames';

import classes from '../styles/components/profile-preview.scss';
import SVGIcon from './svg-icon';

const ProfilePreview = (props) => {
  const { profile, isActive, onClick } = props;
  const { photo_400, first_name, last_name, url, isLoading } = profile;
  const profileImage = photo_400;

  const name = (first_name && last_name && `${first_name} ${last_name}`) || undefined;

  const showingImage = !!profileImage;

  return (
    <div
      className={classNames(classes.profilePreview, isActive && classes.profilePreviewActive)}
      onClick={onClick}
    >
      <div className={classes.content}>
        <div className={classNames(classes.image, !showingImage && classes.imageIcon)}>
          {profileImage ? <img src={profileImage} alt={name} /> : <SVGIcon icon={'user'} />}
        </div>
        <div>
          <div className={classes.name}>{name}</div>
          <div className={classes.link}>{url}</div>
        </div>
      </div>
      <div className={classNames(classes.icon, isLoading && classes.iconLoading)}>
        <SVGIcon icon={isLoading ? 'loading' : 'checkmark'} />
      </div>
    </div>
  );
};

export default ProfilePreview;
