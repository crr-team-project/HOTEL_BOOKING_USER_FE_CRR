import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import AuthLayout from "../../components/layouts/AuthLayout";
import "../../styles/pages/auth/LoginPage.scss";

const LoginPage = () => {
 return (
  <AuthLayout>
   <div className="login-page">
    <div className="login-container">
     <div className="login-content">
      <div className="login-form-section">
       <LoginForm />
      </div>
      <div className="login-image-section">
       <div className="hotel-image-wrapper">
        <img
         src="/images/hotel-resort.jpg"
         alt="Luxury Hotel Resort"
         className="hotel-image"
        />
       </div>
      </div>
     </div>
    </div>
   </div>
  </AuthLayout>
 );
};

export default LoginPage;
