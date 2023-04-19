import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Rating from '../common/rating';


const ReviewList = ({ reviews }) => {
  return (
    <div>
      <h3 style={{ paddingTop: "2rem" }}>Product Reviews <span className="text-muted">({reviews.length})</span></h3>
      {reviews.length === 0 && <p className="text-muted bg-light p-3">Be the first to add a review!</p>}
        {reviews.map((review, index) => (
          <Card key={index} className="border-top mb-3 bg-light">
            <CardHeader className='p-lg-3'>
              <Rating rating={review.review_rating} />
            </CardHeader>
            <CardBody>
              <div className='d-flex justify-content-between'>
                <span className="text-muted ms-2 mb-2">{review.userName}</span>
                <span className="text-muted">{review.date}</span>
              </div>
              <p className="ms-2 mb-2">"{review.review_text}"</p>
            </CardBody>
          </Card>
        ))}
    </div>
  );
};


export default ReviewList;

