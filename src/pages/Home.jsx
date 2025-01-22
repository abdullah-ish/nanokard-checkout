import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutContext from "../contexts/checkout/CheckoutContext";
import { showSuccessToast, showErrorToast } from "../components/Toast";
import RedirectingToCheckout from "../components/RedirectingToCheckout";

function Home() {
  const { getCheckoutDetails } = useContext(CheckoutContext);
  const navigate = useNavigate();

  const fetchCheckoutDetails = async (checkoutId) => {
    try {
      let params = { checkout_id: checkoutId };
      const res = await getCheckoutDetails(params);
      console.log("checkout api response-----:", res);
      localStorage.setItem("checkoutId", checkoutId);

      if (["active", "pending"].includes(res?.user_status)) {
        navigate("/send-otp");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.log("get checkout error-------------", error.message);
      navigate("/error");
      showErrorToast(error.message);
    }
  };

  useEffect(() => {
    // Extract sessionId from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = "ch-8140-1727780936";

    if (sessionId) {
      fetchCheckoutDetails(sessionId);
    } else {
      console.log("No sessionId found in the URL");
      showErrorToast("Checkout Session Not Found");
      navigate("/error"); // Handle case where sessionId is missing
    }
  }, []);

  return <RedirectingToCheckout />;
}

export default Home;
