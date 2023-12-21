import { type ReactNode, type ChangeEvent, useState } from 'react';
import { type CardDetailsProps } from '../../../../types/card';
import Form from 'react-bootstrap/Form';
import './style.scss';

type ServiceDetailsFormProps = {
  id?: string;
  data?: CardDetailsProps;
  onDetailsChange: (key: string, event: ChangeEvent<HTMLInputElement>) => void;
};

const ServiceDetailsForm = ({
  id,
  data,
  onDetailsChange,
}: ServiceDetailsFormProps): ReactNode => {
  const [input, setInput] = useState<CardDetailsProps | undefined>(data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevData) => {
      if (prevData) {
        return { ...prevData, [name]: value };
      }
    });
    onDetailsChange(id as string, e);
  };

  return (
    <div className='service-details-container'>
      <Form.Group className='mb-3' controlId={`duration_${id}`}>
        <Form.Label>Duration</Form.Label>
        <Form.Control
          type='text'
          value={input?.duration}
          required
          name='duration'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
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
          value={input?.price}
          required
          name='price'
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange(event)
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
