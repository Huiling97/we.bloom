import { useEffect, useState } from 'react';
import { type AlertDismissibleProps } from '../../types/alert';
import Alert from 'react-bootstrap/Alert';

function AlertDismissible({ text, showAlert }: AlertDismissibleProps) {
  const [show, setShow] = useState(showAlert);

  useEffect(() => {
    setShow(showAlert);
  }, [showAlert]);

  if (show) {
    return (
      <Alert variant='danger' onClose={() => setShow(false)} dismissible>
        <div>{text}</div>
      </Alert>
    );
  }
  return null;
}

export default AlertDismissible;
