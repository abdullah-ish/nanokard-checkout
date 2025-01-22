import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";
import AuthContext from "../../contexts/auth/AuthContext";

function CardVerificationFailed() {
  const { checkoutData } = useContext(CheckoutContext);
  const { existingUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTryAgainClick = () => {
    if (
      ["active", "pending"].includes(checkoutData?.user_status) &&
      existingUserData?.card?.length > 0
    ) {
      navigate("/payment");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="sm:w-[819px] w-full sm:h-[740px] h-[449px] min-h-[449px] h-[calc(100vh-290px)] flex flex-col items-center bg-white justify-center gap-12">
      <img src="/fail-decline-icon.svg" alt="Failed Decline Icon" />
      <div className="sm:w-[308px] w-[342px] flex flex-col items-center gap-6">
        <div className="w-full h-[79px] flex flex-col items-center gap-2">
          <p className="heading-1">Card verification failed</p>
          <p className="paragraph-lg text-veryDarkGray w-full h-[38px] text-center">
            We could not verify your card. Try a different payment method.
          </p>
        </div>

        <button className="blue-btn-md-2" onClick={handleTryAgainClick}>
          Try Again
        </button>
      </div>
    </div>
  );
}

export default CardVerificationFailed;
