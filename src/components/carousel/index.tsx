import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import './style.scss' 

const CarouselBanner = () => {
  return (
    <div className="carousel-container">
      <Carousel 
        showThumbs={false} 
        autoPlay={true} 
        showStatus={false} 
        infiniteLoop={true}
      >
        <div className="image-container">
          <img src="src/assets/images/image1.jpg" className='image'/>
          <div className='text'>
            <p className='text--large'>
              There is beauty in everyone,<br></br>
              realize yours today
            </p>
            <p className='text--small'>
              Achieve total well-being and empower yourself today
            </p>
          </div>
        </div>
        <div className="image-container">
          <img src="src/assets/images/image2.jpg" className='image'/>
          <p className="text">Legend 2</p>
        </div>
        <div className="image-container">
          <img src="src/assets/images/image3.jpg" className='image'/>
          <p className="text">Legend 3</p>
        </div>
        <div className="image-container">
          <img src="src/assets/images/image4.jpg" className='image'/>
          <p className="text">Legend 4</p>
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselBanner;
