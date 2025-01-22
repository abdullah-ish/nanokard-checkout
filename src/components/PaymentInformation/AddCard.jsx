import React, { useState, useContext, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PaymentDetailsFields from "../forms/PaymentDetailsFields";
import BillingAddressFields from "../forms/BillingAddressFields";
import { deliveryAddress } from "../../utils/constants";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";
import AuthContext from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";

function AddCard() {
  const { checkoutData } = useContext(CheckoutContext);
  const {
    existingUserData,
    handleApiCalling,
    setFormRef,
    initialValues,
    setInitialValues,
    setAddCard,
    setBillingShippingSame,
  } = useContext(AuthContext);
  const [initialized, setInitialized] = useState(false);
  const navigate = useNavigate();

  const [showBillingAddress, setShowBillingAddress] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [height, setHeight] = useState(692);

  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .required("Card number is required")
      .test(
        "cardNumberLength",
        "Card number must be at least 8 digits and at most 16 digits",
        (value) => {
          const strippedValue = value ? value.replace(/\s+/g, "") : ""; // Remove spaces
          return strippedValue.length >= 8 && strippedValue.length <= 16; // Ensure between 9 and 16 digits
        }
      )
      .test("cardNumberFormat", "Card number must be an integer", (value) => {
        const strippedValue = value ? value.replace(/\s+/g, "") : ""; // Remove spaces
        return /^\d+$/.test(strippedValue); // Ensure only digits
      }),
    associatedName: Yup.string()
      .required("Add the name associated with the card")
      .max(30, "Associated name must be at most 30 characters"),
    expiration: Yup.string()
      .required("Expiration date is invalid")
      .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration format (MM/YY)")
      .test(
        "future-date",
        "Expiration must be in the future",
        function (value) {
          if (!value) return false;
          const [month, year] = value.split("/").map(Number);
          const now = new Date();
          const expiryDate = new Date(`20${year}-${month}-01`);
          return expiryDate > now;
        }
      ),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d+$/, "CVV must be a number")
      .min(3, "CVV must be at least 3 digits")
      .max(4, "CVV can be at most 4 digits"),
    country: Yup.object().required("Please select a country"),
    street: Yup.string().required("Add the house number and street name"),
    city: Yup.string().required("Add the city"),
    state: Yup.string()
      .required("Add the state")
      .matches(/^[A-Za-z]{2}$/, "State must be exactly 2 letters"),
    zip: Yup.string()
      .max(10, "zip can be at most 9 digits")
      .required("Add the ZIP/postal code")
      .test("valid-zip", "Zip code must be of 5 or 9 digits", (value) => {
        if (!value) return false;

        // Allow exactly 5 digits
        if (/^\d{5}$/.test(value)) {
          return true;
        }

        // Allow exactly 10 characters in the format 12345-6789
        if (/^\d{5}-\d{4}$/.test(value)) {
          return true;
        }

        // If the length is more than 5 characters and does not match the format, it's invalid
        if (value.length > 5 && !/^\d{5}-\d{4}$/.test(value)) {
          return false;
        }

        return false;
      }),
  });

  const handleSubmit = async (values) => {
    if (window.innerWidth <= 768) {
      setAddCard(values);
      navigate("/review");
    } else {
      handleApiCalling(values);
    }
  };

  useEffect(() => {
    setFormRef("add_card_form");

    if (checkoutData) {
      setInitialized(true);
      if (checkoutData?.deliveryAddress != null) {
        setShowBillingAddress(false);
        setHeight(407);
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
    <div
      className={`sm:w-[420px] w-[342px] flex flex-col gap-8 z-10 border pl-8 pr-4 pb-4 pt-4 border-blue rounded-lg`}
      style={{ height: `${height}px` }}
    >
      <div className="w-full h-[526px] flex flex-col gap-6 ">
        <div className="w-full h-[244px] flex flex-col gap-4">
          <div className="w-full h-[212px] flex flex-col gap-4">
            <div className="w-full h-[169px] flex flex-col gap-4">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
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
                    <div className="sm:w-full flex flex-col gap-4 w-[290px]">
                      <PaymentDetailsFields
                        values={values}
                        errors={errors}
                        touched={touched}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                    {/* ---------------------------------------------- Billing address form ---------------------------------------------- */}
                    <div className="sm:w-full flex flex-col gap-4  w-[290px]">
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
                                  setHeight(407);
                                  setInitialValues({
                                    ...values,
                                    ...checkoutData?.deliveryAddress,
                                    country: {
                                      label:
                                        checkoutData?.deliveryAddress?.country,
                                      value:
                                        checkoutData?.deliveryAddress?.country,
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
                                  setHeight(780);
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
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
