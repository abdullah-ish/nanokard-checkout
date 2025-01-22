import React from "react";
import LoadingScreen from "../LoadingScreen";

function PaymentProcessingLoader() {
  return (
    <LoadingScreen>
      <p className="heading-1">Processing payment</p>
      <p className="paragraph-lg w-full h-[38px] text-center">
        Please stay on this screen while we process your payment.
      </p>
    </LoadingScreen>
  );
}

export default PaymentProcessingLoader;
