import React, { useContext, useState } from "react";
import Order from "./Order";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";

const MobileOrderDetails = ({ productsData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { checkoutData, orderData = {} } = useContext(CheckoutContext);
  const orderTotal = orderData?.grand_total_value;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="bg-white">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className="w-full h-[52px] py-4 px-5 bg-white flex justify-between items-center sm:rounded-t-lg border-lightBlue"
          aria-expanded={isOpen}
          aria-controls="accordion-collapse-body-1"
          onClick={toggleAccordion}
          style={{
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <div className="flex items-center space-x-2">
            <img src="/ion_cart.svg" alt="ion_cart" />
            <span className="font-semibold text-[16px] leading-[21.79px] heading-3-normal">
              {checkoutData ? checkoutData?.locationName : "Location Name"}{" "}
              order
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="ml-14 font-semibold text-[16px] leading-[21.79px] heading-3-normal">
              ${orderTotal?.toFixed(2) || "0.00"}
            </span>
            <img src="/chevron-arrow.svg" />
          </div>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`${isOpen ? "" : "hidden"} w-full`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 pt-0">
          <Order />
        </div>
      </div>
    </div>
  );
};

export default MobileOrderDetails;
