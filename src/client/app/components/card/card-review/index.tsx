import { Component } from 'react';
import { type ReactNode } from 'react';
import {
  type CardReviewProps,
  type CardReviewsListProps,
} from '../../../types/components/card/card-review.ts';
import { isMobile } from '../../../util/screen-size-helper.ts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class CustomSlide extends Component<{ review: CardReviewProps }> {
  render() {
    const { review } = this.props;
    const { title, description, user }: CardReviewProps = review;
    return (
      <div className='card-review-container'>
        <div className='card-review-header'>
          <div className='card-review-title'>{title}</div>
          <div className='card-review-user'>- {user}</div>
        </div>
        <div className='card-review-description'>{description}</div>
      </div>
    );
  }
}

const CardReview = ({ reviews }: CardReviewsListProps): ReactNode => {
  const settings = {
    slidesToShow: isMobile() ? 1 : 2,
    slidesToScroll: 1,
    slidesPerRow: 1,
    className: 'slider-container',
  };

  return (
    <Slider {...settings}>
      {reviews.map((review, index) => {
        return (
          <div key={index}>
            <CustomSlide review={review} />
          </div>
        );
      })}
    </Slider>
  );
};

export default CardReview;
