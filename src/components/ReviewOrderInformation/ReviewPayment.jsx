import React, {useContext, useEffect, useState} from 'react';
import PaymentContext from "../../contexts/payment/PaymentContext";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import NanokardTooltip from "../OrderDetails/NanokardTooltip";
import AuthContext from "../../contexts/auth/AuthContext";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import { showSuccessToast, showErrorToast } from "../Toast";
import { useNavigate, useLocation } from "react-router-dom";
import WelcomeBanner from "../layout/WelcomeBanner";
import customErrorMessage from "../CustomErrorMessage";
import UserDetails from "./UserDetails";
import OrderSummary from "./OrderSummary";
import CardDetails from "./CardDetails"; // Adjust the import path as needed



const ReviewPayment = () => {
    const { formRef, existingUserData,handleApiCalling, mobileData, setIsMobile, setInitialValues, cardBrand, addCard, handleCancelSession } = useContext(AuthContext);
    const { shippingData,checkoutData, orderData = {} } = useContext(CheckoutContext);
    const [tosConfirmed, setTosConfirmed] = useState(false);
    const { selectedCard, doPayNow, reviewSelectedCard, useWallet, loading } = useContext(PaymentContext);
    const [nkConfirmed, setNkConfirmed] = useState(false);
    const location = useLocation();
    const isSignup = location.pathname.includes("/signup");
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const userWalletBalance = existingUserData?.user?.user_wallet_balance;
    let orderTotal = orderData?.grand_total_value;
    let showUsedWalletBalance = userWalletBalance;


    if (useWallet) {
        if (userWalletBalance >= orderTotal) {
            showUsedWalletBalance = orderTotal;
            orderTotal = 0;
        } else {
            orderTotal = orderTotal - userWalletBalance;
        }
    }

    const initialValues = {
        nk_confirmation: false,
        tos_confirmation: false,
    };

    const validationSchema = Yup.object({
        nk_confirmation: Yup.boolean().oneOf([true], "You must authorize NanoKard"),
        tos_confirmation: Yup.boolean().oneOf(
            [true],
            "You must accept TOS and Privacy Policy"
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

    const handleSignUp =()=>{
        handleApiCalling(mobileData)
    }

    const handleNewCard =()=>{
        handleApiCalling(addCard);
    }

    const handlePayment =()=>{
        if (existingUserData && existingUserData?.card?.length > 0) {
            navigate("/payment")
        }else if (existingUserData && existingUserData?.card?.length === 0) {
            setInitialValues(mobileData)
            setIsMobile(false)
            navigate("/signup")
        } else
        {
            setInitialValues(mobileData)
            setIsMobile(false)
        }
    }
    const handleClick = () => {
        switch (formRef) {
            case "sign_up_form":
                handleSignUp();
                break;
            case "add_card_form":
                handleNewCard();
                break;
            default:
                handlePayNowClick();
        }
    };

    const getButtonText = () => {
        switch (formRef) {
            case "sign_up_form":
                return "Pay Now";
            case "add_card_form":
                return "Pay Now";
            default:
                return "Pay Now";
        }
    };

    return (
        <div className="block sm:hidden bg-white">
            {!isSignup ? <WelcomeBanner /> : null}
            <div className="p-6 sm:space-y-8 bg-white sm:w-full h-[901px] sm:h-full flex flex-col">

                <div className="w-[342px]">
                    <button onClick={handlePayment}>
                        <img className="w-[16px] h-[16px]" src="/arrow.svg" alt="Arrow"/>
                    </button>
                    <h2 className="heading-2 mb-4 mt-4">Personal Details</h2>
                    <div className="space-y-2">
                        {existingUserData?.user ? (
                          <UserDetails user={existingUserData.user} />
                        ) : (
                          <UserDetails user={mobileData} />
                        )}
                    </div>
                    <div className=" mt-3 border-t w-full ">
                    </div>
                </div>
                {((useWallet && reviewSelectedCard) || mobileData || addCard || reviewSelectedCard ) && (
                  <div className="w-[342px] mt-4">
                      <h2 className="heading-2 mb-4">Payment information</h2>
                      <div className="space-y-2">
                            <>
                                {reviewSelectedCard ? (
                                  <CardDetails
                                    cardData={{
                                        cardNumber: reviewSelectedCard.last4,
                                        cardHolderName: reviewSelectedCard.card_holder_name,
                                        street: reviewSelectedCard.billing_address?.address_line_1,
                                        secondStreet: reviewSelectedCard.billing_address?.address_line_2,
                                        city: reviewSelectedCard.billing_address?.city,
                                        state: reviewSelectedCard.billing_address?.state,
                                        zip: reviewSelectedCard.billing_address?.zipcode,
                                    }}
                                    cardBrand={reviewSelectedCard.card_brand}
                                  />
                                ) : mobileData ? (
                                  <CardDetails
                                    cardData={{
                                        cardNumber: mobileData.cardNumber,
                                        cardHolderName: `${mobileData.first_name} ${mobileData.last_name}`,
                                        street: mobileData.street,
                                        secondStreet: mobileData.second_street,
                                        city: mobileData.city,
                                        state: mobileData.state,
                                        zip: mobileData.zip,
                                    }}
                                    cardBrand={cardBrand} // Assuming cardBrand is defined
                                  />
                                ) : addCard ? (
                                  <CardDetails
                                    cardData={{
                                        cardNumber: addCard.cardNumber,
                                        cardHolderName: addCard.associatedName,
                                        street: addCard.street,
                                        secondStreet: addCard.second_street,
                                        city: addCard.city,
                                        state: addCard.state,
                                        zip: addCard.zip,
                                    }}
                                    cardBrand={cardBrand} // Assuming cardBrand is defined
                                  />
                                ) : null}
                            </>

                      </div>
                      <div className="mt-3 border-t w-full"></div>
                  </div>
                )}

                <div className="w-[342px] h-[142px] mt-4 border-t border-transparent pr-6">
                    <h2 className="heading-2 mb-4">Order Summary</h2>
                    <div className="gap-4 w-full">
                        {orderData ? (
                          <OrderSummary orderData={orderData} useWallet={useWallet} showUsedWalletBalance={showUsedWalletBalance} orderTotal={orderTotal} />
                        ) : (
                          <p className="paragraph-md text-veryDarkGray text-center">Order details Not Found</p>
                        )}
                    </div>
                </div>

                <div className="w-full h-[202px] gap-4 sm:mt-0 mt-8">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                    >
                        {({values}) => (
                          <Form className="w-full">
                              <div className="grid grid-cols-1 mt-4 gap-4 sm:grid-cols-6">
                                  {isSignup && (
                                    <div className="col-span-full flex flex-col h-5 justify-center">
                                        <div className="flex gap-2 ">
                                            <Field name="nk_confirmation">
                                                {({field}) => (
                                                  <input
                                                    type="checkbox"
                                                    id="nk_confirmation"
                                                    {...field}
                                                    checked={values.nk_confirmation}
                                                    className="size-4 border border-mediumGray rounded-[5px] checked:bg-blue focus:ring-blue"
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
                                                By checking this box, I authorize NanoKard to create an
                                                account and make this purchase on my behalf.
                                            </label>
                                        </div>
                                        <ErrorMessage
                                          name="nk_confirmation"
                                          component={customErrorMessage}
                                          className="red-para ml-6 w-fit"
                                        />
                                    </div>
                                  )}

                                  <div className="col-span-full flex flex-col h-5 justify-center mt-8 mb-8">
                                      <div className="flex gap-2 ">
                                          <Field name="tos_confirmation">
                                              {({field}) => (
                                                <input
                                                  type="checkbox"
                                                  id="tos_confirmation"
                                                  {...field}
                                                  checked={values.tos_confirmation}
                                                  className="size-4 border border-mediumGray rounded-[5px] checked:bg-blue focus:ring-blue"
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
                                              By checking this box, I confirm that I have read and agree
                                              to the
                                              <a
                                                href="https://www.nanokard.com/terms-of-service-consumers"
                                                className="text-btn-blue ml-1 mr-1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                  Terms of Service
                                              </a>
                                              and
                                              <a
                                                href="https://www.nanokard.com/privacy-policy"
                                                className="text-btn-blue ml-1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                  Privacy Policy
                                              </a>
                                              .
                                          </label>
                                      </div>
                                      <ErrorMessage
                                        name="tos_confirmation"
                                        component={customErrorMessage}
                                        className="red-para ml-6 w-fit"
                                      />
                                  </div>
                              </div>

                              <button
                                className={`w-full btn-lg mt-4 ${
                                  !values.tos_confirmation ? "gray-btn-lg" : "blue-btn-lg"
                                }`}
                                form={formRef}
                                disabled={loading || !values.tos_confirmation}
                                onClick={handleClick}
                              >
                                  {loading ? (
                                    <span className="flex items-center justify-center">
                                      Paying
                                      <img
                                        src="/spinner.gif"
                                        alt="Spinner"
                                        className="spinner-gif w-4 h-4 ml-1"
                                        style={{filter: "brightness(0) invert(1)"}}
                                      />
                                    </span>
                                  ) : (
                                    getButtonText()
                                  )}
                              </button>
                          </Form>
                        )}
                    </Formik>

                    <div className="relative h-4 items-center flex mt-4 justify-center">
                        <AiOutlineQuestionCircle
                          className="text-mediumGray hover:text-veryDarkGray cursor-pointer"
                          size={16}
                        />
                        <p
                          className="paragraph-md text-mediumGray hover:text-veryDarkGray hover:underline ml-2 cursor-pointer"
                          onClick={() => setIsHovered(!isHovered)}
                        >
                            How does NanoKard work?
                        </p>
                        {isHovered && (
                          <div className="absolute top-full mt-2">
                              <NanokardTooltip/>
                          </div>
                        )}
                    </div>

                    <div className="flex w-full h-4 mt-8 justify-center">
                        {checkoutData ? (
                          <p className="active-blue" onClick={handleCancelSession}>
                              Cancel and return to {checkoutData?.locationName}
                          </p>
                        ) : (
                          <p className="active-blue">Cancel and return to [Default Location]</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewPayment;
