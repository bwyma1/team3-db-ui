import React from 'react';
import './rating.css';

const Rating = ({ rating }) => {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map(x => (
        <i
          key={x}
          className={x <= +rating ? 'full-star' : 'empty-star'}
        ></i>
      ))}
    </span>
  );
};

export default Rating;




