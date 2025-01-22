import React from "react";
import ManagePaymentDetails from "../components/PaymentInformation/ManagePaymentDetails";
import InnerLayout from "../components/layout/InnerLayout";
import LoginForm from "../components/Login/LoginForm";
import WelcomeBanner from "../components/layout/WelcomeBanner";
import MobileManagePayment from "../components/PaymentInformation/MobileManagePayment";

function PaymentInformation() {
  return (
    <div>
        <div className="hidden sm:block">
            <InnerLayout welcomeBanner>
                <MobileManagePayment/>
            </InnerLayout>
        </div>
        <div className="block sm:hidden bg-white">
            <WelcomeBanner/>
            <MobileManagePayment/>
        </div>
    </div>
)
    ;
}

export default PaymentInformation;
