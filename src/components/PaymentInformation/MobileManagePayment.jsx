import React, { useState, useContext, useEffect } from "react";
import PaymentInfoHeader from "./PaymentInfoHeader";
import EditCard from "./EditCard";
import ShippingInfo from "../forms/ShippingInfo";
import PaymentContext from "../../contexts/payment/PaymentContext";
import AuthContext from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";
import { Formik, Form } from "formik";
import {
  cardInfoValidationSchema,
  deliveryAddress,
} from "../../utils/constants";
import PaymentDetailsFields from "../forms/PaymentDetailsFields";
import BillingAddressFields from "../forms/BillingAddressFields";
import { MdCancel } from "react-icons/md";

function MobileManagePayment() {
  const navigate = useNavigate();
  const { checkoutData } = useContext(CheckoutContext);
  const [isExpired, setIsExpired] = useState(null);
  const [showIcon, setShowIcon] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [showBillingAddress, setShowBillingAddress] = useState(true);
  const {
    existingUserData,
    setFormRef,
    handleCancelSession,
    addCard,
    handleApiCalling,
    setAddCard,
    setInitialValues,
    initialValues,
    setBillingShippingSame,
  } = useContext(AuthContext);

  const {
    selectedCard,
    setSelectedCard,
    useWallet,
    setUseWallet,
    setReviewSelectedCard,
    isAddingCard,
    setIsAddingCard,
  } = useContext(PaymentContext);

  const [isEditingCard, setIsEditingCard] = useState(false);
  const [selectedCardObject, setSelectedCardObject] = useState(null);
  const [addCardSelected, setAddCardSelected] = useState(false);
  const userWalletBalance = existingUserData?.user?.user_wallet_balance;

  useEffect(() => {
    if (selectedCard) {
      const cardExpired = existingUserData.card?.some(
        (card) => card.card_id === selectedCard && card.is_expired
      );
      setIsExpired(cardExpired);
    }
  }, [selectedCard]);

  const handleCardClick = (card) => {
    if (!card?.is_expired) {
      setSelectedCard(card?.card_id);
      setReviewSelectedCard(card);
    }
    setIsAddingCard(false);
    setAddCardSelected(false);
    setFormRef(null);
    setSelectedCardObject(card);
  };

  const handleAddCardClick = () => {
    setIsAddingCard(true);
    setAddCardSelected(true);
    setSelectedCard(null);
    setReviewSelectedCard(null);
    setFormRef("add_card_form");
  };

  const handleEditCardClick = () => {
    setIsEditingCard(true);
  };

  const handleCancelEditCard = () => {
    setIsEditingCard(false);
  };

  const handleCheckboxChange = () => {
    setUseWallet(!useWallet);
  };

  const handleReviewPayment = () => {
    console.log("addCard", addCard);
    navigate("/review");
  };

  const handleSubmit = async (values) => {
    if (window.innerWidth <= 768) {
      setAddCard(values);
      setInitialValues(values);
      navigate("/review");
    } else {
      handleApiCalling(values);
    }
  };

  useEffect(() => {
    // setFormRef("add_card_form");

    if (checkoutData) {
      setInitialized(true);
      if (checkoutData?.deliveryAddress != null) {
        setShowBillingAddress(false);
      }
    }

    if (existingUserData) {
      setInitialValues({
        ...initialValues,
        associatedName: `${existingUserData?.user?.first_name || ""} ${
          existingUserData?.user?.last_name || ""
        }`.trim(),
      });
    }
  }, [checkoutData, existingUserData]);

  return (
    <>
      <div className="sm:p-0 p-6 sm:w-[420px] bg-white w-full h-auto gap-8 flex flex-col items-center">
        {isEditingCard ? (
          <EditCard card={selectedCardObject} onCancel={handleCancelEditCard} />
        ) : (
          <>
            <div className="w-full h-auto gap-4 flex flex-col min-h-[338px] sm:min-h-[0px] ">
              <PaymentInfoHeader />
              {existingUserData?.card?.map((card) => (
                <div
                  key={card?.card_id}
                  onClick={() => handleCardClick(card)}
                  className={`w-full h-[49px] flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                    selectedCard === card?.card_id
                      ? "bg-[#E6F5FD] border-[1px]"
                      : "bg-white"
                  }`}
                >
                  <div className="w-full h-[26px] flex gap-4 items-center">
                    <input
                      type="radio"
                      checked={selectedCard === card?.card_id}
                      onChange={() => handleCardClick(card)}
                      className="cursor-pointer"
                    />
                    {card?.card_brand === "Visa" ? (
                      card?.is_expired ? (
                        <img src="/disb-visa-card.svg" alt="Visa Card Icon" />
                      ) : (
                        <img src="/visa-card.svg" alt="Visa Card Icon" />
                      )
                    ) : card?.card_brand === "Mastercard" ? (
                      card?.is_expired ? (
                        <img
                          src="/disb-mastercard-card.svg"
                          alt="Master card Icon"
                        />
                      ) : (
                        <img src="/mastercard.svg" alt="Master Card Icon" />
                      )
                    ) : card?.card_brand === "Discover" ? (
                      card?.is_expired ? (
                        <img
                          src="/disb-discover-card.svg"
                          alt="Discover Card Icon"
                        />
                      ) : (
                        <img
                          src="/discover-card.svg"
                          alt="Discover Card Icon"
                        />
                      )
                    ) : card?.card_brand === "American Express" ? (
                      card?.is_expired ? (
                        <img src="/disb-amex-card.svg" alt="Amex Card Icon" />
                      ) : (
                        <img src="/amex-card.svg" alt="Amex Card Icon" />
                      )
                    ) : (
                      <img src="/visa-card.svg" alt="Visa Card Icon" />
                    )}
                    <div>
                      <div className="flex">
                        <p className="paragraph-lg text-veryDarkGray">
                          {card?.card_brand}
                        </p>
                        <p className="paragraph-lg text-veryDarkGray">
                          &nbsp;**** {card?.last4}
                        </p>
                      </div>
                      {card?.is_expired && (
                        <div className="flex">
                          <MdCancel style={{ color: "#E32B25" }} />
                          <p className="text-[10px] text-[#E32B25] ml-1">
                            Card expired. Edit or add a new card.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className="text-btn-blue"
                    onClick={handleEditCardClick}
                  >
                    Edit
                  </button>
                </div>
              ))}
              <div className="flex items-center ml-2">
                <input
                  type="radio"
                  id="addCard"
                  checked={isAddingCard}
                  onChange={handleAddCardClick}
                  className="mr-2 cursor-pointer"
                />
                <label
                  onClick={handleAddCardClick}
                  className="paragraph-lg text-veryDarkGray cursor-pointer"
                >
                  Pay with new card
                </label>
              </div>
              {isAddingCard && (
                <Formik
                  initialValues={initialValues}
                  validationSchema={cardInfoValidationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize={initialized}
                >
                  {({
                    setFieldValue,
                    values,
                    errors,
                    touched,
                    setFieldTouched,
                  }) => (
                    <Form className="w-full space-y-8" id="add_card_form">
                      {/* ---------------------------------------------- Payment information form ---------------------------------------------- */}
                      <div className="w-full flex flex-col gap-8 z-10 border pl-8 pr-4 pb-4 pt-4 border-blue rounded-lg">
                        <div className="w-full flex flex-col gap-4">
                          <PaymentDetailsFields
                            values={values}
                            errors={errors}
                            touched={touched}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {/* ---------------------------------------------- Billing address form ---------------------------------------------- */}
                        <div className="w-full flex flex-col gap-4 ">
                          {/* Billing address form Header */}
                          <div className="w-full space-y-4">
                            <h2 className="heading-2">Billing address</h2>
                            {checkoutData && checkoutData?.deliveryAddress && (
                              <>
                                <span className="paragraph-lg text-veryDarkGray">
                                  Billing and shipping address are the same?
                                </span>
                                <div className="flex gap-4">
                                  <button
                                    className="blue-out-btn-md"
                                    type="button"
                                    onClick={() => {
                                      setShowBillingAddress(false);
                                      setBillingShippingSame(true);
                                      setShowIcon(true);
                                      setInitialized(true);
                                      setInitialValues({
                                        ...values,
                                        ...checkoutData?.deliveryAddress,
                                        country: {
                                          label:
                                            checkoutData?.deliveryAddress
                                              ?.country,
                                          value:
                                            checkoutData?.deliveryAddress
                                              ?.country,
                                        },
                                      });
                                      setTimeout(() => {
                                        setInitialized(false);
                                      }, 500);
                                    }}
                                  >
                                    Yes
                                  </button>
                                  <button
                                    className="blue-out-btn-md"
                                    type="button"
                                    onClick={() => {
                                      setShowBillingAddress(true);
                                      setBillingShippingSame(false);
                                      setShowIcon(false);
                                      setInitialized(true);
                                      setInitialValues({
                                        ...initialValues,
                                        ...deliveryAddress,
                                      });
                                      setTimeout(() => {
                                        setInitialized(false);
                                      }, 500);
                                    }}
                                  >
                                    No
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                          {/* Conditionally render Billing address Form Body */}
                          {showBillingAddress && (
                            <BillingAddressFields
                              values={values}
                              errors={errors}
                              touched={touched}
                              setFieldValue={setFieldValue}
                              setFieldTouched={setFieldTouched}
                            />
                          )}
                        </div>
                      </div>
                      {userWalletBalance > 0 && (
                        <span className="flex w-full">
                          <input
                            id="default-checkbox"
                            type="checkbox"
                            checked={useWallet}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <p className="paragraph-lg text-veryDarkGray">
                            Use your ${userWalletBalance?.toFixed(2)} NanoKard
                            balance
                          </p>
                        </span>
                      )}
                      <div className="w-full h-[104px] gap-6 flex flex-col">
                        {checkoutData && checkoutData?.deliveryAddress && (
                          <ShippingInfo showIcon={showIcon} />
                        )}
                      </div>
                      <button className="sm:hidden w-full blue-btn-lg">
                        Review
                      </button>
                    </Form>
                  )}
                </Formik>
              )}
            </div>

            {/* Shipping address details */}
            {!isAddingCard && userWalletBalance > 0 && (
              <span className="flex w-full">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={useWallet}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="paragraph-lg text-veryDarkGray">
                  Use your ${userWalletBalance?.toFixed(2)} NanoKard balance
                </p>
              </span>
            )}

            {!isAddingCard && (
              <button
                className={`sm:hidden btn-lg sm:w-[287px] w-full ${
                  (selectedCard && !isExpired) || useWallet
                    ? "blue-btn-lg"
                    : "gray-btn-lg"
                }`}
                onClick={handleReviewPayment}
                disabled={!((selectedCard && !isExpired) || useWallet)}
              >
                Review
              </button>
            )}
            <div className="sm:hidden block flex justify-center">
              {checkoutData ? (
                <p className="active-blue" onClick={handleCancelSession}>
                  Cancel and return to {checkoutData?.locationName}
                </p>
              ) : (
                <p className="active-blue">
                  Cancel and return to [Default Location]
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MobileManagePayment;
