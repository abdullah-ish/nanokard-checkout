import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import { showSuccessToast, showErrorToast } from "../Toast";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";

const ExistingUserLogin = () => {
  const { sendOtp } = useContext(AuthContext);
  const { checkoutData } = useContext(CheckoutContext);
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/signup");
  };
  const handleLogInClick = () => {
    navigate("/login");
  };
  const handleSendCodeClick = async () => {
    let formData = new FormData();
    formData.append(
      "phone_number",
      checkoutData?.shopperData?.phone_number || ""
    );
    try {
      const res = await sendOtp(formData);

      navigate("/verify-code");
      showSuccessToast("OTP Sent Successfully");
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        showErrorToast(error.message);
        console.log("api error-------------", error.message);
      }
    }
  };
  return (
    <div className="sm:space-y-8 sm:w-full h-[445px] sm:h-[295px] min-h-[445px] sm:min-h-[295px] h-[calc(100vh-310px)] flex flex-col items-center">
      <div className="sm:w-full w-[342px] h-full sm:py-6 py-8 gap-8 flex flex-col items-center">
        <p className="heading-2">Log in to NanoKard to pay</p>
        <p className="paragraph-lg text-veryDarkGray sm:w-[330px] w-full text-center">
          Welcome back! We'll send a code to your mobile number ending in
          <b> ** {checkoutData?.shopperData?.phone_number?.slice(-2)}</b> for
          you to log in.
        </p>
        <button
          className="blue-btn-lg sm:w-[287px] w-full"
          onClick={handleSendCodeClick}
        >
          Send Code
        </button>
      </div>
      <div className="w-full space-y-1 flex flex-col items-center mb-6">
        <div className="flex">
          <p className="paragraph-lg text-mediumGray">Not you?</p>
          <button
            className="text-btn-blue ml-1 mr-1"
            onClick={handleLogInClick}
          >
            Log in
          </button>
          <p className="paragraph-lg text-mediumGray">or</p>
          <button className="text-btn-blue ml-1" onClick={handleSignUpClick}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExistingUserLogin;
