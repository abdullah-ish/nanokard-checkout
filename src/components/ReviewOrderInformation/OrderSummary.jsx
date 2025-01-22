const OrderSummary = ({ orderData, useWallet, showUsedWalletBalance, orderTotal }) => (
  <>
    <div>
      <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
        <span>Subtotal</span>
        <span>${orderData.txn_value?.toFixed(2) || "0.00"}</span>
      </p>
      <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
        <span>Shipping</span>
        <span>${orderData.shipping_cost?.toFixed(2) || "0.00"}</span>
      </p>
      <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
        <span>Discount</span>
        <span>-${orderData.discount_value?.toFixed(2) || "0.00"}</span>
      </p>
      <p className="flex justify-between paragraph-md text-veryDarkGray mb-1">
        <span>Tax</span>
        <span>${orderData.tax_value?.toFixed(2) || "0.00"}</span>
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
);

export default OrderSummary
