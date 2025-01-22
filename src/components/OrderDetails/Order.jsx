import React, { useState, useContext, useEffect } from "react";
import CheckoutContext from "../../contexts/checkout/CheckoutContext";
import AuthContext from "../../contexts/auth/AuthContext";
import PaymentContext from "../../contexts/payment/PaymentContext";

function Order() {
  const { orderData = {}, productsData = [] } = useContext(CheckoutContext);
  const [isScrollbarVisible, setScrollbarVisible] = useState(false);
  const [mobile, setMobile] = useState(false);
  const { existingUserData } = useContext(AuthContext);
  const { useWallet } = useContext(PaymentContext);
  const userWalletBalance = existingUserData?.user?.user_wallet_balance;
  let orderTotal = orderData?.grand_total_value;
  let showUsedWalletBalance = userWalletBalance;

  if (useWallet) {
    if (userWalletBalance >= orderTotal) {
      showUsedWalletBalance = orderTotal;
      orderTotal = 0;
    } else {
      orderTotal = orderTotal - userWalletBalance;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div>
      <div
        className={`w-full border-t sm:border-t-0 h-[207px] sm:h-auto overflow-auto gap-3 custom-scrollbar ${
          isScrollbarVisible || mobile ? "scrollbar-visible" : ""
        }`}
        onMouseEnter={() => setScrollbarVisible(true)}
        onMouseLeave={() => setScrollbarVisible(false)}
      >
        <div className="sm:w-[269px] w-full sm:h-auto sm:max-h-[175px] h-full">
          <div className="gap-4 w-full pt-4">
            {productsData.length ? (
              productsData.map((product, index) => (
                <div
                  key={index}
                  className="w-full h-[33px] flex justify-between mb-3"
                >
                  <div className="w-[151px] h-full">
                    <p className="heading-4-bold">{product.name}</p>
                    <p className="paragraph-md text-mediumGray">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="paragraph-md text-mediumGray">
                      ${product.amount?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="paragraph-md text-veryDarkGray text-center">
                Products Not Found
              </p>
            )}
          </div>
        </div>
      </div>
      <span className="w-full mt-3 border-t border-solid border-gray-200 flex justify-between"></span>
      {/* Subtotal section */}
      <div className="w-full h-[142px] pt-4 border-t border-transparent">
        <div className="gap-4 w-full">
          {orderData ? (
            <>
              <div>
                <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
                  <span>Subtotal</span>
                  <span>${orderData?.txn_value?.toFixed(2) || "0.00"}</span>
                </p>
                <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
                  <span>Shipping</span>
                  <span>
                    {orderData?.shipping_cost === 0 || !orderData?.shipping_cost
                      ? "Free"
                      : `$${orderData.shipping_cost.toFixed(2)}`}
                  </span>
                </p>
                <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
                  <span>Discount</span>
                  <span>
                    -${orderData?.discount_value?.toFixed(2) || "0.00"}
                  </span>
                </p>
                <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
                  <span>Tax</span>
                  <span>${orderData?.tax_value?.toFixed(2) || "0.00"}</span>
                </p>
                {useWallet && (
                  <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
                    <span>NanoKard balance</span>
                    <span>-${showUsedWalletBalance?.toFixed(2)}</span>
                  </p>
                )}
              </div>
              <div className="mt-2">
                <p className="flex justify-between heading-3-bold">
                  <span>Order total</span>
                  <span>${orderTotal?.toFixed(2) || "0.00"}</span>
                </p>
              </div>
            </>
          ) : (
            <p className="paragraph-md text-veryDarkGray text-center">
              Order details Not Found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
