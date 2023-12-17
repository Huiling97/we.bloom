import { type ReactNode } from 'react';
import Form from 'react-bootstrap/Form';

import './style.scss';

type ServiceDetailsFormProps = {
  onDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ServiceDetailsForm = ({
  onDetailsChange,
}: ServiceDetailsFormProps): ReactNode => {
  return (
    <div className='service-details-container'>
      <Form.Group className='mb-3' controlId='duration'>
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type='text'
          required
          name='duration'
          onChange={onDetailsChange}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a duration
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId='price'>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type='text'
          required
          name='price'
          onChange={onDetailsChange}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a price
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default ServiceDetailsForm;
