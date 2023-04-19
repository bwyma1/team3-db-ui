import React from 'react';
import { TextField } from '@mui/material';

const TextAreaField = ({ label, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <TextField
      fullWidth
      label={label}
      value={value}
      onChange={handleChange}
      multiline
      rows={5}
    />
  );
};

export default TextAreaField;

