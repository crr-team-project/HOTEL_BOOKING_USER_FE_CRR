import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyProfile from "../../components/mypage/MyProfile";
import "../../styles/pages/mypage/MyPaymentPage.scss";

const MyPaymentPage = () => {
 const navigate = useNavigate();

 // 임시 카드 데이터
 const [cards, setCards] = useState([
  {
   id: 1,
   last4: "4321",
   expiry: "02/27",
   type: "visa",
  },
 ]);

 const handleAddCard = () => {
  navigate("/add-payment");
 };

 const handleDeleteCard = (cardId) => {
  setCards(cards.filter((card) => card.id !== cardId));
 };

 return (
  <div className="payment-page">


   <div className="payment-content">
    <div className="payment-header">
     <h2 className="payment-title">결제수단</h2>
     <div className="filter-dropdown">
      <select>
       <option value="upcoming">Upcoming</option>
      </select>
     </div>
    </div>

    <div className="cards-container">
     {cards.map((card) => (
      <div key={card.id} className="card-item">
       <div className="card-visual">
        <div className="card-number">**** **** ****</div>
        <div className="card-last4">{card.last4}</div>
        <div className="card-footer">
         <div className="card-expiry">
          <div className="expiry-label">Valid Thru</div>
          <div className="expiry-date">{card.expiry}</div>
         </div>
         <div className="card-logo">{card.type.toUpperCase()}</div>
        </div>
       </div>
       <button
        className="delete-button"
        onClick={() => handleDeleteCard(card.id)}
       >
        🗑️
       </button>
      </div>
     ))}

     <div className="add-card-item" onClick={handleAddCard}>
      <div className="add-card-circle">
       <span className="add-icon">+</span>
      </div>
      <div className="add-card-text">Add a new card</div>
     </div>
    </div>
   </div>

   <div className="subscription-section">
    <div className="subscription-content">
     <div className="subscription-text">
      <h3 className="subscription-title">구독서비스</h3>
      <p className="subscription-subtitle">신청해보세요</p>
      <div className="subscription-description">
       <p className="description-title">The Travel</p>
       <p className="description-text">구독하고 포르투 워터프론트 멋진리세요</p>
      </div>
      <div className="subscription-form">
       <input
        type="email"
        placeholder="Your email address"
        className="email-input"
       />
       <button className="subscribe-button">Subscribe</button>
      </div>
     </div>
     <div className="subscription-image">
      <div className="image-placeholder"></div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MyPaymentPage;
