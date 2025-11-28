import "../../styles/components/search/SearchFilterWrap.scss";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// 한글 로케일 설정을 위한 라이브러리 (선택적)
import { ko } from "date-fns/locale";
const SearchFilterWrap = () => {
 const [dateRange, setDateRange] = useState([null, null]);
 const [startDate, endDate] = dateRange;
 // 예약 불가능한 날짜를 판별하는 함수 (예시: 일요일은 예약 불가)
 const isDateDisabled = ({ date, view }) => {
  // 'month' 뷰에서만 체크
  if (view === "month") {
   // 일요일(0)이면 비활성화
   return date.getDay() === 0;
  }
 };
 return (
  <div className="search-form inner">
   <h3>Where are you staying?</h3>

   <div className="calendar-section">
    <DatePicker
     selectsRange={true}
     startDate={startDate}
     endDate={endDate}
     onChange={(update) => {
      setDateRange(update);
     }}
     inline
     monthsShown={1}
     minDate={new Date()}
     dateFormat="yyyy. MM. dd"
     locale={ko}
    />

    <div className="selected-dates">
     {startDate && endDate ? (
      <p>
       선택 기간: {startDate.toLocaleDateString("ko-KR")} ~{" "}
       {endDate.toLocaleDateString("ko-KR")}
      </p>
     ) : (
      <p>날짜를 선택해 주세요.</p>
     )}
    </div>
   </div>

   <div className="form-container">
    <div className="form-group">
     <label>Enter Destination</label>
     <input
      type="text"
      placeholder="예) 서울시 어머님댁 저희집"
      className="destination-input"
     />
    </div>

    <div className="form-group">
     <label>Check In</label>
     <input type="date" defaultValue="2024-01-22" className="date-input" />
    </div>

    <div className="form-group">
     <label>Check Out</label>
     <input type="date" defaultValue="2024-01-24" className="date-input" />
    </div>

    <div className="form-group">
     <label>Rooms & Guests</label>
     <select className="guests-select">
      <option>1 room, 2 guests</option>
      <option>1 room, 1 guest</option>
      <option>2 rooms, 4 guests</option>
     </select>
    </div>
   </div>
  </div>
 );
};

export default SearchFilterWrap;
