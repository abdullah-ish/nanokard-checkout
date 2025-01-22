import React, { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../../../contexts/auth/AuthContext";
import { showSuccessToast, showErrorToast } from "../../Toast";
import CheckoutContext from "../../../contexts/checkout/CheckoutContext";
import { useNavigate } from "react-router-dom";

function VerificationCodeInput({ numberOfDigits = 6, onOtpComplete }) {
  const [otp, setOtp] = useState(new Array(numberOfDigits).fill(""));
  const [otpError, setOtpError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false); // Track OTP verification status
  const otpBoxReference = useRef([]);
  const { verifyOtp, newLoginNumber } = useContext(AuthContext); // Access verifyOtp from AuthContext
  const { checkoutData } = useContext(CheckoutContext);
  const navigate = useNavigate();
  let phoneNumber =
    newLoginNumber !== null
      ? newLoginNumber
      : checkoutData?.shopperData?.phone_number;

  function handleChange(value, index) {
    let newArr = [...otp];

    // Only allow a single numeric character in each OTP input
    if (/^\d$/.test(value)) {
      newArr[index] = value;
      setOtp(newArr);

      // Move to the next input box if there's a value and it's not the last box
      if (index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    }
  }

  function handleBackspaceAndEnter(e, index) {
    // Handle Backspace key
    if (e.key === "Backspace") {
      let newArr = [...otp];

      if (e.target.value) {
        // Clear the current value if it's not empty
        newArr[index] = "";
        setOtp(newArr);
        otpBoxReference.current[index].value = ""; // Update input field
      } else if (index > 0) {
        // If current input is empty, clear the previous input and focus on it
        newArr[index - 1] = "";
        setOtp(newArr);
        otpBoxReference.current[index - 1].value = ""; // Update previous input field
        otpBoxReference.current[index - 1].focus(); // Move focus to the previous input
      }
    }

    // Handle Enter key
    if (
      (e.key === "Enter" || /^\d$/.test(e.key)) &&
      e.target.value &&
      index < numberOfDigits - 1
    ) {
      otpBoxReference.current[index + 1].focus();
      handleChange(e.key, index + 1);
    }
  }

  // Focus on the first input field by default when the component mounts
  useEffect(() => {
    if (otpBoxReference.current[0]) {
      otpBoxReference.current[0].focus();
    }
  }, []);

  // Automatically call the API once all OTP fields are filled
  useEffect(() => {
    const otpValue = otp.join("");
    if (otpValue.length === numberOfDigits) {
      verifyOtpCode(otpValue); // Call the verifyOtpCode function
    }
  }, [otp]);

  // Function to verify OTP by calling the API
  async function verifyOtpCode(otpValue) {
    try {
      setIsVerifying(true);
      let formData = new FormData();
      formData.append("phone_number", phoneNumber || "");
      formData.append("code", otpValue);
      const res = await verifyOtp(formData);

      setOtpError(null);
      setOtpVerified(true); // Set OTP verification to true on success
      onOtpComplete(true); // Notify parent about successful verification
      // showSuccessToast("OTP verified successfully!");
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        // showErrorToast(error.message || "Invalid OTP. Please try again.");
        setOtpError(error.message || "Invalid OTP. Please try again.");
        setOtpVerified(false); // Set OTP verification to false on failure
        onOtpComplete(false); // Notify parent about failed verification

        // Clear the OTP input fields on failure
        setTimeout(() => {
          setOtp(new Array(numberOfDigits).fill("")); // Clear OTP fields
          if (otpBoxReference.current[0]) {
            otpBoxReference.current[0].focus(); // Focus on the first input field
          }
          setOtpError(null);
        }, 2000); //clear input after 2 seconds
      }
    } finally {
      setIsVerifying(false);
    }
  }

  return (
    <article className="w-full">
      <div className="flex items-center sm:gap-4 gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || /^[0-9]$/.test(value)) {
                handleChange(value, index);
              }
            }}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`border sm:w-[56px] w-[47px] sm:h-full h-[58px] text-veryDarkGray leading-[65.37px] text-[48px] text-center font-semibold rounded-[10px] block bg-white focus:border-2 focus:outline-none appearance-none 
              ${otpError ? "border-red" : ""}
              ${otpVerified ? "border-moderateGreen" : "border-lightGray"}`}
          />
        ))}
      </div>
    </article>
  );
}

export default VerificationCodeInput;
