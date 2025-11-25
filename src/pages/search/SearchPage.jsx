import React from "react";
import HotelTypesTabs from "../../components/search/HotelTypesTabs";
import HotelResultsHeader from "../../components/search/HotelResultsHeader";
import HotelListCards from "../../components/search/HotelListCards";
import "../../styles/pages/search/SearchPage.scss";

const SearchPage = () => {
 // 임시 호텔 데이터
 const hotels = [
  {
   id: 1,
   name: "해튼호텔",
   image: "/hotel-placeholder.jpg",
   imageCount: 9,
   location: "Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437",
   stars: 5,
   amenities: 20,
   rating: 4.2,
   ratingLabel: "Very Good",
   reviews: 371,
   price: 240000,
  },
  {
   id: 2,
   name: "마제스틱 말라카 호텔",
   image: "/hotel-placeholder.jpg",
   imageCount: 9,
   location: "Kucukayasofya No. 40 Sultanahmet, Istanbul 34022",
   stars: 5,
   amenities: 20,
   rating: 4.2,
   ratingLabel: "Very Good",
   reviews: 371,
   price: 120000,
  },
 ];

 return (
  <div className="search-page">
   <HotelTypesTabs />
   <HotelResultsHeader total={257} showing={4} />
   <HotelListCards hotels={hotels} />
  </div>
 );
};

export default SearchPage;
