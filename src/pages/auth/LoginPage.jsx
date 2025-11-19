import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import "../../styles/pages/auth/LoginPage.scss";
import AuthImageWrap from "../../components/auth/AuthImageWrap";

const LoginPage = () => {
 return (
  <div className="login-page">
   <div className="auth-layout-container">
    <div className="auth-layout-content">
     <div className="auth-layout-form-section">
      <LoginForm />
     </div>
     <AuthImageWrap />
    </div>
   </div>
  </div>
 );
};

export default LoginPage;
