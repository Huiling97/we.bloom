import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import './style.scss';

const ServiceDetailsForm = () => {
  return (
    <div className='service-details-container'>
      <div>
        <Form.Label>Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Form.Control aria-label='Amount (to the nearest dollar)' />
        </InputGroup>
      </div>
      <div>
        <Form.Label>Duration</Form.Label>
        <InputGroup>
          <Form.Control aria-label='Amount (to the nearest dollar)' />
          <InputGroup.Text>min</InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
};

export default ServiceDetailsForm;
