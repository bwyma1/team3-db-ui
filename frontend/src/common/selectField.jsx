import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SelectField = ({ label, value, setValue, options }) => {
  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel sx={{ fontSize: '1.5rem', paddingBottom: "2rem" }}></InputLabel>
      <Select value={value} onChange={handleValueChange}>
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;



