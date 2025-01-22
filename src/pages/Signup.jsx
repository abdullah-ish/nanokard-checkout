import React, { useContext } from "react";
import CreatAccountForm from "../components/signup/Form";
import InnerLayout from "../components/layout/InnerLayout";
import PaymentProcessingLoader from "../components/PaymentProcessing/PaymentProcessingLoader";
import AuthContext from "../contexts/auth/AuthContext";
import WelcomeBanner from "../components/layout/WelcomeBanner";
const Signup = () => {
  const { paymentProcessing, existingUserData } = useContext(AuthContext);
  const showWelcomeBanner = existingUserData !== null;

  return (
    <>
      {paymentProcessing ? (
        <PaymentProcessingLoader />
      ) : (
        <div>
          <div className="hidden sm:block">
            <InnerLayout welcomeBanner={showWelcomeBanner}>
              <CreatAccountForm />
            </InnerLayout>
          </div>
          <div className="block sm:hidden bg-white">
            {existingUserData && <WelcomeBanner/>}
            <CreatAccountForm />
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
