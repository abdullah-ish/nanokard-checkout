import React, { useContext } from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import AuthContext from "../../contexts/auth/AuthContext";

const DefaultCardAddress = ({ showIcon }) => {
  const { existingUserData } = useContext(AuthContext);
  const defaultCard = existingUserData?.card.find((card) => card?.is_default);
  const billingAddress = defaultCard.billing_address;

  return (
    <div className="w-full flex gap-2">
      {showIcon && <IoCheckmarkCircleOutline color="green" size={16} />}
      <div className="w-full space-y-2">
        {billingAddress ? (
          <>
            <h4 className="heading-4-bold">Billing address</h4>
            <p className="paragraph-lg text-veryDarkGray">
              {existingUserData?.user?.first_name}{" "}
              {existingUserData?.user?.last_name}
            </p>
            <p className="paragraph-lg text-veryDarkGray">
              {billingAddress?.address_line_1}
            </p>
            <p className="paragraph-lg text-veryDarkGray">{`${
              billingAddress?.city ? billingAddress?.city + ", " : ""
            }${billingAddress?.state ? billingAddress?.state + ", " : ""}${
              billingAddress?.zipcode ? billingAddress?.zipcode : ""
            }`}</p>
          </>
        ) : (
          <p className="paragraph-lg text-veryDarkGray"></p>
        )}
      </div>
    </div>
  );
};

export default DefaultCardAddress;
