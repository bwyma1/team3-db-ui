import React from 'react';
import { TextField } from '@mui/material';

const TextFieldComponent = ({ label, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField fullWidth label={label} value={value} onChange={handleChange} />
  );
};

export default TextFieldComponent;

