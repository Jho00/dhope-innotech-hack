import React from 'react';
import ImageInput from '../components/image-input';

import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  loadButton: {
    marginBottom: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: 'auto',
    },
  },
});

const ImageSubmit = (props) => {
  const { onSubmit } = props;
  const classes = useStyles();
  const [image, setImage] = React.useState();

  return (
    <form onSubmit={(event) => onSubmit(event, { image })}>
      <div className={classes.loadButton}>
        <ImageInput onChange={setImage} />
      </div>
      {image && (
        <div className={classes.image}>
          <img src={image.url} />
        </div>
      )}
      {image && (
        <Button type='submit' variant='contained' color='primary'>
          Отправить
        </Button>
      )}
    </form>
  );
};

export default ImageSubmit;
