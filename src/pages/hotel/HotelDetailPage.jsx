import React from 'react'
import Amenities from '../../components/hotelpage/Amenities'
import AvailableRooms from '../../components/hotelpage/AvailableRooms'
import HotelDetailHeader from '../../components/hotelpage/HotelDetailHeader'
import HotelGallery from '../../components/hotelpage/HotelGallery'
import HotelMap from '../../components/hotelpage/HotelMap'
import HotelOverview from '../../components/hotelpage/HotelOverview'
import HotelReviews from '../../components/hotelpage/HotelReviews'
const HotelDetailPage = () => {
  return (
    <div>
      <HotelDetailHeader />
      <HotelGallery />
      <HotelOverview /> 
      <Amenities />
      <AvailableRooms />
      <HotelMap />
      <HotelReviews />
    </div>
  )
}

export default HotelDetailPage