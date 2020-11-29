import React from 'react';

import classes from '../styles/components/text-input.scss';
import SVGIcon from './svg-icon';

const enterKey = 'Enter';
const enterKeyCode = 13;

const TextInput = (props) => {
  const { onSubmit, notFound } = props;
  const [value, setValue] = React.useState('https://vk.com/shapovalroma');
  const [isSubmitAttempted, setIsSubmitAttempted] = React.useState(false);
  const isValueValid = value.includes('vk.com/');

  const message =
    (isSubmitAttempted && !isValueValid && 'Пожалуйста используйте валидную ссылку') ||
    (notFound && 'Ошибка. По ссылке ничего не найдено');

  const submit = () => {
    setIsSubmitAttempted(true);
    if (isValueValid) {
      onSubmit(value);
      setValue('');
      setIsSubmitAttempted(false);
    }
  };
  const change = (event) => {
    setIsSubmitAttempted(false);
    setValue(event.target.value);
  };

  return (
    <div>
      <div className={classes.textInput}>
        <input
          placeholder={'Вставьте ссылку на аккаунт vk.com'}
          onChange={change}
          onKeyPress={(event) => {
            (event.key === enterKey || event.which === enterKeyCode) && submit();
          }}
          value={value}
          className={classes.input}
        />

        <button onClick={submit} disabled={!isValueValid} className={classes.button}>
          <SVGIcon icon={'search'} className={classes.buttonIcon} />
        </button>
      </div>
      {message && (
        <div className={classes.message}>
          <SVGIcon icon={'error'} className={classes.messageIcon} />
          {message}
        </div>
      )}
    </div>
  );
};

export default TextInput;
