import React, { useEffect, useContext, useState } from "react";
import Header from "./Header";
import { Formik, Form } from "formik";
import PaymentInfoHeader from "../PaymentInformation/PaymentInfoHeader";
import PersonalDetailsFields from "../forms/PersonalDetailsFields";
import PaymentDetailsFields from "../forms/PaymentDetailsFields";
import BillingAddressFields from "../forms/BillingAddressFields";
import ShippingInfo from "../forms/ShippingInfo";
import ReviewPayment from "../ReviewOrderInformation/ReviewPayment";
import {
  shopperData,
  deliveryAddress,
  signupValidationSchema,
  card,
} from "../../utils/constants";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";
import AuthContext from "../../contexts/auth/AuthContext";

const SignUpForm = () => {
  const { checkoutData } = useContext(CheckoutContext);
  const {
    formRef,
    setFormRef,
    setMobileData,
    handleApiCalling,
    isMobile,
    setIsMobile,
    initialValues,
    setInitialValues,
    handleCancelSession,
    existingUserData,
    setBillingShippingSame,
  } = useContext(AuthContext);
  const [initialized, setInitialized] = useState(false);

  const [showBillingAddress, setShowBillingAddress] = useState(true);
  const [showIcon, setShowIcon] = useState(false);

  useEffect(() => {
    setFormRef("sign_up_form");

    if (checkoutData) {
      setInitialized(true);

      setInitialValues({
        ...initialValues,
        ...checkoutData?.shopperData,
        associatedName: `${checkoutData?.shopperData?.first_name || ""} ${
          checkoutData?.shopperData?.last_name || ""
        }`.trim(),
        confirmation:
          existingUserData !== null ? true : initialValues.confirmation,
      });

      if (checkoutData?.deliveryAddress != null) {
        setShowBillingAddress(false);
      }

      setTimeout(() => {
        setInitialized(false);
      }, 500);
    }
  }, [checkoutData]);

  const handleSubmit = async (values) => {
    setMobileData(values);
    displayWindowSize(values);
  };

  const displayWindowSize = (values) => {
    if (window.innerWidth <= 768 && !isMobile) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      handleApiCalling(values);
    }
  };

  useEffect(() => {
    return () => {
      setFormRef(null);
    };
  }, []);

  return (
    <>
      {existingUserData === null && <Header />}
      {isMobile ? (
        <ReviewPayment />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={initialized}
        >
          {({
            setFieldValue,
            values,
            errors,
            touched,
            setFieldTouched,
            isValid,
            dirty,
          }) => (
            <Form className="w-full space-y-8 sm:p-0 p-6" id="sign_up_form">
              {/* ---------------------------------------------- Personal details Form ---------------------------------------------- */}
              {existingUserData === null && (
                <div className="w-full flex flex-col gap-4">
                  {/* Personal Details Form Header */}
                  <div className="w-full ">
                    <h2 className="heading-2">Personal details</h2>
                    <span className="paragraph-lg text-veryDarkGray">
                      Confirm your personal details for your account.
                    </span>
                  </div>
                  <PersonalDetailsFields
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldValue={setFieldValue}
                  />
                </div>
              )}
              {/* ---------------------------------------------- Payment information form ---------------------------------------------- */}
              <div className="w-full flex flex-col gap-4">
                <PaymentInfoHeader />
                <PaymentDetailsFields
                  values={values}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              </div>
              {/* ---------------------------------------------- Billing address form ---------------------------------------------- */}
              <div className="w-full flex flex-col gap-4">
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
                                label: checkoutData?.deliveryAddress?.country,
                                value: checkoutData?.deliveryAddress?.country,
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
              {/* ---------------------------------------------- Shipping Info Section ---------------------------------------------- */}
              {checkoutData && checkoutData?.deliveryAddress && (
                <ShippingInfo showIcon={showIcon} />
              )}
              <button className="sm:hidden blue-btn-lg sm:w-[287px] w-full">
                Review
              </button>
              {/* cancel and return */}
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
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default SignUpForm;
