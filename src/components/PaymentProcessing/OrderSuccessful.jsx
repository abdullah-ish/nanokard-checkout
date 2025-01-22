import React, { useState, useEffect, useContext } from "react";
import Loader from "../Loader";
import AuthContext from "../../contexts/auth/AuthContext";
import PaymentProcessingLoader from "./PaymentProcessingLoader";

function OrderSuccessful() {
  const [isLoading, setIsLoading] = useState(true);
  const { returnUrl } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        handleClickHere();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleClickHere = () => {
    console.log("returnUrl:", returnUrl);
    // Close the current window
    window.close();

    // If a cancel URL is provided, redirect the parent window to that URL
    if (returnUrl) {
      window.opener.postMessage({ action: "redirect", url: returnUrl }, "*");
    }
  };

  return (
    <div className="sm:w-[819px] w-full sm:h-[594px] h-[449px] min-h-[449px] h-[calc(100vh-290px)] flex flex-col items-center bg-white justify-center gap-[10px]">
      {isLoading ? (
        <PaymentProcessingLoader />
      ) : (
        <>
          <img src="/success-icon.svg" alt="Success Icon" />
          <div className="sm:w-[308px] w-[342px] flex flex-col items-center gap-6">
            <div className="w-[308px] flex flex-col items-center gap-2">
              <p className="heading-1">Order successful</p>
              <p className="paragraph-lg text-veryDarkGray w-full h-[44px] text-center">
                Thank you for your order. Please wait to be redirected to the
                merchant.
              </p>
            </div>
            <div className="w-[307px] flex flex-col items-center gap-2">
              <p className="paragraph-lg text-veryDarkGray w-[217px] h-[38px] text-center">
                If you’re not redirected in a few seconds,
                <button
                  className="text-btn-blue ml-1"
                  onClick={handleClickHere}
                >
                  click here
                </button>
                .
              </p>
              <Loader />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderSuccessful;
