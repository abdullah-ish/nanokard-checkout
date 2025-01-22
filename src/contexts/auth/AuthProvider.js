// src/contexts/checkout/CheckoutProvider.js
import React, { useState, useContext } from "react";
import AuthContext from "./AuthContext";
import {
  get,
  postWithMultipart,
  patch,
  postWithJSON,
} from "../../utils/apiUtils";
import CheckoutContext from "../checkout/CheckoutContext";

import {
  card,
  deliveryAddress,
  prepareFormData,
  shopperData,
} from "../../utils/constants";
import { showErrorToast, showSuccessToast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [preInfo, setPreInfo] = useState(null);
  const [cardSlug, setCardSlug] = useState(null);
  const [formRef, setFormRef] = useState(null);
  const [cardVerification, setCardVerification] = useState(false);
  const [existingUserData, setExistingUserData] = useState(null);
  const [mobileData, setMobileData] = useState(null);
  const { checkoutData } = useContext(CheckoutContext);
  const navigate = useNavigate();
  const orderTotal = checkoutData?.order?.grand_total_value;
  const pre_auth_hold_amount = checkoutData?.pre_auth_hold_amount;
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [returnUrl, setReturnUrl] = useState("");
  const [newLoginNumber, setNewLoginNumber] = useState(null);
  const [handleloading, setHandleLoading] = useState(false);
  const [addCard, setAddCard] = useState(null);
  const [cardBrand, setCardBrand] = useState("");
  const [cardLimitReached, setCardLimitReached] = useState(false);
  const [billingShippingSame, setBillingShippingSame] = useState(false);
  const [initialValues, setInitialValues] = useState({
    ...shopperData,
    ...deliveryAddress,
    ...card,
  });

  // Function to send data to the API
  const preAuth = async (params) => {
    setPreInfo(params);
    try {
      setPaymentProcessing(true);
      const data = await postWithMultipart("/api/v2/checkout/pre_auth", params);
      setPaymentProcessing(false);
      console.log("preAuth api respons-----", data);
      return data;
    } catch (error) {
      setPaymentProcessing(false);
      console.error("Error in pre auth api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      throw {
        message: errorMessage,
        status: statusCode,
      };
    }
  };

  const preAuthVerification = async (params) => {
    // preInfo is a formData
    setCardVerification(true);
    let FormData = preInfo;
    FormData.append("amount", params.amount);
    console.log("formData in card verification", FormData, params);
    try {
      const data = await postWithMultipart(
        "/api/v2/checkout/pre_auth_verify",
        FormData
      );
      console.log("response-----", data);
      setCardSlug(data.card_id);
      return data;
    } catch (error) {
      console.error("Error in pre auth verification api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";
      const card_blocked = error?.response?.data?.card_blocked || false;

      throw {
        message: errorMessage,
        status: statusCode,
        card_blocked: card_blocked,
      };
    }
  };

  const payNow = async (params) => {
    // preInfo is a formData
    let FormData = params;
    FormData.append("card_id", cardSlug);
    console.log("pay now form data-----", FormData);
    setHandleLoading(true);
    try {
      const data = await postWithMultipart(
        "/api/v2/checkout/pay_now",
        FormData
      );

      setReturnUrl(data?.return_url || "");
      return data;
    } catch (error) {
      console.error("Error in pay now api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      setErrorMessage(errorMessage);
      throw {
        message: errorMessage,
        status: statusCode,
      };
    } finally {
      setHandleLoading(false);
    }
  };

  const sendOtp = async (params) => {
    let FormData = params;
    console.log("send otp params-----", FormData);
    try {
      const data = await postWithMultipart(
        "/api/v2/checkout/send_otp",
        FormData
      );

      return data;
    } catch (error) {
      console.error("Error in send otp api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      throw {
        message: errorMessage,
        status: statusCode,
      };
    }
  };

  const verifyOtp = async (params) => {
    let FormData = params;
    console.log("verify otp params-----", FormData);
    try {
      const data = await postWithMultipart(
        "/api/v2/checkout/verify_otp",
        FormData
      );

      setExistingUserData(data.data);
      console.log("existing user data", data.data);
      return data;
    } catch (error) {
      console.error("Error in verify otp api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      throw {
        message: errorMessage,
        status: statusCode,
      };
    }
  };

  const existingUserPayNow = async (params) => {
    let FormData = params;
    console.log("pay now form data-----", FormData);
    try {
      const data = await postWithMultipart(
        "/api/v2/checkout/pay_now",
        FormData
      );

      setReturnUrl(data?.return_url || "");
      return data;
    } catch (error) {
      console.error("Error in pay now api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      setErrorMessage(errorMessage);
      throw {
        message: errorMessage,
        status: statusCode,
      };
    }
  };

  const editCard = async (params) => {
    let FormData = params;
    console.log("edit card form data-----", FormData);
    try {
      const data = await patch("/api/v2/checkout/update_card", FormData);

      return data;
    } catch (error) {
      console.error("Error in edit card api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      throw {
        message: errorMessage,
        status: statusCode,
      };
    }
  };

  const logOut = async () => {
    try {
      const data = await postWithJSON("/api/v2/checkout/log_out");

      console.log("log out api response:", data);
      return data;
    } catch (error) {
      console.error("log out api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      throw {
        message: errorMessage,
        status: statusCode,
      };
    }
  };

  // sign up flow for new user
  const handleApiCalling = async (values = null) => {
    console.log("formRef", formRef);
    const newData = values || mobileData;
    const formData = await prepareFormData(
      newData,
      checkoutData?.public_key_data
    );
    console.log("formdata", formData, "Data", newData);
    if (billingShippingSame) {
      formData.append("is_billing_address_same", billingShippingSame);
    }
    if (existingUserData === null) {
      formData.append("email", newData.email);
      formData.append("phone_number", newData.phone_number);
      formData.append("first_name", newData.first_name);
      formData.append("last_name", newData.last_name);
    }

    setHandleLoading(true);
    try {
      if (!newData.futureConfirmation && orderTotal < pre_auth_hold_amount) {
        formData.append("payment_method", "card");
        const res = await existingUserPayNow(formData);
        navigate("/payment/success");
        showSuccessToast("Payment Successful");
      } else {
        const res = await preAuth(formData);
        setInitialValues(newData);
        navigate("/payment/verify-card");
        showSuccessToast("Enter the pre auth amount");
      }
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        showErrorToast(error.message);
        console.log("handleSubmit error-------------", error.message);
        setInitialValues(newData);
        navigate("/payment/failure");
      }
    } finally {
      setHandleLoading(false);
    }
  };

  const cancelSession = async () => {
    try {
      const data = await postWithJSON("/api/v2/checkout/checkout_cancel");

      console.log("cancel session api response:", data);
      return data;
    } catch (error) {
      console.error("cancel session api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      throw {
        message: errorMessage,
        status: statusCode,
      };
    }
  };

  const getCardBrand = async (params) => {
    console.log("getCardBrand params-----", params);
    try {
      const data = await get("/api/v2/checkout/get_card_brand", params);

      return data;
    } catch (error) {
      console.error("Error in getCardBrand api:", error.response);
      const errorMessage =
        error?.response?.data?.message || "An error occurred, try again";
      const statusCode = error?.response?.status || "Unknown";

      throw {
        message: errorMessage,
        status: statusCode,
      };
    }
  };

  const handleCancelSession = async () => {
    let cancelUrl = "";

    try {
      const res = await cancelSession();
      console.log("Session Cancelled Successfully", res);
      cancelUrl = res?.cancel_url || "";
    } catch (error) {
      console.log("Cancel session response-------------", error.message);
    }

    localStorage.removeItem("checkout_token");
    console.log("Cancel url-------------", cancelUrl);

    // Close the current window
    window.close();

    // If a cancel URL is provided, redirect the parent window to that URL
    if (cancelUrl) {
      window.opener.postMessage({ action: "redirect", url: cancelUrl }, "*");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        preAuth,
        preAuthVerification,
        paymentProcessing,
        payNow,
        setFormRef,
        formRef,
        sendOtp,
        verifyOtp,
        cardVerification,
        setCardVerification,
        existingUserData,
        setExistingUserData,
        existingUserPayNow,
        editCard,
        logOut,
        mobileData,
        setMobileData,
        handleApiCalling,
        errorMessage,
        isMobile,
        setIsMobile,
        initialValues,
        setInitialValues,
        cancelSession,
        returnUrl,
        setNewLoginNumber,
        newLoginNumber,
        handleloading,
        getCardBrand,
        setCardBrand,
        cardBrand,
        addCard,
        setAddCard,
        setCardLimitReached,
        cardLimitReached,
        setBillingShippingSame,
        handleCancelSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
