import Banner from '../components/banner';
import AddressMap from '../components/map';
import Separator from '../components/separator';
import { Phone } from '@styled-icons/heroicons-solid';
import { Map } from '@styled-icons/boxicons-solid';
import '../assets/style/routes/_contact.scss';

const Contact = () => {
  return (
    <div>
      <div>
        <Banner
          image='/src/app/assets/images/body.jpg'
          title='Contact Us'
          description='General enquiries and Booking of appointments '
        />
      </div>
      <Separator title='Location' />
      <AddressMap />
      <div className='contact-container'>
        <div className='contact-details-container'>
          <Phone size='24' />
          <div className='contact-text'>6282 1083</div>
        </div>
        <div className='contact-details-container'>
          <Map size='24' />
          <div className='contact-text'>
            203 Bishan Street 13, #10-69, Singapore 530203
          </div>
        </div>
      </div>
      <div className='hours-container'>
        <Separator title='Opening Hours' />
        <div className='hours-details-container'>
          <div>
            <div>MONDAY - FRIDAY</div>
            <div>11:00 - 20:00</div>
          </div>
          <div>
            <div>SATURDAY - SUNDAY</div>
            <div>10:00 - 20:00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
