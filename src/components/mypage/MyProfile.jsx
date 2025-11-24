import React from 'react'
import MyProfilePhoto from './MyProfilePhoto'
import "../../styles/components/mypage/myProfile.scss";
const MyProfile = () => {
  return (
    <div className='my-profile'>
      <div className="my-profile-bg"></div>
      <MyProfilePhoto />
    </div>
  )
}

export default MyProfile