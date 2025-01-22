import React, { useState, useEffect, useContext } from "react";
import { Field, ErrorMessage } from "formik";
import { IoCard } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TbArrowBigDownFilled } from "react-icons/tb";
import AuthContext from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import CustomErrorMessage from "../CustomErrorMessage";

const PaymentDetailsFields = ({ values, errors, touched, setFieldValue }) => {
  const { getCardBrand, setCardBrand, existingUserData, setCardLimitReached } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const [cardIcon, setCardIcon] = useState(
    <IoCard
      className="absolute inset-y-2 inset-x-2 text-spanishGray"
      size={24}
    />
  );
  const [cardLimitAlert, setCardLimitAlert] = useState("");

  const credit_card_count = existingUserData?.credit_count;
  const debit_card_count = existingUserData?.debit_count;

  const handleExpirationChange = (e) => {
    let value = e.target.value;

    // Handle deletion of the slash
    if (value.length === 3 && value[2] === "/") {
      value = value.slice(0, 2); // Remove the slash if user backspaces or deletes it
    }

    // Remove non-numeric characters except for the slash
    value = value.replace(/[^\d\/]/g, "");

    // Automatically add the slash after the second digit (month)
    if (value.length > 2 && value[2] !== "/") {
      value = value.slice(0, 2) + "/" + value.slice(2, 4); // Ensure the slash is added correctly after MM
    }

    // Limit input to MM/YY format
    if (value.length > 5) {
      value = value.slice(0, 5); // Ensure the value remains in MM/YY format
    }

    // Update the value in Formik state
    setFieldValue("expiration", value);
  };

  useEffect(() => {
    if (values.cardNumber) {
      const cardFirst6 = values.cardNumber.replace(/\s/g, "").substring(0, 6);
      getCardBrandAndType({ card_first6: cardFirst6 });
    }
  }, [values.cardNumber]);

  const getCardBrandAndType = async (params) => {
    try {
      const res = await getCardBrand(params);
      setCardBrand(res?.brand);

      if (res?.card_type === "credit" && credit_card_count >= 4) {
        console.log("Credit card limit reached (4/4)");
        setCardLimitAlert("Credit card limit reached (4/4)");
        setCardLimitReached(true);
      } else if (res?.card_type === "debit" && debit_card_count >= 4) {
        console.log("Debit card limit reached (4/4)");
        setCardLimitAlert("Debit card limit reached (4/4)");
        setCardLimitReached(true);
      } else {
        setCardLimitAlert("");
        setCardLimitReached(false);
      }

      if (res?.brand === "Visa") {
        setCardIcon(
          <img
            src="/visa-card.svg"
            alt="Visa Card Icon"
            className="absolute ml-2 mt-3"
            width="28"
            height="28"
          />
        );
      } else if (res?.brand === "Mastercard") {
        setCardIcon(
          <img
            src="/mastercard.svg"
            alt="Mastercard Icon"
            className="absolute ml-2 mt-3"
            width="28"
            height="28"
          />
        );
      } else if (res?.brand === "Discover") {
        setCardIcon(
          <img
            src="/discover-card.svg"
            alt="Discover Card Icon"
            className="absolute ml-2 mt-3"
            width="28"
            height="28"
          />
        );
      } else if (res?.brand === "American Express") {
        setCardIcon(
          <img
            src="/amex-card.svg"
            alt="American Express Icon"
            className="absolute ml-2 mt-3"
            width="28"
            height="28"
          />
        );
      } else {
        setCardIcon(
          <IoCard
            className="absolute inset-y-2 inset-x-2 text-spanishGray"
            size={24}
          />
        );
      }
    } catch (error) {
      if (error.status === 401) {
        console.log("Session has expired", error.status);
        navigate("/session-expired");
      } else {
        console.log("API error:", error.message);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 grid-cols-6">
      <div className="col-span-full relative">
        {!!values.cardNumber && (
          <label
            htmlFor="cardNumber"
            className={`z-10 text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.cardNumber && touched.cardNumber ? "red-para" : ""
            }`}
          >
            Card number
          </label>
        )}
        <div className="mt-2 relative">
          {cardIcon}
          <Field
            type="text"
            name="cardNumber"
            id="cardNumber"
            className={`w-full h-[43px] p-[12px] pl-10 rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal placeholder: ${
              errors.cardNumber && touched.cardNumber
                ? "border-red focus:border-red"
                : ""
            }`}
            autoComplete="off"
            placeholder="Card number"
            onInput={(e) => {
              let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
              value = value.match(/.{1,4}/g)?.join(" ") || ""; // Add space after every 4 digits
              e.target.value = value;
            }}
            maxLength={19}
          />
          <ErrorMessage
            name="cardNumber"
            component={CustomErrorMessage}
            className="red-para"
          />
        </div>
      </div>
      {cardLimitAlert !== "" && (
        <div className="flex w-[200px] mt-[-10px] mb-[-4px]">
          <MdCancel style={{ color: "#E32B25" }} />
          <p className="text-[10px] text-[#E32B25] ml-1">{cardLimitAlert}</p>
        </div>
      )}

      <div className="col-span-full relative">
        {!!values.associatedName && (
          <label
            htmlFor="associatedName"
            className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.associatedName && touched.associatedName ? "red-para" : ""
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
              errors.expiration && touched.expiration ? "red-para" : ""
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
            value={values.expiration}
            onChange={handleExpirationChange}
            className={`w-full h-[43px] p-[12px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
              errors.expiration && touched.expiration
                ? "border-red focus:border-red"
                : ""
            }`}
            autoComplete="off"
            placeholder="Expiration (MM/YY)"
            maxLength="5" // Limiting length to MM/YY
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
            type="text"
            name="cvv"
            id="cvv"
            autoComplete="off"
            className={`w-full h-[43px] p-[12px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
              errors.cvv && touched.cvv ? "border-red focus:border-red" : ""
            }`}
            placeholder="CVV"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            maxLength={4}
          />
          <AiOutlineQuestionCircle
            className="absolute inset-y-3 right-3 text-mediumGray hover:text-blue cursor-pointer"
            size={16}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div className="z-10 absolute w-[158px] -right-4 -top-[75px] bg-gray-700 text-white p-2 rounded-lg shadow-lg text-center">
              <p className="text-[10px] font-semibold">
                3-digit security code found on the back of your card.
              </p>
              <p className="text-[10px] font-semibold">
                American Express have a 4-dig code located on the front.
              </p>
              <TbArrowBigDownFilled
                className="absolute text-gray-700 right-6 -bottom-3"
                size={26}
              />
            </div>
          )}
          <ErrorMessage
            name="cvv"
            component={CustomErrorMessage}
            className="red-para"
          />
        </div>
      </div>

      <div className="col-span-full flex gap-2 h-5 items-center">
        <Field
          id="futureConfirmation"
          name="futureConfirmation"
          type="checkbox"
          checked={values.futureConfirmation}
          className="custom-checkbox"
          style={{ width: "16px", height: "16px" }}
        />
        <label
          htmlFor="futureConfirmation"
          className="paragraph-lg text-veryDarkGray"
        >
          Save payment information for future purchases
        </label>
        <ErrorMessage
          name="futureConfirmation"
          component={CustomErrorMessage}
          className="red-para"
        />
      </div>
    </div>
  );
};

export default PaymentDetailsFields;
