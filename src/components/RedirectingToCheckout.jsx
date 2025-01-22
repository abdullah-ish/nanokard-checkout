import React from "react";
import LoadingScreen from "./LoadingScreen";

function RedirectingToCheckout() {
  return (
    <LoadingScreen>
      <p className="heading-2">Redirecting you to checkout</p>
    </LoadingScreen>
  );
}

export default RedirectingToCheckout;
