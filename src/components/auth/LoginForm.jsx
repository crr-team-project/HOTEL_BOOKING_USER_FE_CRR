import React, { useState } from "react";
import "../../styles/components/auth/LoginForm.scss";


const LoginForm = () => {
 const [formData, setFormData] = useState({
  email: "",
  password: "",
  rememberMe: false,
 });

 const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: type === "checkbox" ? checked : value,
  }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  // 로그인 로직 구현 예정
  console.log("Login data:", formData);
 };

 const handleSocialLogin = (provider) => {
  // 소셜 로그인 로직 구현 예정
  console.log(`${provider} login`);
 };

 return (
  <div className="login-form">
   <div className="login-header">
    <h1 className="login-title">Login</h1>
    <p className="login-subtitle">로그인하세요</p>
   </div>

   <form className="login-form-content" onSubmit={handleSubmit}>
    <div className="form-group">
     <label className="form-label">Email</label>
     <input
      type="email"
      name="email"
      className="form-input"
      placeholder="john.doe@gmail.com"
      value={formData.email}
      onChange={handleInputChange}
     />
    </div>

    <div className="form-group">
     <label className="form-label">Password</label>
     <div className="password-input-wrapper">
      <input
       type="password"
       name="password"
       className="form-input"
       placeholder="••••••••••••"
       value={formData.password}
       onChange={handleInputChange}
      />
      <button type="button" className="password-toggle">
       👁️
      </button>
     </div>
    </div>

    <div className="form-options">
     <label className="checkbox-wrapper">
      <input
       type="checkbox"
       name="rememberMe"
       checked={formData.rememberMe}
       onChange={handleInputChange}
      />
      <span className="checkbox-label">비밀번호 기억하기</span>
     </label>
     <a href="#" className="forgot-password">
      Forgot Password?
     </a>
    </div>

    <button type="submit" className="login-button">
     Login
    </button>

    <div className="divider">
     <span className="divider-text">회원가입</span>
    </div>

    <div className="social-login">
     <p className="social-login-text">Or login with</p>
     <div className="social-buttons">
      <button
       type="button"
       className="social-button facebook"
       onClick={() => handleSocialLogin("facebook")}
      >
       <span className="social-icon">f</span>
      </button>
      <button
       type="button"
       className="social-button google"
       onClick={() => handleSocialLogin("google")}
      >
       <span className="social-icon">G</span>
      </button>
      <button
       type="button"
       className="social-button apple"
       onClick={() => handleSocialLogin("apple")}
      >
       <span className="social-icon">🍎</span>
      </button>
     </div>
    </div>
   </form>
  </div>
 );
};

export default LoginForm;
