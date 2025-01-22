import React from "react";

function Buttons() {
  return (
    <>
      <button
        className="pay-with-nanokard"
        style={{
          "--button-width": "", // Custom width
          "--button-height": "", // Custom height
          "--button-color": "", // Custom background color
          "--button-hover-color": "", // Custom hover color
        }}
      >
        <img src="/Vector.svg" alt="Vector Icon" />
        <div className="icon-text">
          <p className="text">Pay With</p>
          <img src="/Union.svg" alt="Union Icon" />
        </div>
      </button>

      {/* <button className="w-[633px] h-[62px] bg-[#0C1E30] gap-[16px] rounded-[5px] flex items-center justify-center focus:outline-none hover:bg-[#0A1724]">
        <img src="/Vector-blue.svg" alt="Vector Blue Icon" />
        <div className="flex items-center gap-2">
          <p className="font-open-sans text-[19px] font-semibold leading-[25.87px] text-white">
            PayWith
          </p>
          <img src="/Union.svg" alt="Union Icon" />
        </div>
      </button> */}
    </>
  );
}

export default Buttons;
