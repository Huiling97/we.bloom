import { Link } from 'react-router-dom';
import { ChevronBack } from 'styled-icons/ionicons-solid';
import { type BackLinkProps } from '../../types/components/link';

const BackLink = ({ link, content }: BackLinkProps) => {
  return (
    <Link to={link} className='back-button link-no-decoration'>
      <ChevronBack size='28' className='back-button-icon' />
      <div>{content}</div>
    </Link>
  );
};

export { BackLink };
