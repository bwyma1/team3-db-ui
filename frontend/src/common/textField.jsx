import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

const textField = ({ label, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormGroup>
      <Label for={`form-${label}`}>{label}</Label>
      <Input type="text" id={`form-${label}`} value={value} onChange={handleChange} />
    </FormGroup>
  );
};

export default textField;
