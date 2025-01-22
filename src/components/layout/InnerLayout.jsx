import React from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import WelcomeBanner from "./WelcomeBanner";
import VerticalDivider from "../VerticalDivider";

const InnerLayout = ({ children, welcomeBanner = false }) => {
  return (
    <>
      {/* inner container */}
      <div className="w-[819px] rounded-[10px] flex flex-col bg-white shadow-custom">
        {welcomeBanner && <WelcomeBanner />}
        <div className="w-full flex gap-8 py-6 px-8">
          {/* left section */}
          <div className="w-[420px] flex flex-col gap-8 rounded-[10px]">
            {children}
          </div>
          <VerticalDivider />
          {/* right section  */}
          <div className="w-[287px] h-[671px] flex gap-8 flex-col">
            <OrderDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default InnerLayout;
