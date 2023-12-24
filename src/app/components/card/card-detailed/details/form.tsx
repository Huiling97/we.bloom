import {
  type ReactNode,
  type ChangeEvent,
  useState,
  useEffect,
  useContext,
} from 'react';
import { type CardDetailsProps } from '../../../../types/card';
import { ModalContext } from '../../../../store/modal-context';
import { DetailsContext } from '../../../../store/details-context.tsx';
import Form from 'react-bootstrap/Form';
import { TrashAlt } from 'styled-icons/boxicons-solid';
import './style.scss';
import '../../../../assets/style/_icon.scss';

type ServiceDetailsFormProps = {
  id?: string;
  index: number;
  data?: CardDetailsProps;
  onDetailsChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
    input?: CardDetailsProps
  ) => void;
  onDetailsDelete: (index: number) => void;
};

const ServiceDetailsForm = ({
  id,
  index,
  data,
  onDetailsChange,
  onDetailsDelete,
}: ServiceDetailsFormProps): ReactNode => {
  const { isEditModal } = useContext(ModalContext);
  const { details } = useContext(DetailsContext);
  const [input, setInput] = useState<CardDetailsProps | undefined>(data);

  const isFirstInput = index === 0;
  const isLastInput = index === details.length - 1;
  const enableDeleteBtn = !isFirstInput && isLastInput;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevData) => {
      if (prevData) {
        return { ...prevData, [name]: value };
      }
    });
    if (input) {
      onDetailsChange(index, e, input);
    } else {
      onDetailsChange(index, e);
    }
  };

  useEffect(() => {
    if (isEditModal && data?.duration && data?.price) {
      setInput(data);
    }
  }, [data]);

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
      {enableDeleteBtn && (
        <div className='icon-container'>
          <TrashAlt
            size='28'
            className='trash-icon'
            onClick={() => {
              onDetailsDelete(index);
            }}
          >
            Delete
          </TrashAlt>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailsForm;
