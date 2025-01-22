// src/contexts/payment/PaymentProvider.js
import React, { useState, useEffect, useContext } from "react";
import PaymentContext from "./PaymentContext";
import AuthContext from "../auth/AuthContext";
import { showSuccessToast, showErrorToast } from "../../components/Toast";
import { useNavigate } from "react-router-dom";

const PaymentProvider = ({ children }) => {
  const { existingUserData, existingUserPayNow, preAuth } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  const [useWallet, setUseWallet] = useState(false);
  const [preAuthHoldAmount, setPreAuthHoldAmount] = useState(null);
  const [orderValue, setOrderValue] = useState(null);
  const walletAmount = existingUserData?.user?.user_wallet_balance;
  const [reviewSelectedCard, setReviewSelectedCard] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  useEffect(() => {
    if (existingUserData?.user) {
      setPreAuthHoldAmount(existingUserData.user.pre_auth_hold_amount);
      setOrderValue(existingUserData.user.order_value);
      const nonExpiredCardIndex = existingUserData?.card?.findIndex(card => !card.is_expired);

      if (nonExpiredCardIndex !== -1 && nonExpiredCardIndex !== undefined) {
        setSelectedCard(existingUserData?.card?.[nonExpiredCardIndex]?.card_id);
        setReviewSelectedCard(existingUserData?.card?.[nonExpiredCardIndex]);
      } else {
        setSelectedCard(null);
        setReviewSelectedCard(null);
      }
    }
  }, [existingUserData]);

  const doPayNow = async () => {
    let formData = new FormData();
    if (useWallet) {
      formData.append("payment_method", "wallet");
    } else {
      formData.append("payment_method", "card");
    }
    if (selectedCard != null) {
      formData.append("card_id", selectedCard);
    }
    setLoading(true); // Start loading
    try {
      const handlePaymentSuccess = async () => {
        await existingUserPayNow(formData);
        navigate("/payment/success");
        showSuccessToast("Payment Successful");
      };

      const handlePreAuth = async () => {
        await preAuth(formData);
        navigate("/payment/verify-card");
        showSuccessToast("Enter the pre-auth amount");
      };

      if (useWallet) {
        if (walletAmount >= orderValue) {
          await handlePaymentSuccess();
        } else {
          const difference = orderValue - walletAmount;
          if (difference <= preAuthHoldAmount) {
            await handlePaymentSuccess();
          } else {
            await handlePreAuth();
          }
        }
      } else {
        if (preAuthHoldAmount === null || orderValue <= preAuthHoldAmount) {
          await handlePaymentSuccess();
        } else {
          await handlePreAuth();
        }
      }
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        showErrorToast(error.message);
        console.log("api error-------------", error.message);
        navigate("/payment/failure");
      }
    } finally {
      setLoading(false); // Start loading
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        useWallet,
        setUseWallet,
        doPayNow,
        reviewSelectedCard,
        setReviewSelectedCard,
        loading,
        setIsAddingCard,
        isAddingCard,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentProvider;
