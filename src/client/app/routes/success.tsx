import axios from 'axios';
import URLConstants from '../util/constants/url-constants';
import { useEffect, useState } from 'react';
import { OrderDetailsProps } from '../types/routes/success';
import { formatDateTime } from '../util/format-helper';

const Success = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetailsProps>({
    id: '',
    created_at: 0,
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `${URLConstants.CHECKOUT_PATH}/get-order-details`
        );
        if (response.data) {
          const { id, created_at } = response.data;
          setOrderDetails({ id, created_at });
        }
      } catch (e) {
        console.error('Error fetching order id', e);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div className='content-centered content-flex-column'>
      <div className='font-bold font-large'>Thank you for shopping with us</div>
      <div>Your order was completed successfully.</div>
      <div>Order number: {orderDetails.id}</div>
      <div>Order date: {formatDateTime(orderDetails.created_at)}</div>
    </div>
  );
};

export default Success;
