// src/constants.js
import * as Yup from "yup";
import JSEncrypt from "jsencrypt";

// Initial values for user details form
export const shopperData = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  confirmation: false,
};

// Initial values for card details form
export const card = {
  cardNumber: "",
  associatedName: "",
  expiration: "",
  cvv: "",
  futureConfirmation: false,
};

// Initial values for delivery details form
export const deliveryAddress = {
  street: "",
  second_street: "",
  city: "",
  state: "",
  country: {
    label: "United States of America",
    value: "US",
  },
  zip: "",
};

// Validation schema for Signup form
export const signupValidationSchema = Yup.object({
  first_name: Yup.string()
    .required("Enter first name")
    .max(30, "First name must be at most 30 characters"),
  last_name: Yup.string()
    .required("Enter last name")
    .max(30, "Last name must be at most 30 characters"),
  phone_number: Yup.string()
    .required("Phone number is required")
    .min(7, "Phone number must be valid"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Add your email address"),
  confirmation: Yup.boolean().oneOf(
    [true],
    "Check to confirm your details are correct"
  ),
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
    .test(
      "cardNumberFormat",
      "Card number must contain only digits",
      (value) => {
        const strippedValue = value ? value.replace(/\s+/g, "") : ""; // Remove spaces
        return /^\d+$/.test(strippedValue); // Ensure only digits
      }
    ),
  associatedName: Yup.string()
    .required("Add the name associated with the card")
    .max(30, "Associated name must be at most 30 characters"),
  expiration: Yup.string()
    .required("Expiration date is invalid")
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiration format (MM/YY)")
    .test("future-date", "Expiration must be in the future", function (value) {
      if (!value) return false;
      const [month, year] = value.split("/").map(Number);
      const now = new Date();
      const expiryDate = new Date(`20${year}-${month}-01`);
      return expiryDate > now;
    }),
  cvv: Yup.string()
    .required("CVV is required")
    .matches(/^\d+$/, "CVV must be a number")
    .min(3, "CVV must be at least 3 digits")
    .max(4, "CVV can be at most 4 digits"),
  country: Yup.object().required("Please select a Country"),
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

export const cardInfoValidationSchema = Yup.object({
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
    .test("future-date", "Expiration must be in the future", function (value) {
      if (!value) return false;
      const [month, year] = value.split("/").map(Number);
      const now = new Date();
      const expiryDate = new Date(`20${year}-${month}-01`);
      return expiryDate > now;
    }),
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

const encryptData = async (data, publicKey) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  const encryptedData = encryptor.encrypt(data);
  return encryptedData;
};

// Utility function to prepare form data
export const prepareFormData = async (values, secretKey) => {
  try {
    let cardData = JSON.stringify({
      card_holder_name: values.associatedName,
      card_number: values.cardNumber.replace(/\s+/g, ""),
      cvv: values.cvv,
      expiry: values.expiration,
    });
    let data = new FormData();
    const encryptedData = await encryptData(cardData, secretKey);
    data.append("encrypted_data", encryptedData);
    data.append("address_line_1", values.street);
    data.append("address_line_2", values.second_street);
    data.append("city", values.city);
    data.append("state", values.state);
    data.append("zipcode", values.zip);
    data.append("country", values.country.value);
    data.append("card_save", values.futureConfirmation);
    return data;
  } catch (error) {
    console.log("prepareFormData=----------------------", error);
  }
};
