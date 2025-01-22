import React, { useContext } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";

const ShippingInfo = ({ showIcon }) => {
  const { shippingData, checkoutData } = useContext(CheckoutContext);

  return (
    <div className="w-full flex gap-2">
      {showIcon && <IoCheckmarkCircleOutline color="green" size={16} />}
      <div className="w-full space-y-2">
        {shippingData ? (
          <>
            <h4 className="heading-4-bold">Shipping address</h4>
            <p className="paragraph-lg text-veryDarkGray">
              {checkoutData?.shopperData?.first_name}{" "}
              {checkoutData?.shopperData?.last_name}
            </p>
            <p className="paragraph-lg text-veryDarkGray">
              {shippingData.street}
              {shippingData.second_street && `, ${shippingData.second_street}`}
            </p>
            <p className="paragraph-lg text-veryDarkGray">{`${
              shippingData.city ? shippingData.city + ", " : ""
            }${shippingData.state ? shippingData.state + " " : ""}${
              shippingData.zip ? shippingData.zip : ""
            }`}</p>
          </>
        ) : (
          <p className="paragraph-lg text-veryDarkGray"></p>
        )}
      </div>
    </div>
  );
};

export default ShippingInfo;
