import React from "react";
import "../../styles/components/hotelpage/HotelReviews.scss";

const HotelReviews = ({
  hotelId,
  rating,
  reviewCount,
  createReview,
  updateReview,
  deleteReview,
  reviews = [],
  getReviews,
}) => {
  console.log("HotelReviews reviews:", reviews);
  return (
    <div className="hotel-reviews">
      {/* 리뷰 컴포넌트 내용 작성 */}
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>{review.comment || review.content}</div>
        ))
      ) : (
        <div>리뷰가 없습니다.</div>
      )}
    </div>
  );
};

export default HotelReviews;
