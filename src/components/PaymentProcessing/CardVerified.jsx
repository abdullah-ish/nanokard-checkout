import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import AuthContext from "../../contexts/auth/AuthContext";
import PaymentContext from "../../contexts/payment/PaymentContext";
import { showSuccessToast, showErrorToast } from "../Toast";

function CardVerified() {
  const { payNow } = useContext(AuthContext);
  const { useWallet } = useContext(PaymentContext);
  const navigate = useNavigate();

  const doPayNow = async () => {
    let formData = new FormData();
    if (useWallet) {
      formData.append("payment_method", "wallet");
    } else {
      formData.append("payment_method", "card");
    }
    try {
      const res = await payNow(formData);
      navigate("/payment/success");
      showSuccessToast("Payment Successfull");
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        console.log("handle pay now response-------------", error.message);
        navigate("/payment/failure");
        showErrorToast(error.message);
      }
    }
  };

  const handleClickHereClick = () => {
    doPayNow();
  };
  const handleArrowClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    doPayNow();
  }, []);

  return (
    <div className="sm:w-[819px] w-full sm:h-[594px] h-[587px] flex flex-col items-center bg-white sm:justify-center gap-6 p-[24px]">
      <div className="w-[342px] h-[337px] flex flex-col items-center gap-6 sm:mt-0 mt-4">
        <div className="w-[342px] h-[167px] flex flex-col items-center gap-6 ">
          <div className="flex w-full space-x-16">
            <button onClick={handleArrowClick}>
              <img src="/arrow.svg" alt="Arrow" />
            </button>
            <p className="heading-1 sm:w-[342px]">Verify your card</p>
          </div>
          <img
            src="/preauthorization.svg"
            alt="Success Icon"
            className="mb-4"
          />
        </div>
        <div className="sm:w-[350px] w-[342px] h-[54px] flex flex-col items-center gap-2 ">
          <div className="flex">
            <p className="green-bold-text w-[129px] h-[27px]">Card verified</p>
            <img src="/green-tick.svg" alt="Card Verified Tick" />
          </div>

          <p className="paragraph-lg text-veryDarkGray w-full h-[19px] text-center">
            Redirecting you to complete your payment and order.
          </p>
        </div>
        <div className="w-[207px] h-[66px] flex flex-col items-center gap-3 ">
          <p className="paragraph-lg text-veryDarkGray w-full h-[38px] text-center">
            If you’re not redirected in a few seconds,
            <button
              className="text-btn-blue ml-1"
              onClick={() => handleClickHereClick}
            >
              click here.
            </button>
          </p>
        </div>
        <Loader />
      </div>
    </div>
  );
}

export default CardVerified;
