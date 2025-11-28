import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components/booking/BookingStepDates.scss";

const BookingStepDates = () => {
 const { hotelId } = useParams();
 const navigate = useNavigate();
 const [searchParams] = useSearchParams();

 const [dateRange, setDateRange] = useState([null, null]);
 const [startDate, endDate] = dateRange;
 const [adults, setAdults] = useState(2);
 const [children, setChildren] = useState(0);
 const [hotel, setHotel] = useState(null);

 useEffect(() => {
  // URL 파라미터에서 데이터 가져오기
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  if (checkIn)
   setDateRange([new Date(checkIn), checkOut ? new Date(checkOut) : null]);
  if (guests) setAdults(parseInt(guests));

  // TODO: 호텔 정보 API 호출
  setHotel({
   _id: hotelId,
   name: "그랜드 호텔 서울",
   image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
   rating: 4.5,
  });
 }, [hotelId, searchParams]);

 const calculateNights = () => {
  if (!startDate || !endDate) return 0;
  const diffTime = Math.abs(endDate - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
 };

 const handleContinue = () => {
  if (!startDate || !endDate) {
   alert("날짜를 선택해주세요");
   return;
  }
  const params = new URLSearchParams();
  params.append("checkIn", startDate.toISOString());
  params.append("checkOut", endDate.toISOString());
  params.append("adults", adults);
  params.append("children", children);
  navigate(`/booking/${hotelId}/room?${params.toString()}`);
 };

 return (
  <div className="booking-dates">
   <div className="booking-header">
    <h1>날짜 및 인원 선택</h1>
    {hotel && (
     <div className="hotel-info">
      <span className="hotel-name">{hotel.name}</span>
      <span>⭐ {hotel.rating}</span>
     </div>
    )}
   </div>

   <div className="booking-content">
    <div className="date-selection">
     <h2>숙박 날짜를 선택하세요</h2>
     <div className="calendar-wrapper">
      <DatePicker
       selectsRange={true}
       startDate={startDate}
       endDate={endDate}
       onChange={(update) => setDateRange(update)}
       inline
       monthsShown={2}
       minDate={new Date()}
       locale={ko}
      />
     </div>

     <div className="guests-section">
      <h3>투숙객 정보</h3>
      <div className="guest-controls">
       <div className="guest-info">
        <div className="guest-type">성인</div>
        <div className="guest-desc">만 19세 이상</div>
       </div>
       <div className="counter">
        <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
        <span className="count">{adults}</span>
        <button onClick={() => setAdults(Math.min(10, adults + 1))}>+</button>
       </div>
      </div>

      <div className="guest-controls">
       <div className="guest-info">
        <div className="guest-type">어린이</div>
        <div className="guest-desc">만 18세 이하</div>
       </div>
       <div className="counter">
        <button
         onClick={() => setChildren(Math.max(0, children - 1))}
         disabled={children === 0}
        >
         -
        </button>
        <span className="count">{children}</span>
        <button onClick={() => setChildren(Math.min(10, children + 1))}>
         +
        </button>
       </div>
      </div>
     </div>
    </div>

    <div className="booking-summary">
     {hotel && (
      <div className="summary-hotel">
       <img src={hotel.image} alt={hotel.name} />
       <div className="hotel-details">
        <h3>{hotel.name}</h3>
        <div className="rating">⭐ {hotel.rating} (우수함)</div>
       </div>
      </div>
     )}

     <div className="summary-details">
      <div className="detail-row">
       <span className="label">체크인</span>
       <span className="value">
        {startDate ? startDate.toLocaleDateString("ko-KR") : "-"}
       </span>
      </div>
      <div className="detail-row">
       <span className="label">체크아웃</span>
       <span className="value">
        {endDate ? endDate.toLocaleDateString("ko-KR") : "-"}
       </span>
      </div>
      <div className="detail-row">
       <span className="label">숙박 기간</span>
       <span className="value">{calculateNights()}박</span>
      </div>
      <div className="detail-row">
       <span className="label">투숙객</span>
       <span className="value">
        성인 {adults}명{children > 0 && `, 어린이 ${children}명`}
       </span>
      </div>
     </div>

     <button
      className="btn-continue"
      onClick={handleContinue}
      disabled={!startDate || !endDate}
     >
      객실 선택하기
     </button>
    </div>
   </div>
  </div>
 );
};

export default BookingStepDates;
