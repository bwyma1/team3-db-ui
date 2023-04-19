import React from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import Rating from '../common/rating';

const ReviewList = ({ reviews }) => {
  return (
    <Container maxWidth="lg">
      <Box mt={1}>
        <Typography variant="h5">
          Reviews <span className="text-muted">({reviews.length})</span>
        </Typography>
        {reviews.length === 0 && (
          <Box p={2} textAlign="center">
            <Typography variant="body1" color="textSecondary">
              Be the first to add a review!
            </Typography>
          </Box>
        )}
        {reviews.map((review, index) => (
          <Card key={index} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Rating rating={review.review_rating} />
                <Typography variant="body2" color="textSecondary">
                  {review.date}
                </Typography>
              </Box>
              <Typography variant="subtitle1">{review.userName}</Typography>
              <Typography variant="body1" gutterBottom>
                "{review.review_text}"
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default ReviewList;


