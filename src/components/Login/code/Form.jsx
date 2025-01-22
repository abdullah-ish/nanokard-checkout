import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import VerificationCodeInput from "./CodeInput";
import AuthContext from "../../../contexts/auth/AuthContext";
import { showSuccessToast, showErrorToast } from "../../Toast";
import CheckoutContext from "../../../contexts/checkout/CheckoutContext";

const Form = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [otpSent, setOtpSentStatus] = useState(false);
  const navigate = useNavigate();
  const { sendOtp, newLoginNumber, existingUserData, setExistingUserData } =
    useContext(AuthContext);
  const { checkoutData } = useContext(CheckoutContext);
  const [isSending, setIsSending] = useState(false);
  let phoneNumber =
    newLoginNumber !== null
      ? newLoginNumber
      : checkoutData?.shopperData?.phone_number;

  const handleOtpComplete = (status) => {
    setVerificationStatus(status);
    setIsVerifying(false);
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleResendCodeClick = async () => {
    setVerificationStatus(null);
    setIsSending(true); // Show "Sending..."
    setOtpSentStatus(false); // Hide "Code Sent Again"

    setTimeout(async () => {
      let formData = new FormData();
      formData.append("phone_number", phoneNumber || "");
      try {
        const res = await sendOtp(formData);

        showSuccessToast("Code Sent Again");
        setIsSending(false); // Hide "Sending..."
        setOtpSentStatus(true); // Show "Code Sent Again"
        setExistingUserData(null);

        // Hide "Code Sent Again" after 3 seconds
        setTimeout(() => {
          setOtpSentStatus(false);
        }, 3000);
      } catch (error) {
        setIsSending(false); // Hide "Sending..." on error
        if (error.status === 401) {
          console.log("session has been expired", error.status);
          navigate("/session-expired");
        } else {
          showErrorToast(error.message);
          console.log("api error-------------", error.message);
        }
      }
    }, 3000); // 3-second delay before sending the request
  };
  useEffect(() => {
    if (verificationStatus === true) {
      const timer = setTimeout(() => {
        if (existingUserData?.card?.length > 0) {
          navigate("/payment");
        } else {
          navigate("/signup");
        }
      }, 2000); // 2-second delay

      return () => clearTimeout(timer);
    }
  }, [verificationStatus, navigate]);

  return (
    <div className="header sm:w-full h-[445px] sm:h-full min-h-[445px] h-[calc(100vh-310px)] flex flex-col items-center">
      <div className="sm:w-full w-[342px] space-y-6 sm:h-full h-[203px] mt-10">
        <div className="w-full h-[50px] flex flex-col items-center gap-1">
          <h2 className="heading-2 sm:mt-0 mt-2">Enter the 6-digit code</h2>
          <h4 className="heading-4-normal">
            Code sent to (•••) •••-••
            {phoneNumber?.slice(-2) || ""}.
          </h4>
        </div>
        <div className="w-full h-[141px] flex flex-col justify-center">
          <div className="w-full h-[98px] flex flex-col items-center gap-2">
            <div className="w-full h-[70px]">
              <VerificationCodeInput onOtpComplete={handleOtpComplete} />
            </div>
            {isVerifying && (
              <p className="text-mediumGray font-bold text-xs">Verifying...</p>
            )}
            {verificationStatus === false && (
              <p className="text-[#E32B25]">
                Incorrect code. Try again or resend code
              </p>
            )}
            {verificationStatus === true && (
              <p className="text-[#008A05]">Verified</p>
            )}
          </div>
          <button
            className="text-btn-blue  w-[90px] sm:ml-[165px] ml-[125px]"
            onClick={handleResendCodeClick}
          >
            Resend code
          </button>
          {otpSent && (
            <p className="text-[#008A05] text-center">Code Sent Again</p>
          )}
          {isSending && (
            <p className="text-blue text-center">Sending Code...</p>
          )}
        </div>
      </div>
      <div className="w-full space-y-1 flex flex-col items-center mt-auto">
        <div className="flex sm:py-0 py-5">
          <p className="paragraph-lg text-mediumGray">
            Don’t have a NanoKard account?
          </p>
          <button className="text-btn-blue ml-1" onClick={handleSignUpClick}>
            Sign up and pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
