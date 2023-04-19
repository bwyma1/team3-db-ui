import React from 'react';

const SelectField = ({ label, value, setValue, options, optionValueKey = 'id', optionLabelKey = 'name' }) => {

  const handleValueChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <select id={label} className="form-control form-select" value={value} onChange={handleValueChange}>
        {options.map(option => (
          <option key={option[optionValueKey]} value={option[optionValueKey]}>{option[optionLabelKey]}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;


