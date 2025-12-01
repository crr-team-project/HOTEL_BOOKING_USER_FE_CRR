import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import "../../styles/components/booking/BookingStepPayment.scss";
const BookingStepPayment = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // "saved-{id}" or "new"
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    nameOnCard: "",
    country: "South Korea",
    saveCard: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // TODO: API에서 호텔 및 객실 정보 가져오기
    setHotel({
      _id: hotelId,
      name: "그랜드 호텔 서울",
      address: "서울시 중구 소공로 100",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    });

    const roomId = searchParams.get("roomId");
    // TODO: roomId로 객실 정보 가져오기
    setRoom({
      _id: roomId,
      name: "Deluxe Room",
      size: "35㎡",
      bedType: "King Bed",
      price: 180000,
      amenities: ["WiFi", "에어컨", "TV", "냉장고", "욕조"],
    });

    // TODO: API에서 저장된 카드 목록 가져오기
    // MyPaymentPage와 동일한 카드 데이터 구조 사용
    const userCards = [
      {
        id: 1,
        last4: "4321",
        expiry: "02/27",
        type: "visa",
        nameOnCard: "홍길동",
      },
    ];

    setSavedCards(userCards);

    // 저장된 카드가 있으면 첫 번째 카드를 기본 선택
    if (userCards.length > 0) {
      setSelectedPaymentMethod(`saved-${userCards[0].id}`);
    }
  }, [hotelId, searchParams]);

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const adults = searchParams.get("adults") || 2;
  const children = searchParams.get("children") || 0;

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice = room ? room.price * nights : 0;
  const serviceFee = Math.floor(totalPrice * 0.1);
  const tax = Math.floor(totalPrice * 0.1);
  const finalTotal = totalPrice + serviceFee + tax;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    let processedValue = value;

    // 카드 번호 포맷팅 (xxxx-xxxx-xxxx-xxxx)
    if (name === "cardNumber") {
      processedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1-")
        .slice(0, 19);
    }

    // 만료일 포맷팅 (MM/YY)
    if (name === "expiryDate") {
      processedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(?=\d)/, "$1/")
        .slice(0, 5);
    }

    // CVC 숫자만
    if (name === "cvc") {
      processedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : processedValue,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 결제 수단 선택 확인
    if (!selectedPaymentMethod) {
      setError("결제 수단을 선택해주세요.");
      return;
    }

    // 새 카드를 선택한 경우에만 카드 정보 검증
    if (selectedPaymentMethod === "new") {
      // 기본 검증
      if (
        !formData.cardNumber ||
        !formData.expiryDate ||
        !formData.cvc ||
        !formData.nameOnCard
      ) {
        setError("모든 필수 필드를 입력해주세요.");
        return;
      }

      // 카드 번호 검증 (16자리)
      const cleanCardNumber = formData.cardNumber.replace(/\D/g, "");
      if (cleanCardNumber.length !== 16) {
        setError("올바른 카드 번호를 입력해주세요.");
        return;
      }

      // CVC 검증 (3자리)
      if (formData.cvc.length !== 3) {
        setError("올바른 CVC를 입력해주세요.");
        return;
      }
    }

    // TODO: 결제 API 호출
    console.log("Payment data:", {
      hotelId,
      roomId: searchParams.get("roomId"),
      checkIn,
      checkOut,
      adults,
      children,
      payment: formData,
      totalPrice: finalTotal,
    });

    // 성공 후 완료 페이지로 이동
    navigate(`/booking/${hotelId}/complete?${searchParams.toString()}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="booking-payment">
      <div className="booking-content">
        <div className="payment-section">
          <div className="section-card">
            <h2>
              <span className="icon">💳</span>
              결제 수단 선택
            </h2>

            {error && <div className="error-message">{error}</div>}

            {/* 저장된 카드 목록 */}
            <div className="payment-methods">
              {savedCards.map((card) => (
                <div
                  key={card.id}
                  className={`payment-option ${
                    selectedPaymentMethod === `saved-${card.id}`
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => setSelectedPaymentMethod(`saved-${card.id}`)}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={`saved-${card.id}`}
                    checked={selectedPaymentMethod === `saved-${card.id}`}
                    onChange={() =>
                      setSelectedPaymentMethod(`saved-${card.id}`)
                    }
                  />
                  <div className="payment-icon">💳</div>
                  <div className="payment-details">
                    <div className="payment-name">
                      {card.type.toUpperCase()} **** {card.last4}
                    </div>
                    <div className="payment-desc">
                      만료일: {card.expiry} · {card.nameOnCard}
                    </div>
                  </div>
                </div>
              ))}

              {/* 새 카드 추가 옵션 */}
              <div
                className={`payment-option ${
                  selectedPaymentMethod === "new" ? "selected" : ""
                }`}
                onClick={() => setSelectedPaymentMethod("new")}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="new"
                  checked={selectedPaymentMethod === "new"}
                  onChange={() => setSelectedPaymentMethod("new")}
                />
                <div className="payment-icon">➕</div>
                <div className="payment-details">
                  <div className="payment-name">새 카드 추가</div>
                  <div className="payment-desc">
                    새로운 결제 수단을 등록합니다
                  </div>
                </div>
              </div>
            </div>

            {/* 새 카드 입력 폼 (새 카드 선택 시에만 표시) */}
            {selectedPaymentMethod === "new" && (
              <form onSubmit={handleSubmit} className="new-card-form">
                <div className="form-group">
                  <label>카드 번호</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="**** **** **** ****"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>만료일</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVC</label>
                    <input
                      type="text"
                      name="cvc"
                      placeholder="123"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>카드 소유자 이름</label>
                  <input
                    type="text"
                    name="nameOnCard"
                    placeholder="홍길동"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>국가</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                  >
                    <option value="South Korea">대한민국</option>
                    <option value="United States">미국</option>
                    <option value="Japan">일본</option>
                    <option value="China">중국</option>
                    <option value="United Kingdom">영국</option>
                  </select>
                </div>
              </form>
            )}
          </div>

          {/* 약관 동의 섹션 */}
          <div className="section-card terms-section">
            <h2>
              <span className="icon">📋</span>
              약관 동의
            </h2>
            <div className="term-item">
              <input
                type="checkbox"
                id="saveCard"
                name="saveCard"
                checked={formData.saveCard}
                onChange={handleInputChange}
              />
              <label htmlFor="saveCard">
                <div className="term-title">결제수단 안전하게 저장</div>
              </label>
            </div>
            <div className="term-item">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                <div className="term-title">
                  이용약관 및 개인정보처리방침에 동의합니다
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="payment-summary">
          <h3>예약 요약</h3>

          <div className="booking-details">
            {hotel && (
              <>
                <div className="detail-item">
                  <span className="label">호텔명</span>
                  <span className="value">{hotel.name}</span>
                </div>
                <div className="detail-item">
                  <span className="label">주소</span>
                  <span className="value">{hotel.address}</span>
                </div>
              </>
            )}
          </div>

          <div className="booking-details">
            <div className="detail-item">
              <span className="label">체크인</span>
              <span className="value">
                {checkIn ? new Date(checkIn).toLocaleDateString("ko-KR") : "-"}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">체크아웃</span>
              <span className="value">
                {checkOut
                  ? new Date(checkOut).toLocaleDateString("ko-KR")
                  : "-"}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">숙박 기간</span>
              <span className="value">{nights}박</span>
            </div>
            <div className="detail-item">
              <span className="label">투숙객</span>
              <span className="value">
                성인 {adults}명{children > 0 ? `, 어린이 ${children}명` : ""}
              </span>
            </div>
            {room && (
              <div className="detail-item">
                <span className="label">객실</span>
                <span className="value">
                  {room.name} ({room.size})
                </span>
              </div>
            )}
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>
                ₩{formatPrice(room?.price || 0)} × {nights}박
              </span>
              <span>₩{formatPrice(totalPrice)}</span>
            </div>
            <div className="price-row">
              <span>서비스 수수료</span>
              <span>₩{formatPrice(serviceFee)}</span>
            </div>
            <div className="price-row">
              <span>세금</span>
              <span>₩{formatPrice(tax)}</span>
            </div>
            <div className="price-row total">
              <span>총 합계</span>
              <span>₩{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <button onClick={handleSubmit} className="btn-pay">
            ₩{formatPrice(finalTotal)} 결제하기
          </button>

          <div className="payment-secure">
            <span className="icon">🔒</span>
            <span>안전한 결제</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingStepPayment;
