import React, { useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Button,
  Typography,
  Paper,
  FormControl,
  FormGroup,
} from '@mui/material';
import Rating from '../reviews/rating';
import SelectField from '../reviews/selectField';
import TextAreaField from '../reviews/textAreaField';
import TextField from '../reviews/textField';

const ratingOptions = [
  { id: 0, name: 'Rating' },
  { id: 1, name: '1 star' },
  { id: 2, name: '2 stars' },
  { id: 3, name: '3 stars' },
  { id: 4, name: '4 stars' },
  { id: 5, name: '5 stars' },
];

export default function ReviewForm({ onReviewAdded, truckId }) {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onReviewAdded({
      truckId,
      userName,
      rating,
      comment,
    });
    setUserName('');
    setRating(0);
    setComment('');
  };

  return (
    <Container maxWidth="lg">
      <Box mt={4}>
        <Paper elevation={3}>
          <Box p={2}>
            <Typography variant="h5">Add Review</Typography>
          </Box>
          <Box p={2}>
            <form onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Your Name" value={userName} setValue={setUserName} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectField
                    label="Rating"
                    value={rating}
                    setValue={setRating}
                    options={ratingOptions}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Rating rating={rating} />
                </Grid>
                <Grid item xs={12}>
                  <TextAreaField label="Comment" value={comment} setValue={setComment} />
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

