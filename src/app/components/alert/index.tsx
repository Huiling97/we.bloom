import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

type AlertDismissibleProps = {
  text: string;
  showAlert: boolean;
};

function AlertDismissible({ text, showAlert }: AlertDismissibleProps) {
  const [show, setShow] = useState(showAlert);

  useEffect(() => {
    setShow(showAlert);
  }, [showAlert]);

  if (show) {
    return (
      <Alert variant='danger' onClose={() => setShow(false)} dismissible>
        <p>{text}</p>
      </Alert>
    );
  }
  return null;
}

export default AlertDismissible;
