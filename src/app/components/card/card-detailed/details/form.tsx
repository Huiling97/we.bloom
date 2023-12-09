import { type ReactNode } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import './style.scss';

type ServiceDetailsFormProps = {
  onDetailsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ServiceDetailsForm = ({
  onDetailsChange,
}: ServiceDetailsFormProps): ReactNode => {
  return (
    <div className='service-details-container'>
      <div>
        <Form.Label>Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control
            name='price'
            aria-label='Amount (to the nearest dollar)'
            onChange={onDetailsChange}
          />
        </InputGroup>
      </div>
      <div>
        <Form.Label>Duration</Form.Label>
        <InputGroup>
          <Form.Control name='duration' onChange={onDetailsChange} />
          <InputGroup.Text>min</InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
};

export default ServiceDetailsForm;
