import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/auth/AuthContext";
import { showSuccessToast } from "../Toast";
import CustomErrorMessage from "../CustomErrorMessage";

const LoginForm = () => {
  const { sendOtp, setNewLoginNumber } = useContext(AuthContext);
  const navigate = useNavigate();

  const inputStyle = {
    fontSize: "14px",
    width: "100%",
    height: "40px",
    padding: "10px",
    borderRadius: "0.5rem",
    color: "#404040",
    border: "1px solid #CCCCCC",
    fontWeight: "600",
  };

  const errorInputStyle = {
    ...inputStyle,
    border: "1px solid #FF0000", // Red border for error
  };

  const initialValues = {
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Add your phone number"),
  });

  const handleSubmit = async (values, { setFieldError }) => {
    console.log("values-------------------", values);
    let formData = new FormData();
    formData.append("phone_number", values.phoneNumber);

    try {
      const res = await sendOtp(formData);
      setNewLoginNumber(values.phoneNumber);
      navigate("/verify-code");
      showSuccessToast("OTP Sent Successfully");
    } catch (error) {
      if (error.status === 401) {
        console.log("session has been expired", error.status);
        navigate("/session-expired");
      } else {
        setFieldError("phoneNumber", error.message); // Set the error message for the phoneNumber field
        console.log("API error:", error.message);
      }
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full sm:space-y-8">
      <div className="w-full sm:h-[565px] h-[445px] sm:py-6 min-h-[445px] h-[calc(100vh-370px)] py-8 gap-8 flex flex-col items-center">
        <p className="heading-2">Log in to NanoKard to pay</p>
        <div className="sm:w-[261px] w-[342px] space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values, errors, touched }) => (
              <Form className="w-full">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                  <div className="col-span-full relative">
                    {!!values.phoneNumber && (
                      <label
                        htmlFor="phoneNumber"
                        className="text-[10px] leading-[13.62px] text-veryDarkGray font-normal absolute left-2 top-[2px] bg-white h-[14px] px-1 space-[10px]]"
                      >
                        Phone number
                      </label>
                    )}
                    <div className="mt-2">
                      <Field name="phoneNumber">
                        {({ field }) => (
                          <PhoneInput
                            {...field}
                            value={values.phoneNumber}
                            onChange={(value) =>
                              setFieldValue("phoneNumber", value)
                            }
                            inputStyle={
                              errors.phoneNumber && touched.phoneNumber
                                ? errorInputStyle
                                : inputStyle
                            }
                            placeholder="Phone number"
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="phoneNumber"
                        component={CustomErrorMessage}
                        className="red-para"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={`w-full mt-6 ${
                    values.phoneNumber.length >= 11
                      ? "blue-btn-md-3"
                      : "gray-btn-md"
                  }`}
                >
                  Log in
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <div className="w-full space-y-1 flex flex-col items-center">
        <div className="sm:py-0 py-5">
          <div className="flex">
            <p className="paragraph-lg text-mediumGray">
              Don’t have a NanoKard account?
            </p>
            <button className="text-btn-blue ml-1" onClick={handleSignUpClick}>
              Sign up and pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
