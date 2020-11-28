import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { Remove } from '@material-ui/icons';

import TextInput from '../components/text-input';

const useStyles = makeStyles({
  input: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeButton: {
    marginLeft: 8,
  },
  addButton: {
    marginBottom: 8,
  },
});

const LinksSubmit = (props) => {
  const { onSubmit } = props;
  const classes = useStyles();
  const [inputsCount, setInputsCount] = React.useState(1);
  const [links, setLinks] = React.useState([]);
  const removeInput = () => setInputsCount(inputsCount > 1 ? inputsCount - 1 : 1);
  const addInput = () => {
    const newLinks = [...links, ''];
    setLinks(newLinks);
    setInputsCount(inputsCount + 1);
  };
  const changeLink = (link, index) => {
    const newLinks = [...links];
    newLinks[index] = link;
    setLinks(newLinks);
  };
  const removeLink = (index) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
    removeInput();
  };

  return (
    <form onSubmit={(event) => onSubmit(event, { links })}>
      {new Array(inputsCount).fill(0).map((item, index) => (
        <div className={classes.input}>
          <TextInput
            onChange={(event) => changeLink(event.target.value, index)}
            value={links[index]}
          />
          {inputsCount > 1 && (
            <Button onClick={() => removeLink(index)} className={classes.removeButton}>
              <Remove />
            </Button>
          )}
        </div>
      ))}
      <Button onClick={addInput} variant='contained' color='primary' className={classes.addButton}>
        Добавить ссылку
      </Button>

      <div>
        <Button type='submit' variant='contained' color='secondary'>
          Отправить
        </Button>
      </div>
    </form>
  );
};

export default LinksSubmit;
