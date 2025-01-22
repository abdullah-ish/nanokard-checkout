import React from "react";
import { Field, ErrorMessage } from "formik";
import Select from "react-select";
import { getCode, getNames } from "country-list";
import CustomErrorMessage from "../CustomErrorMessage";

const US_STATES = [
  "AL",
  "AK",
  "AS",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FM",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MH",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "MP",
  "OH",
  "OK",
  "OR",
  "PW",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VI",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const BillingAddressFields = ({
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}) => {
  // Country options for Select
  const countries = getNames().map((country) => ({
    label: country,
    value: getCode(country),
  }));
  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: "40px",
      borderRadius: "0.5rem",
      borderColor: "#CCCCCC",
      "&:hover": {
        borderColor: "#1DA1F2",
      },
      "&:focus": {
        borderColor: "#1DA1F2",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#CCCCCC",
    }),
  };

  return (
    <div className="grid grid-cols-1 gap-4 grid-cols-6">
      <div className="col-span-full relative">
        {!!values.country && (
          <label
            htmlFor="country"
            className={`z-10 text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.country && touched.country ? "red-para" : ""
            }`}
          >
            Country
          </label>
        )}
        <div className="mt-2">
          <Field name="country">
            {({ field }) => (
              <Select
                {...field}
                name={field.name}
                id="country"
                options={countries}
                value={values.country || null} // Ensure value is never undefined
                onBlur={() => setFieldTouched("country")}
                onChange={(value) => setFieldValue("country", value)}
                placeholder="Country"
                styles={customStyles}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
            )}
          </Field>
          <ErrorMessage name="country" component={CustomErrorMessage} className="red-para" />
        </div>
      </div>
      <div className="col-span-full relative">
        {!!values.street && (
          <label
            htmlFor="street"
            className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.street && touched.street ? "red-para" : ""
            }`}
          >
            Address line 1
          </label>
        )}
        <div className="mt-2">
          <Field
            type="text"
            name="street"
            id="street"
            className={`w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
              errors.street && touched.street
                ? "border-red focus:border-red"
                : ""
            }`}
            autoComplete="off"
            placeholder="Address line 1"
          />
          <ErrorMessage name="street" component={CustomErrorMessage} className="red-para" />
        </div>
      </div>
      <div className="col-span-full relative">
        {!!values.second_street && (
          <label
            htmlFor="second_street"
            className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.second_street && touched.second_street ? "red-para" : ""
            }`}
          >
            Address line 2
          </label>
        )}
        <div className="mt-2">
          <Field
            type="text"
            name="second_street"
            id="second_street"
            className="w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal"
            autoComplete="off"
            placeholder="Address line 2 (optional)"
          />
          <ErrorMessage
            name="second_street"
            component={CustomErrorMessage}
            className="red-para"
          />
        </div>
      </div>
      <div className="col-span-full relative">
        {!!values.city && (
          <label
            htmlFor="city"
            className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.city && touched.city ? "red-para" : ""
            }`}
          >
            City
          </label>
        )}
        <div className="mt-2">
          <Field
            type="text"
            name="city"
            id="city"
            className={`w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
              errors.city && touched.city ? "border-red focus:border-red" : ""
            }`}
            autoComplete="off"
            placeholder="City"
          />
          <ErrorMessage name="city" component={CustomErrorMessage} className="red-para" />
        </div>
      </div>
      {/* State Field: Dropdown for US, Text Input for Others */}
      <div className="col-span-3 relative">
        {!!values.state && (
          <label
            htmlFor="state"
            className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.state && touched.state ? "red-para" : ""
            }`}
          >
            State/Province
          </label>
        )}
        <div className="mt-2">
          {values.country?.value === "US" ? (
            <Field
              as="select"
              name="state"
              id="state"
              className={`w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
                errors.state && touched.state
                  ? "border-red focus:border-red"
                  : ""
              }`}
              autoComplete="off"
            >
              <option value="" label="State/Province" />
              {US_STATES.map((state) => (
                <option key={state} value={state} label={state} />
              ))}
            </Field>
          ) : (
            <Field
              type="text"
              name="state"
              id="state"
              className={`w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
                errors.state && touched.state
                  ? "border-red focus:border-red"
                  : ""
              }`}
              autoComplete="off"
              placeholder="State/Province"
            />
          )}
          <ErrorMessage name="state" component={CustomErrorMessage} className="red-para" />
        </div>
      </div>
      <div className="col-span-3 relative">
        {!!values.zip && (
          <label
            htmlFor="zip"
            className={`text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px] ${
              errors.zip && touched.zip ? "red-para" : ""
            }`}
          >
            Zip/Postal code
          </label>
        )}
        <div className="mt-2">
          <Field
            type="text"
            name="zip"
            id="zip"
            autoComplete="off"
            className={`w-full h-[40px] p-[10px] rounded-lg border border-lightGray heading-4-bold hover:border-blue focus:border-blue focus:border-2 outline-none placeholder:text-mediumGray placeholder:text-sm placeholder:font-normal ${
              errors.zip && touched.zip ? "border-red focus:border-red" : ""
            }`}
            placeholder="Zip/Postal code"
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9-]/g, "");
            }}
            maxLength={10}
          />
          <ErrorMessage name="zip" component={CustomErrorMessage} className="red-para" />
        </div>
      </div>
    </div>
  );
};

export default BillingAddressFields;
