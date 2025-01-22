import React from "react";
import { FaLock } from "react-icons/fa";

function PaymentInfoHeader() {
  return (
    <div className="w-full ">
      <h2 className="heading-2">Payment information</h2>
      <span className="paragraph-lg text-veryDarkGray flex gap-[6px] items-center">
        <FaLock className="text-mediumGray" /> All transactions are secure and
        encrypted.
      </span>
    </div>
  );
}

export default PaymentInfoHeader;
