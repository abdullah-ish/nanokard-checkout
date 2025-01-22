const PayButton = ({
                     loading,
                     handleSubmit,
                     handleNewCard,
                     handlePayNowClick,
                     values,
                     formRef,
                     isSignup,
                   }) => {
  const renderSpinner = () => (
    <span className="flex items-center justify-center">
      Paying
      <img
        src="/spinner.gif"
        alt="Spinner"
        className="spinner-gif w-4 h-4 ml-1"
        style={{ filter: "brightness(0) invert(1)" }}
      />
    </span>
  );

  const getButtonClass = (isEnabled) =>
    `w-full btn-lg mt-4 ${isEnabled ? "blue-btn-lg" : "gray-btn-lg"}`;

  const isButtonDisabled = (confirmation) =>
    loading || !confirmation;

  const renderButton = (onClick, isEnabled, text) => (
    <button
      className={getButtonClass(isEnabled)}
      onClick={onClick}
      disabled={isButtonDisabled(isEnabled)}
    >
      {loading ? renderSpinner() : text}
    </button>
  );

  if (isSignup) {
    return renderButton(
      handleSubmit,
      values.nk_confirmation && values.tos_confirmation,
      "Pay Signup"
    );
  }

  if (formRef === "add_card_form") {
    return (
      <button
        className={getButtonClass(values.tos_confirmation)}
        form={formRef}
        disabled={isButtonDisabled(values.tos_confirmation)}
        onClick={handleNewCard}
      >
        {loading ? renderSpinner() : "Pay New Card"}
      </button>
    );
  }

  return renderButton(
    handlePayNowClick,
    values.tos_confirmation,
    "Pay Now"
  );
};

export default PayButton;
