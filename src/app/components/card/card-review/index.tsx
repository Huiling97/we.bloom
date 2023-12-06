import { Component } from 'react';
import { type ReactNode } from 'react';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './style.scss';

type CardReviewProps = {
  title: string;
  description: string;
  user: string;
};

type CardReviewsProps = {
  reviews: CardReviewProps[];
};

class CustomSlide extends Component<{ review: CardReviewProps }> {
  render() {
    const { review } = this.props;
    const { title, description, user }: CardReviewProps = review;
    return (
      <div key={`${user}-${title}`} className='card-review-container'>
        <div className='card-review-title'>{title}</div>
        <div className='card-review-user'>- {user}</div>
        <div className='card-review-description'>{description}</div>
      </div>
    );
  }
}

const CardReview = ({ reviews }: CardReviewsProps): ReactNode => {
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    slidesPerRow: 1,
    className: 'slider-container',
  };

  return (
    <Slider {...settings}>
      {reviews.map((review) => {
        return <CustomSlide review={review} />;
      })}
    </Slider>
  );
};

export default CardReview;
