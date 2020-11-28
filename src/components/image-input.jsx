import React from 'react';
import { Button, Input } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';

const ImageInput = (props) => {
  const { onChange } = props;

  return (
    <div>
      <Button variant='contained' component='label' color='primary'>
        Загрузить фото
        <input
          accept={'.png,.jpg,.jpeg,.gif,.webp'}
          type={'file'}
          name={'image'}
          hidden
          onChange={(event) => {
            const fileInput = event.target;

            if (fileInput && fileInput.files) {
              const imageData = fileInput.files[0];
              const reader = new FileReader();
              reader.onload = (event) => {
                if (event.target && event.target.result) {
                  const result = event.target.result;
                  const uploadedImage = typeof result === 'string' ? result : result.toString();
                  onChange({
                    data: imageData,
                    url: uploadedImage,
                  });
                }
              };
              reader.readAsDataURL(fileInput.files[0]);
            }
          }}
        />
      </Button>
    </div>
  );
};

export default ImageInput;
