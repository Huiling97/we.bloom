import { type ReactNode, type ChangeEvent, type FocusEvent } from 'react';
import { type CardDetailsProps } from '../../../../types/card';
import Form from 'react-bootstrap/Form';
import './style.scss';

type ServiceDetailsFormProps = {
  id?: string;
  data?: CardDetailsProps;
  onDetailsChange: (event: ChangeEvent<HTMLInputElement>, key: string) => void;
  onDetailsBlur: (event: FocusEvent<HTMLInputElement>, key: string) => void;
};

const ServiceDetailsForm = ({
  id,
  onDetailsChange,
  onDetailsBlur,
}: ServiceDetailsFormProps): ReactNode => {
  return (
    <div className='service-details-container'>
      <Form.Group className='mb-3' controlId={`duration_${id}`}>
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type='text'
          required
          name='duration'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onDetailsChange(event, id as string)
          }
          onBlur={(event: FocusEvent<HTMLInputElement>) =>
            onDetailsBlur(event, id as string)
          }
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a duration
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3' controlId={`price_${id}`}>
        <Form.Label>Price</Form.Label>
        <Form.Control
          type='text'
          required
          name='price'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onDetailsChange(event, id as string)
          }
          onBlur={(event: FocusEvent<HTMLInputElement>) =>
            onDetailsBlur(event, id as string)
          }
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a price
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default ServiceDetailsForm;
