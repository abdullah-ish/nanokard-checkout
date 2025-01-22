import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";
import PaymentProcessingLoader from "./PaymentProcessingLoader";
import AuthContext from "../../contexts/auth/AuthContext";

function OrderUnsuccessful() {
  const [isLoading, setIsLoading] = useState(true);
  const { checkoutData } = useContext(CheckoutContext);
  const { existingUserData, setIsMobile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to switch from loading to content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      if (existingUserData?.card?.length === 0) {
        setIsMobile(false)
      }
      clearTimeout(timer);
    };
  }, []);

  const handleTryAgainClick = () => {
    if (
      ["active", "pending"].includes(checkoutData?.user_status) &&
      existingUserData?.card?.length > 0
    ) {
      navigate("/payment");
    } else {
      setIsMobile(false)
      navigate("/signup");
    }
  };

  return (
    <div className="sm:w-[819px] w-full sm:h-[740px] h-[449px] min-h-[449px] h-[calc(100vh-290px)] flex flex-col items-center bg-white justify-center gap-12">
      {isLoading ? (
        <PaymentProcessingLoader />
      ) : (
        <>
          <img src="/fail-decline-icon.svg" alt="Failed Decline Icon" />
          <div className="sm:w-[308px] w-[342px] flex flex-col items-center gap-6">
            <div className="w-full h-[79px] flex flex-col items-center gap-2">
              <p className="heading-1">Order unsuccessful</p>
              <p className="paragraph-lg text-veryDarkGray w-full h-[38px] text-center">
                There’s an issue with your payment method. Please try again.
              </p>
            </div>

            <button className="blue-btn-md-2" onClick={handleTryAgainClick}>
              Try Again
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderUnsuccessful;
