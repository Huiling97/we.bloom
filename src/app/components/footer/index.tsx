import './style.scss';

const Footer = () => {
  return (
    <div className='footer-container'>
      <div className='footer-details-container bottom-padding'>
        <div></div>
        <div>
          <div>Blk 203 Hougang Street 21 #01-69 Singapore 530203 </div>
          <div>Whatsapp: +65 6282 1083</div>
        </div>
      </div>
      <div className='footer-details-container top-padding'>
        <div>Copyright 2023</div>
        <a href='https://google.com' target='_blank' rel='noopener noreferrer'>
          <img
            src='/src/app/assets/svg/facebook-logo.svg'
            alt='facebook'
            className='footer-logo'
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
