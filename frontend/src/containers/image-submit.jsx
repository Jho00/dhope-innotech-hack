import React from 'react';
import axios from 'axios';
import classNames from 'classnames';

import ImageInput from '../components/image-input';

import classes from '../styles/containers/image-submit.scss';
import SVGIcon from '../components/svg-icon';
import ProfilePreview from '../components/profile-preview';

const ImageSubmit = (props) => {
  const { addProfile, profiles, selectedProfileUrl } = props;
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const addImage = (image) => setImages([...images, image]);
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const submit = (imageData) => {
    const formData = new FormData();
    formData.append('file', imageData);

    return axios('http://192.168.0.125:54321/uploader_face', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((response) => addProfile(response.data));
  };

  return (
    <div>
      <div className={classes.input}>
        <div className={classes.attachInput}>
          <ImageInput onChange={addImage} slim={images.length > 0} isLoading={true} />
        </div>
        {images.map((image) => (
          <div key={image.data.name} className={classes.attachItem}>
            <SVGIcon icon={'attachment'} className={classes.attachItemIcon} />
            {image.data.name}
          </div>
        ))}
        {images.length > 0 && (
          <button
            onClick={() => {
              if (!isLoading) {
                setIsLoading(true);
                Promise.all(images.map((image) => submit(image.data))).then(() => {
                  setIsLoading(false);
                  setImages([]);
                });
              }
            }}
            className={classNames(classes.attachButton, isLoading && classes.attachButtonActive)}
          >
            {isLoading ? 'Идёт анализ' : 'Анализировать'}
          </button>
        )}
      </div>
      {profiles.length > 0 && (
        <div>
          <div className={classes.profilesTitle}>Найдено соответствий ({profiles.length})</div>

          {profiles.map((profile) => (
            <ProfilePreview
              profile={profile}
              key={profile.url}
              isActive={profile.url === selectedProfileUrl}
              onClick={() => setSelectedProfileUrl(profile.url)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSubmit;
