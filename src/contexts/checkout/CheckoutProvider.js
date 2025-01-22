// src/contexts/checkout/CheckoutProvider.js
import React, { useState, useEffect } from "react";
import CheckoutContext from "./CheckoutContext";
import { get } from "../../utils/apiUtils";

const CheckoutProvider = ({ children }) => {
  const [checkoutData, setCheckoutData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [shippingData, setShippingData] = useState(null);

  // Function to fetch data from the API
  const getCheckoutDetails = async (params) => {
    try {
      const data = await get("/api/v2/checkout/checkout", params);

      // Assuming the token is part of the response data
      if (data && data.token) {
        localStorage.setItem("checkout_token", data.token);
      }

      setCheckoutData(data);
      setOrderData(data.order);
      setProductsData(data.lineItems);
      setShippingData(data.deliveryAddress);
      return data;
    } catch (error) {
      console.error("Error fetching checkout data:", error.response);
      let errorMessage =
        error?.response?.data?.message || "An error occured, try again";
      throw Error(errorMessage);
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        checkoutData,
        setCheckoutData,
        orderData,
        productsData,
        shippingData,
        getCheckoutDetails,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
