import Banner from '../components/banner';
import Map from '../components/map';

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
      <Map />
    </div>
  );
};

export default Contact;
