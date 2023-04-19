import React from 'react';
import { Rating as MuiRating } from '@mui/material';

const Rating = ({ rating }) => {
  return (
    <MuiRating
      value={rating}
      precision={1}
      readOnly
      size="small"
    />
  );
};

export default Rating;





