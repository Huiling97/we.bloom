import './style.scss';

type BannerProps = {
  image: string;
  title: string;
  description: string;
};

const Banner = ({ image, title, description }: BannerProps) => {
  return (
    <div className='banner-container'>
      <div className='banner-image-container'>
        <img src={`${image}`} alt='Banner image' className='banner-image' />
        <div className='banner-image dark-overlay' />
      </div>
      <div className='banner-text'>
        <div className='banner-title'>{title}</div>
        <div>{description}</div>
      </div>
    </div>
  );
};

export default Banner;
