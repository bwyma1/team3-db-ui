import { useState } from 'react';
import { Form, Button, Row, Col } from 'reactstrap';
import Rating from '../common/rating';
import SelectField from '../common/selectField';
import TextAreaField from '../common/textAreaField';
import TextField from '../common/textField';

const ratingOptions = [
  { id: 0, name: '' },
  { id: 1, name: '1 star' },
  { id: 2, name: '2 stars' },
  { id: 3, name: '3 stars' },
  { id: 4, name: '4 stars' },
  { id: 5, name: '5 stars' }
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
  }

  return (
    <Form onSubmit={handleFormSubmit} className='mb-4'>
      <div className="jumbotron">
        <h3 className="text-white p-2.5 bg-secondary" style={{ color: 'white', fontSize: '1.4rem', padding: '1rem', margin: 0 }}>Add Review</h3>
      </div>
      <div className="border border-gray p-3 jumbotron position-relative" style={{ margin: 0 }}>
        <Row className="mb-3" style={{marginTop: '1rem'}}>
          <Col md={3}>
            <label htmlFor="name" className="form-label m-0 position-absolute" style={{bottom: "19rem"}} >Your Name</label>
            <TextField id="name" className="form-control" value={userName} setValue={setUserName} />
          </Col>
          <Col md={2}>
            <label htmlFor="rating" className="form-label m-0 position-absolute" style={{bottom: "19rem"}}>Rating</label>
            <SelectField id="rating" options={ratingOptions} value={rating} setValue={setRating}>
              <select className="form-select" aria-label="Default select example">
                <option selected>Open this select menu</option>
              </select>
            </SelectField>
          </Col>
          <Col md={2} className="d-flex align-items-center justify-content-left" style={{ marginTop: '.5rem' }}>
            <Rating rating={rating} />
          </Col>
        </Row>
        <div className="mt-2" >
          <label htmlFor="comment" className="form-label m-0 position-absolute" style={{top: "7rem"}} >Comment</label>
          <TextAreaField id="comment" className="form-control" value={comment} setValue={setComment}/>
        </div>
        <Button className="mt-3" type="submit" color="primary">Submit</Button>
      </div>
    </Form>
  );
};
