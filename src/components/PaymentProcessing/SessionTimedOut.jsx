import { React, useContext, useEffect } from "react";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";

function SessionTimedOut() {
  const { checkoutData } = useContext(CheckoutContext);
  const locationName = checkoutData
    ? checkoutData?.locationName || ""
    : "Merchant";
  let originUrl = checkoutData?.originUrl || "";

  const handleCancel = async () => {
    localStorage.removeItem("checkout_token");
    // Close the current window
    window.close();
    // If a cancel URL is provided, redirect the parent window to that URL
    if (originUrl) {
      window.opener.postMessage({ action: "redirect", url: originUrl }, "*");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleCancel();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="sm:w-[819px] w-full sm:h-[740px] h-[449px] min-h-[449px] h-[calc(100vh-290px)] flex flex-col items-center bg-white justify-center gap-12">
      <img src="/alert-action-required-icon.svg" alt="Action Required Icon" />
      <div className="w-[308px] flex flex-col items-center gap-6">
        <div className="w-full h-[79px] flex flex-col items-center gap-2">
          <p className="heading-1">Session timed out</p>
          <p className="paragraph-lg text-veryDarkGray w-full h-[38px] text-center">
            Go back to{" "}
            <button className="text-btn-blue" onClick={handleCancel}>
              {locationName}
            </button>{" "}
            to restart your checkout.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SessionTimedOut;
