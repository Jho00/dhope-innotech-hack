import React from 'react';
import { Input } from '@material-ui/core';

const TextInput = (props) => {
  const { onChange, value } = props;
  return <Input placeholder={'Ссылка на VK'} onChange={onChange} value={value} />;
};

export default TextInput;
