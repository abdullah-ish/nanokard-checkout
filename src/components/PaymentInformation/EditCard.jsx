import React, { useState, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-international-phone/style.css";
import { getCode, getNames } from "country-list";
import AuthContext from "../../contexts/auth/AuthContext";
import { showSuccessToast, showErrorToast } from "../Toast";
import { useNavigate } from "react-router-dom";
import BillingAddressFields from "../forms/BillingAddressFields";
import CustomErrorMessage from "../CustomErrorMessage";

function EditCard({ card, onCancel }) {
  const { editCard, setExistingUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    cardNumber: `•••• •••• •••• ${card?.last4}`,
    associatedName: card?.card_holder_name,
    expiration: `${card?.expiry_month}/${card?.expiry_year}`,
    cvv: "•••",
    country: card?.billing_address?.country
      ? {
          label: card?.billing_address?.country,
          value: getCode(card?.billing_address?.country),
        }
      : null,
    street: card?.billing_address?.address_line_1,
    second_street: card?.billing_address?.address_line_2,
    city: card?.billing_address?.city,
    state: card?.billing_address?.state,
    zip: card?.billing_address?.zipcode,
  };

  const validationSchema = Yup.object({
    cardNumber: Yup.string().required("Card number is invalid"),
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

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      formData.append("card_id", card?.card_id);
      formData.append("card_holder_name", values.associatedName);
      formData.append("address_line_1", values.street);
      formData.append("address_line_2", values.second_street);
      formData.append("country", values.country.value);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("zipcode", values.zip);
      formData.append("exp_date", values.expiration);

      const res = await editCard(formData);
      console.log("updated card data:", res?.data?.card);
      const updatedCard = res.data.card;

      setExistingUserData((prevState) => {
        const updatedCards = prevState.card.map((card) =>
          card.card_id === updatedCard?.card_id ? updatedCard : card
        );

        return {
          ...prevState,
          card: updatedCards,
        };
      });
      showSuccessToast("Card Updated Successfully");
      onCancel();
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        console.log("handle pay now response-------------", error.message);
        showErrorToast(error.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sm:w-[420px] w-[342px] sm:h-[645px] h-[761px] flex flex-col gap-8">
      <div className="w-full flex flex-col gap-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            handleChange,
            isSubmitting,
          }) => (
            <Form className="w-full">
              <div className="grid grid-cols-1 gap-4 grid-cols-6">
                <button onClick={onCancel}>
                  <img
                    className="w-[16px] h-[16px]"
                    src="/arrow.svg"
                    alt="Arrow"
                  />
                </button>
                <div className="col-span-full relative">
                  {!!values.cardNumber && (
                    <label
                      htmlFor="cardNumber"
                      className={`z-10 text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
                        errors.cardNumber && touched.cardNumber
                          ? "red-para"
                          : ""
                      }`}
                    >
                      Card number
                    </label>
                  )}
                  <div className="mt-2 relative">
                    <img
                      src={
                        card?.card_brand === "Mastercard"
                          ? "/mastercard.svg"
                          : card?.card_brand === "Discover"
                          ? "/discover-card.svg"
                          : card?.card_brand === "American Express"
                          ? "/amex-card.svg"
                          : "/visa-card.svg"
                      }
                      alt={
                        card?.card_brand === "Mastercard"
                          ? "Master Card Icon"
                          : card?.card_brand === "Discover"
                          ? "Discover Card Icon"
                          : card?.card_brand === "American Express"
                          ? "Amex Card Icon"
                          : "Visa Card Icon"
                      }
                      className="absolute left-3 top-1/2 transform -translate-y-1/2"
                      width="25"
                      height="25"
                    />

                    <Field
                      type="text"
                      name="cardNumber"
                      id="cardNumber"
                      className={`w-full h-[43px] p-[12px] pl-12 rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
                        errors.cardNumber && touched.cardNumber
                          ? "border-red focus:border-red"
                          : ""
                      }`}
                      autoComplete="off"
                      placeholder="Card number"
                      disabled
                    />
                    <ErrorMessage
                      name="cardNumber"
                      component={CustomErrorMessage}
                      className="red-para"
                    />
                  </div>
                </div>
                <div className="col-span-full relative">
                  {!!values.associatedName && (
                    <label
                      htmlFor="associatedName"
                      className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
                        errors.associatedName && touched.associatedName
                          ? "red-para"
                          : ""
                      }`}
                    >
                      Name on card
                    </label>
                  )}
                  <div className="mt-2">
                    <Field
                      type="text"
                      name="associatedName"
                      id="associatedName"
                      className={`w-full h-[43px] p-[12px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
                        errors.associatedName && touched.associatedName
                          ? "border-red focus:border-red"
                          : ""
                      }`}
                      autoComplete="off"
                      placeholder="Name on card"
                    />
                    <ErrorMessage
                      name="associatedName"
                      component={CustomErrorMessage}
                      className="red-para"
                    />
                  </div>
                </div>
                <div className="col-span-3 relative">
                  {!!values.expiration && (
                    <label
                      htmlFor="expiration"
                      className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
                        errors.expiration && touched.expiration
                          ? "red-para"
                          : ""
                      }`}
                    >
                      Expiration (MM/YY)
                    </label>
                  )}
                  <div className="mt-2">
                    <Field
                      type="text"
                      name="expiration"
                      id="expiration"
                      className={`w-full h-[43px] p-[12px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
                        errors.expiration && touched.expiration
                          ? "border-red focus:border-red"
                          : ""
                      }`}
                      autoComplete="off"
                      placeholder="Expiration (MM/YY)"
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value.length === 3 && value[2] === "/") {
                          value = value.slice(0, 2); // Remove the slash if user backspaces or deletes it
                        }
                        value = value.replace(/[^\d\/]/g, "");
                        if (value.length > 2 && value[2] !== "/") {
                          value = `${value.slice(0, 2)}/${value.slice(2, 4)}`; // Add slash after MM
                        }
                        if (value.length > 5) {
                          value = value.slice(0, 5); // Keep only MM/YY format
                        }
                        e.target.value = value;
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage
                      name="expiration"
                      component={CustomErrorMessage}
                      className="red-para"
                    />
                  </div>
                </div>
                <div className="col-span-3 relative">
                  {!!values.cvv && (
                    <label
                      htmlFor="cvv"
                      className={`z-10 text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
                        errors.cvv && touched.cvv ? "red-para" : ""
                      }`}
                    >
                      CVV
                    </label>
                  )}
                  <div className="mt-2 relative">
                    <Field
                      type="password"
                      name="cvv"
                      id="cvv"
                      className={`w-full h-[43px] p-[12px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
                        errors.cvv && touched.cvv
                          ? "border-red focus:border-red"
                          : ""
                      }`}
                      autoComplete="off"
                      placeholder="CVV"
                      disabled
                    />
                    <ErrorMessage
                      name="cvv"
                      component={CustomErrorMessage}
                      className="red-para"
                    />
                  </div>
                </div>
              </div>
              <div></div>
              <h2 className="heading-2 mt-4">Billing address</h2>
              <BillingAddressFields
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
              />
              <div className="w-full h-[36px] flex justify-between mt-16 mb-8">
                <button type="button" className="cancel-btn" onClick={onCancel}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="blue-btn-md"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EditCard;
