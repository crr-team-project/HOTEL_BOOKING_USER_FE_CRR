import React from "react";
import "../../styles/components/search/HotelListCards.scss";

const HotelListCards = ({ hotels }) => {
 return (
  <div className="hotel-list-cards">
   {hotels.map((hotel) => (
    <div key={hotel.id} className="hotel-card">
     <div className="hotel-image">
      <img src={hotel.image} alt={hotel.name} />
      <div className="image-count">{hotel.imageCount} images</div>
     </div>

     <div className="hotel-info">
      <h3 className="hotel-name">{hotel.name}</h3>
      <div className="hotel-location">{hotel.location}</div>

      <div className="hotel-meta">
       <div className="hotel-stars">
        {"⭐".repeat(hotel.stars)} {hotel.stars} Star Hotel
       </div>
       <div className="hotel-amenities">🏨 {hotel.amenities}+ Amenities</div>
      </div>

      <div className="hotel-rating">
       <span className="rating-score">{hotel.rating}</span>
       <span className="rating-label">{hotel.ratingLabel}</span>
       <span className="rating-reviews">{hotel.reviews} reviews</span>
      </div>
     </div>

     <div className="hotel-actions">
      <div className="hotel-price">
       <div className="price-label">starting from</div>
       <div className="price-amount">₩{hotel.price.toLocaleString()}/night</div>
       <div className="price-note">excl. tax</div>
      </div>

      <button className="wishlist-button">❤️</button>
      <button className="view-button">View Place</button>
     </div>
    </div>
   ))}
  </div>
 );
};

export default HotelListCards;
