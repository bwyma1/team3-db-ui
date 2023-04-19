import React from 'react';

const TextAreaField = ({ label, value, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="mb-0">
      <label className="form-label">{label}</label>
      <textarea className="form-control" style={{resize: 'none'}} value={value} rows="5" onChange={handleChange } />
    </div>
  );
};

export default TextAreaField;
