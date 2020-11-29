import React from 'react';
import SVGIcon from './svg-icon';

import classes from '../styles/components/image-input.scss';

const ImageInput = (props) => {
  const { onChange, slim } = props;

  const inputRef = React.useRef();

  const inputChange = (event) => {
    const fileInput = event.target;

    if (fileInput && fileInput.files) {
      const files = fileInput.files;
      const file = files[files.length - 1];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const result = event.target.result;
          const uploadedImage = typeof result === 'string' ? result : result.toString();
          onChange({
            data: file,
            url: uploadedImage,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <button
        className={classes.imageInput}
        onClick={() => {
          inputRef.current && inputRef.current.click();
        }}
      >
        <SVGIcon icon={'attachment'} className={classes.attachIcon} />
        {!slim && (
          <div className={classes.attachMessage}>
            Выбере или перетащите изображение в эту область
          </div>
        )}
      </button>
      <input
        accept={'.png,.jpg,.jpeg,.gif,.webp'}
        type={'file'}
        name={'image'}
        ref={inputRef}
        onChange={inputChange}
        hidden
      />
    </div>
  );
};

export default ImageInput;
