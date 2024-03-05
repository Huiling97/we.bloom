import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = () => {
  return (
    <div className='content-centered'>
      <Spinner
        as='span'
        animation='grow'
        size='sm'
        role='status'
        aria-hidden='true'
        data-testid='loading-spinner'
      />
      Preparing the best experience for you...
    </div>
  );
};

export default LoadingSpinner;
