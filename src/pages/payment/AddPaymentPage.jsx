import React from "react";
import PaymentForm from "../../components/payment/PaymentForm";
import AuthLayout from "../../components/layouts/AuthLayout";
import "../../styles/pages/payment/AddPaymentPage.scss";
import AuthImageWrap from "../../components/auth/AuthImageWrap";

const AddPaymentPage = () => {
 return (
  <AuthLayout>
   <div className="add-payment-page">
    <div className="auth-layout-container">
     <div className="auth-layout-content">
      <div className="auth-layout-form-section">
       <PaymentForm />
      </div>
      <div className="auth-layout-image-section">
       <AuthImageWrap />
      </div>
     </div>
    </div>
   </div>
  </AuthLayout>
 );
};

export default AddPaymentPage;
