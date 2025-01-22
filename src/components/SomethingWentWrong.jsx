import { React, useContext } from "react";
import CheckoutContext from "../contexts/checkout/CheckoutContext";
import AuthContext from "../contexts/auth/AuthContext";

function SomethingWentWrong() {
  const { checkoutData } = useContext(CheckoutContext);
  const { handleCancelSession } = useContext(AuthContext);

  return (
    <div className="sm:w-[819px] w-full sm:h-[740px] h-[449px] min-h-[449px] h-[calc(100vh-290px)] flex flex-col items-center bg-white justify-center gap-12">
      <img src="/alert-action-required-icon.svg" alt="Action Required Icon" />
      <div className="w-[308px] flex flex-col items-center gap-6">
        <div className="w-full h-[79px] flex flex-col items-center gap-2">
          <p className="heading-1">Something Went Wrong</p>
          <p className="paragraph-lg text-veryDarkGray w-full h-[38px] text-center">
            Go back to{" "}
            <button className="text-btn-blue" onClick={handleCancelSession}>
              {checkoutData?.locationName || "Merchent"}{" "}
            </button>{" "}
            to restart your checkout...
          </p>
        </div>
      </div>
    </div>
  );
}

export default SomethingWentWrong;
