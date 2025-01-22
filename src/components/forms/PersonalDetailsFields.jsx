import React from "react";
import { Field, ErrorMessage } from "formik";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import customErrorMessage from "../CustomErrorMessage";

const PersonalDetailsFields = ({ values, errors, touched, setFieldValue }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="relative">
        {!!values.first_name && (
          <label
            htmlFor="first_name"
            className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.first_name && touched.first_name ? "red-para" : ""
            }`}
          >
            First name
          </label>
        )}
        <div className="mt-2">
          <Field
            type="text"
            name="first_name"
            id="first_name"
            className={`w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
              errors.first_name && touched.first_name
                ? "border-red focus:border-red"
                : ""
            }`}
            autoComplete="off"
            placeholder="First name"
          />
          <ErrorMessage
            name="first_name"
            component={customErrorMessage}
            className="red-para"
          />
        </div>
      </div>

      <div className="relative">
        {!!values.last_name && (
          <label
            htmlFor="last_name"
            className="text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px]"
          >
            Last name
          </label>
        )}
        <div className="mt-2">
          <Field
            type="text"
            name="last_name"
            id="last_name"
            className={`w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
              errors.last_name && touched.last_name
                ? "border-red focus:border-red"
                : ""
            }`}
            autoComplete="off"
            placeholder="Last name"
          />
          <ErrorMessage name="last_name" component={customErrorMessage} className="red-para" />
        </div>
      </div>

      <div className="relative col-span-2 sm:col-span-1">
        {!!values.phone_number && (
          <label
            htmlFor="phone_number"
            className="text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px]"
          >
            Phone number
          </label>
        )}
        <div className="mt-2">
          <Field name="phone_number">
            {({ field }) => (
              <PhoneInput
                {...field}
                value={values.phone_number}
                onChange={(value) => setFieldValue("phone_number", value)}
                inputStyle={{
                  fontSize: "14px",
                  width: "100%",
                  height: "40px",
                  padding: "10px",
                  borderRadius: "0.5rem",
                  color: "#404040",
                  border: "1px solid #CCCCCC", // Tailwind's lightGray
                  fontWeight: "600",
                }}
                placeholder="Phone number"
              />
            )}
          </Field>
          <ErrorMessage
            name="phone_number"
            component={customErrorMessage}
            className="red-para"
          />
        </div>
      </div>

      <div className="relative col-span-2 sm:col-span-1">
        {!!values.email && (
          <label
            htmlFor="email"
            className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.email && touched.email ? "red-para" : ""
            }`}
          >
            Email
          </label>
        )}
        <div className="mt-2">
          <Field
            type="text"
            name="email"
            id="email"
            autoComplete="off"
            className={`w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
              errors.email && touched.email ? "border-red focus:border-red" : ""
            }`}
            placeholder="Email"
          />
          <ErrorMessage name="email" component={customErrorMessage} className="red-para" />
        </div>
      </div>

      <div className="relative col-span-2 sm:col-span-2">
        <div className="flex gap-2 ">
          <Field name="confirmation">
            {({ field }) => (
              <input
                type="checkbox"
                id="confirmation"
                {...field}
                checked={values.confirmation}
                className="custom-checkbox"
                style={{ width: "16px", height: "16px" }}
              />
            )}
          </Field>
          <label
            htmlFor="confirmation"
            className="paragraph-lg text-veryDarkGray w-full"
          >
            I confirm that my personal details are correct
          </label>
        </div>
        <ErrorMessage
          name="confirmation"
          component={customErrorMessage}
          className="red-para ml-6 w-fit"
        />
      </div>
    </div>
  );
};

export default PersonalDetailsFields;
