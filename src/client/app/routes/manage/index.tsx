import { useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context.tsx';
import { ActionsProps } from '../../types/routes/manage.ts';

const ACTIONS = {
  'categories-and-services': {
    name: 'Categories and Services',
    image: '/image2.jpg',
  },
  products: {
    name: 'Products',
    image: '/image3.jpg',
  },
};

const ManageActions = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, []);

  const displayActions = () =>
    Object.keys(ACTIONS).map((key) => {
      const { name, image } = ACTIONS[key as ActionsProps];

      return (
        <div>
          <Link to={`${key}`} className='action-link'>
            <p className='action-name'>Update {name}</p>
            <img src={`${image}`} alt='action image' className='action-image' />
          </Link>
        </div>
      );
    });

  return (
    <>
      <h3 className='actions-title'>What would you like to do today?</h3>
      <div className='manage-actions-container'>{displayActions()}</div>
    </>
  );
};

export default ManageActions;
