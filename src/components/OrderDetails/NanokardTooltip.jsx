import React from "react";
import { CiCircleQuestion } from "react-icons/ci";
import { TbArrowBigDownFilled } from "react-icons/tb";

function NanokardTooltip() {
  return (
    <div className="w-[342px] h-[192px] p-[16px_0px_20px_0px] gap-4 rounded-[8px] bg-[#404040] shadow-lg">
      <div className="w-full h-[19px] px-4 gap-2 ">
        <div className="flex items-center">
          <CiCircleQuestion size={16} style={{ color: "#FFFFFF" }} />
          <p className="heading-4-bold ml-2" style={{ color: "#FFFFFF" }}>
            How does NanoKard work?
          </p>
        </div>
      </div>
      <span className="w-full h-6 pb-3 border-t border-solid border-[#FFFFFF] flex justify-between mt-2"></span>
      <div className="w-full h-[95px] px-4 gap-2">
        <p className="paragraph-lg" style={{ color: "#FFFFFF" }}>
          <span className="block">1. Create a NanoKard account and pay.</span>
          <span className="block">
            2. Funds are securely added with your debit or credit card.
          </span>
          <span className="block">
            3. We pay the merchant on your behalf, and you receive your
            purchase.
          </span>
        </p>
        <TbArrowBigDownFilled
          className="absolute text-[#404040] right-32 -top-3 transform rotate-180"
          size={26}
        />
      </div>
    </div>
  );
}

export default NanokardTooltip;
