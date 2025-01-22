import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import { showSuccessToast, showErrorToast } from "../Toast";
import { IoLogoUsd } from "react-icons/io5";
import { RxDividerVertical } from "react-icons/rx";
import CustomErrorMessage from "../CustomErrorMessage";

function VerifyCard() {
  const { preAuthVerification, cardVerification, setCardVerification } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const initialValues = {
    amount: "",
  };
  const validationSchema = Yup.object({
    amount: Yup.string().required("Add your amount"),
  });

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const res = await preAuthVerification({ amount: values.amount });
      navigate("/payment/verified");
      showSuccessToast("Pre-auth Verified");
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        setCardVerification(false);
        showErrorToast(error.message);
        console.log("pre auth verification error", error.message);
        console.log("card_blocked", error.card_blocked);
        if (error?.card_blocked) {
          navigate("/payment/verification-failed");
        } else {
          setFieldError("amount", error.message);
        }
      }
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleArrowClick = () => {
    navigate(-1);
  };
  return (
    <div className="sm:w-[819px] w-full sm:h-[594px] flex flex-col items-center bg-white justify-center gap-6 p-[24px]">
      <div className="mb-32">
        <div className="w-[342px] h-[337px] flex flex-col items-center gap-6 ">
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
          <div className="w-[342px] h-[146px] flex flex-col items-center gap-4 ">
            <p className="paragraph-lg text-veryDarkGray w-full h-[38px]">
              To protect you from fraud, follow these steps to verify your card:
            </p>
            <p className="paragraph-lg text-veryDarkGray w-full h-[57px]">
              <span className="block">
                1. Check your card statement for a temporary charge from
                <b> NanoKard.</b>
              </span>
              <span className="block">
                2. Enter the exact amount of the charge.
              </span>
            </p>
            <p className="paragraph-lg text-mediumGray w-full h-[19px]">
              Note: This charge will be removed.
            </p>
          </div>
        </div>
        <div className="w-[342px] sm:h-[70px] flex flex-col sm:gap-2">
          <p className="paragraph-lg w-[55px] h-[19px] text-veryDarkGray">
            <b>Amount</b>
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched }) => (
              <Form className="w-full space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                  <div className="sm:col-span-3 relative">
                    <div className="mt-2 relative">
                      <span>
                        <IoLogoUsd
                          className="absolute inset-y-3.5  inset-x-2 text-blue flex items-center"
                          size={17}
                        />
                        <RxDividerVertical
                          className="absolute inset-y-2.5  inset-x-4 text-spanishGray flex items-center font-normal"
                          size={25}
                        />
                      </span>
                      <Field
                        type="text"
                        name="amount"
                        id="amount"
                        autoComplete="off"
                        className={`w-[342px] h-[45px] sm:h-[43px] pl-8 rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
                          errors.amount && touched.amount
                            ? "border-red focus:border-red"
                            : ""
                        }`}
                        placeholder="0.00"
                      />
                      <ErrorMessage
                        name="amount"
                        component={CustomErrorMessage}
                        className="red-para w-[300px]"
                      />
                    </div>
                  </div>
                </div>
                {cardVerification ? (
                  <div className="flex items-center justify-center">
                    <p className="heading-3-normal">Verifying</p>
                    <img
                      src="/spinner.gif"
                      alt="Spinner"
                      className="spinner-gif -ml-2"
                    />
                  </div>
                ) : (
                  <button
                    className={`sm:w-full w-[287px] xl-btn bg-lighterGray text-spanishGray ${
                      !values.amount ? "bg-lighterGray" : "blue-btn-lg"
                    }`}
                    type="submit"
                    disabled={!values.amount}
                  >
                    Verify
                  </button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default VerifyCard;
