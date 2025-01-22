import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentProcessingLoader from "../components/PaymentProcessing/PaymentProcessingLoader";

function PaymentProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/payment/verify-card");
    }, 2000);

    // Cleanup the timer if the component unmounts before the timeout
    return () => clearTimeout(timer);
  }, [navigate]);
  return <PaymentProcessingLoader />;
}

export default PaymentProcessing;
