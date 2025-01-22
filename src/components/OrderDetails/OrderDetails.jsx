import React, { useContext, useState } from "react";
import Order from "./Order";
import { IoCart } from "react-icons/io5";
import NanokardTooltip from "./NanokardTooltip";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";
import PaymentContext from "../../contexts/payment/PaymentContext";
import { showSuccessToast, showErrorToast } from "../../components/Toast";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

function OrderDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const {
    formRef,
    existingUserData,
    handleCancelSession,
    handleloading,
    cardLimitReached,
  } = useContext(AuthContext);
  const { checkoutData, orderData = {} } = useContext(CheckoutContext);
  const { selectedCard, doPayNow, useWallet, loading } =
    useContext(PaymentContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = location.pathname.includes("/signup");
  const [nkConfirmed, setNkConfirmed] = useState(false);
  const [tosConfirmed, setTosConfirmed] = useState(false);
  const userWalletBalance = existingUserData?.user?.user_wallet_balance;
  const orderTotal = orderData?.grand_total_value;

  const initialValues = {
    nk_confirmation: false,
    tos_confirmation: false,
  };

  const validationSchema = Yup.object({
    nk_confirmation: Yup.boolean().oneOf(
      [true],
      "You must authorize NanoKard."
    ),
    tos_confirmation: Yup.boolean().oneOf(
      [true],
      "You must agree to the Terms of Service and Privacy Policy to continue."
    ),
  });

  const handlePayNowClick = () => {
    if (selectedCard == null && !useWallet) {
      showErrorToast("Please Select a Card or Wallet First");
    } else if (
      selectedCard == null &&
      useWallet &&
      userWalletBalance < orderTotal
    ) {
      showErrorToast("Insufficient wallet balance");
    } else {
      doPayNow();
    }
  };

  return (
    <div>
      {/* order details div */}
      <div className="w-full h-auto">
        <div className="flex w-full h-10 items-center">
          <IoCart size={28} color="#767676" />
          <span className="font-semibold text-[16px] leading-[21.79px] ml-3 heading-3-bold">
            {checkoutData ? checkoutData?.locationName : "Location Name"} order
          </span>
        </div>
        <span className="w-full h-6 pb-3 border-t border-solid border-gray-200 flex justify-between"></span>
        <Order />
      </div>
      {/* confirmation instruction div */}
      <div className="w-full h-[202px] gap-4 sm:mt-0 mt-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form className="w-full">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6 mt-2">
                {isSignup ? (
                  <>
                    <div className="col-span-full flex flex-col h-5 justify-center">
                      <div className="flex gap-2">
                        <Field name="nk_confirmation">
                          {({ field }) => (
                            <input
                              type="checkbox"
                              id="nk_confirmation"
                              {...field}
                              checked={values.nk_confirmation}
                              className="custom-checkbox"
                              style={{ width: "30px", height: "16px" }}
                              onChange={(e) => {
                                field.onChange(e);
                                setNkConfirmed(e.target.checked);
                              }}
                            />
                          )}
                        </Field>
                        <label
                          htmlFor="nk_confirmation"
                          className="paragraph-md text-veryDarkGray"
                        >
                          By checking this box, I authorize NanoKard to create
                          an account and make this purchase on my behalf.
                        </label>
                      </div>
                      <ErrorMessage
                        name="nk_confirmation"
                        component="div"
                        className="red-para ml-6 w-fit"
                      />
                    </div>
                    <div className="col-span-full flex flex-col h-5 justify-center mt-8 mb-8">
                      <div className="flex gap-2">
                        <Field name="tos_confirmation">
                          {({ field }) => (
                            <input
                              type="checkbox"
                              id="tos_confirmation"
                              {...field}
                              checked={values.tos_confirmation}
                              className="custom-checkbox"
                              style={{ width: "30px", height: "16px" }}
                              onChange={(e) => {
                                field.onChange(e);
                                setTosConfirmed(e.target.checked);
                              }}
                            />
                          )}
                        </Field>
                        <label
                          htmlFor="tos_confirmation"
                          className="paragraph-md text-veryDarkGray"
                        >
                          By checking this box, I confirm that I have read and
                          agree to the
                          <a
                            href="https://www.nanokard.com/terms-of-service-consumers"
                            className="text-btn-blue ml-1 mr-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: "12px", fontWeight: "600" }}
                          >
                            Terms of Service
                          </a>
                          and
                          <a
                            href="https://www.nanokard.com/privacy-policy"
                            className="text-btn-blue ml-1"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: "12px", fontWeight: "600" }}
                          >
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>
                      <ErrorMessage
                        name="tos_confirmation"
                        component="div"
                        className="red-para ml-6 w-fit"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {existingUserData ? (
                      <div className="col-span-full flex flex-col h-5 justify-center mt-8 mb-8">
                        <div className="flex gap-2">
                          <label
                            htmlFor="pay_now_confirm"
                            className="paragraph-md text-veryDarkGray"
                          >
                            By clicking “Pay now”, I confirm that I have read
                            and agree to the
                            <a
                              href="https://www.nanokard.com/terms-of-service-consumers"
                              className="text-btn-blue ml-1 mr-1"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Terms of Service
                            </a>
                            and
                            <a
                              href="https://www.nanokard.com/privacy-policy"
                              className="text-btn-blue ml-1"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Privacy Policy
                            </a>
                            .
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div className="col-span-full flex flex-col h-5 justify-center mt-8 mb-8">
                        <div className="flex gap-2">
                          <Field name="tos_confirmation">
                            {({ field }) => (
                              <input
                                type="checkbox"
                                id="tos_confirmation"
                                {...field}
                                checked={values.tos_confirmation}
                                className="custom-checkbox"
                                style={{ width: "30px", height: "16px" }}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setTosConfirmed(e.target.checked);
                                }}
                              />
                            )}
                          </Field>
                          <label
                            htmlFor="tos_confirmation"
                            className="paragraph-md text-veryDarkGray"
                          >
                            By checking this box, I confirm that I have read and
                            agree to the
                            <a
                              href="https://www.nanokard.com/terms-of-service-consumers"
                              className="text-btn-blue ml-1 mr-1"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Terms of Service
                            </a>
                            and
                            <a
                              href="https://www.nanokard.com/privacy-policy"
                              className="text-btn-blue ml-1"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Privacy Policy
                            </a>
                            .
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <>
                {isSignup ? (
                  <button
                    className={`btn-lg sm:w-[287px] w-full mt-4 ${
                      values.nk_confirmation && values.tos_confirmation
                        ? "blue-btn-lg"
                        : "gray-btn-lg"
                    }`}
                    type="submit"
                    form={formRef}
                    disabled={
                      !(
                        values.nk_confirmation &&
                        values.tos_confirmation &&
                        !handleloading
                      )
                    }
                  >
                    {handleloading ? (
                      <>
                        <span className="flex justify-center items-center">
                          Paying
                          <img
                            src="/spinner.gif"
                            alt="Spinner"
                            className="spinner-gif w-4 h-4 ml-1"
                            style={{ filter: "brightness(0) invert(1)" }}
                          />
                        </span>
                      </>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                ) : formRef === "add_card_form" ? (
                  <button
                    className={`w-full btn-lg mt-4 ${
                      cardLimitReached ? "gray-btn-lg" : "blue-btn-lg"
                    }`}
                    type="submit"
                    form={formRef}
                    disabled={loading || cardLimitReached}
                  >
                    {loading ? (
                      <>
                        <span className="flex items-center justify-center">
                          Paying
                          <img
                            src="/spinner.gif"
                            alt="Spinner"
                            className="spinner-gif w-4 h-4 ml-1"
                            style={{ filter: "brightness(0) invert(1)" }}
                          />
                        </span>
                      </>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                ) : (
                  <button
                    className={`w-full btn-lg mt-4 ${
                      selectedCard == null && !useWallet
                        ? "gray-btn-lg"
                        : "blue-btn-lg"
                    }`}
                    onClick={handlePayNowClick}
                    disabled={loading || (selectedCard == null && !useWallet)}
                  >
                    {loading ? (
                      <>
                        <span className="flex items-center justify-center">
                          Paying
                          <img
                            src="/spinner.gif"
                            alt="Spinner"
                            className="spinner-gif w-4 h-4 ml-1"
                            style={{ filter: "brightness(0) invert(1)" }}
                          />
                        </span>
                      </>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                )}
              </>
            </Form>
          )}
        </Formik>

        <div
          className="relative w-[176px] h-4 leading-[6px] flex mt-4 ml-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AiOutlineQuestionCircle
            className="text-mediumGray hover:text-veryDarkGray cursor-pointer"
            size={16}
          />
          <p className="paragraph-md text-mediumGray hover:text-veryDarkGray hover:underline ml-2 cursor-pointer">
            How does NanoKard work?
          </p>
          {isHovered && (
            <div className="absolute top-full mt-2 right-[-75px]">
              <NanokardTooltip />
            </div>
          )}
        </div>
      </div>
      {/* cancel and return */}
      <div className={`w-full h-4 ${isSignup ? "mt-12" : "mt-4"}`}>
        {checkoutData ? (
          <p className="active-blue text-center" onClick={handleCancelSession}>
            Cancel and return to {checkoutData?.locationName}
          </p>
        ) : (
          <p className="active-blue text-center">
            Cancel and return to [Default Location]
          </p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
