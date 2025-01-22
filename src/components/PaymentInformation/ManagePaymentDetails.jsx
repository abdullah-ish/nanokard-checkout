import React, { useState, useContext, useEffect } from "react";
import PaymentInfoHeader from "./PaymentInfoHeader";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import ShippingInfo from "../forms/ShippingInfo";
import PaymentContext from "../../contexts/payment/PaymentContext";
import AuthContext from "../../contexts/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

function ManagePaymentDetails() {
  const { existingUserData, setFormRef, addCard } = useContext(AuthContext);
  const {
    selectedCard,
    setSelectedCard,
    useWallet,
    setUseWallet,
    setReviewSelectedCard,
    isAddingCard,
    setIsAddingCard,
  } = useContext(PaymentContext);

  const [isEditingCard, setIsEditingCard] = useState(false);
  const [selectedCardObject, setSelectedCardObject] = useState(null);
  const [isExpired, setIsExpired] = useState(null);
  const [addCardSelected, setAddCardSelected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCard) {
      const cardExpired = existingUserData.card?.some(
        (card) => card.card_id === selectedCard && card.is_expired
      );
      setIsExpired(cardExpired);
    }
  }, [selectedCard]);

  const handleCardClick = (card) => {
    if (!card?.is_expired) {
      setSelectedCard(card?.card_id);
      setReviewSelectedCard(card);
    }
    setIsAddingCard(false);
    setAddCardSelected(false);
    setFormRef(null);
    setSelectedCardObject(card);
  };

  const handleAddCardClick = () => {
    setIsAddingCard(true);
    setAddCardSelected(true);
    setSelectedCard(null);
    setReviewSelectedCard(null);
    setFormRef("add_card_form");
  };

  const handleEditCardClick = () => {
    setIsEditingCard(true);
  };

  const handleCancelEditCard = () => {
    setIsEditingCard(false);
  };

  const handleCheckboxChange = () => {
    setUseWallet(!useWallet);
  };

  const handleReviewPayment = () => {
    console.log("addCard", addCard);
    navigate("/review");
  };
  const userWalletBalance = existingUserData?.user?.user_wallet_balance;

  return (
    <div className="sm:p-0 p-6 sm:w-[420px] w-full h-auto gap-8 flex flex-col items-center">
      {isEditingCard ? (
        <EditCard card={selectedCardObject} onCancel={handleCancelEditCard} />
      ) : (
        <>
          <div className="sm:w-full w-[342px] h-auto gap-4 flex flex-col items-center">
            <PaymentInfoHeader />
            <div
              className={`w-full ${
                existingUserData?.credit_count + existingUserData?.debit_count >
                8
                  ? "max-h-[400px] overflow-y-auto hide-scrollbar"
                  : ""
              }`}
            >
              {existingUserData?.card?.map((card) => (
                <div
                  key={card?.card_id}
                  onClick={() => handleCardClick(card)}
                  className={`w-full h-[49px] flex items-center justify-between p-2 rounded-lg cursor-pointer ${
                    selectedCard === card?.card_id
                      ? "bg-[#E6F5FD] border-[1px]"
                      : "bg-white"
                  }`}
                >
                  <div className="w-full h-[26px] flex gap-4 items-center">
                    <input
                      type="radio"
                      checked={selectedCard === card?.card_id}
                      onChange={() => handleCardClick(card)}
                      className="cursor-pointer"
                    />
                    {card?.card_brand === "Visa" ? (
                      card?.is_expired ? (
                        <img src="/disb-visa-card.svg" alt="Visa Card Icon" />
                      ) : (
                        <img src="/visa-card.svg" alt="Visa Card Icon" />
                      )
                    ) : card?.card_brand === "Mastercard" ? (
                      card?.is_expired ? (
                        <img
                          src="/disb-mastercard-card.svg"
                          alt="Master card Icon"
                        />
                      ) : (
                        <img src="/mastercard.svg" alt="Master Card Icon" />
                      )
                    ) : card?.card_brand === "Discover" ? (
                      card?.is_expired ? (
                        <img
                          src="/disb-discover-card.svg"
                          alt="Discover Card Icon"
                        />
                      ) : (
                        <img
                          src="/discover-card.svg"
                          alt="Discover Card Icon"
                        />
                      )
                    ) : card?.card_brand === "American Express" ? (
                      card?.is_expired ? (
                        <img src="/disb-amex-card.svg" alt="Amex Card Icon" />
                      ) : (
                        <img src="/amex-card.svg" alt="Amex Card Icon" />
                      )
                    ) : (
                      <img src="/visa-card.svg" alt="Visa Card Icon" />
                    )}
                    <div>
                      <div className="flex">
                        <p className="paragraph-lg text-veryDarkGray">
                          {card?.card_brand}
                        </p>
                        <p className="paragraph-lg text-veryDarkGray">
                          &nbsp;**** {card?.last4}
                        </p>
                      </div>
                      {card?.is_expired && (
                        <div className="flex">
                          <MdCancel style={{ color: "#E32B25" }} />
                          <p className="text-[10px] text-[#E32B25] ml-1">
                            Card expired. Edit or add a new card.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    className="text-btn-blue"
                    onClick={handleEditCardClick}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full">
              {existingUserData?.credit_count + existingUserData?.debit_count <
              8 ? (
                <>
                  <div className="flex items-center ml-2">
                    <input
                      type="radio"
                      id="addCard"
                      name="paymentMethod"
                      checked={addCardSelected}
                      onChange={handleAddCardClick}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      htmlFor="addCard"
                      onClick={handleAddCardClick}
                      className="paragraph-lg text-veryDarkGray cursor-pointer"
                    >
                      Pay with new card
                    </label>
                  </div>
                  {/* Slide down AddCard component */}
                  <div
                    className={`add-card-container ${
                      isAddingCard ? "open" : ""
                    } mt-4 w-full`}
                  >
                    {isAddingCard && <AddCard />}
                  </div>
                </>
              ) : (
                <p className="red-para-md">Card limit reached.</p>
              )}
            </div>

            {userWalletBalance > 0 && (
              <span className="flex w-full mt-14">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  checked={useWallet}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <p className="paragraph-lg text-veryDarkGray">
                  Use your ${userWalletBalance?.toFixed(2)} NanoKard balance
                </p>
              </span>
            )}
          </div>

          {/* Shipping address details */}
          <div className="sm:w-full w-[342px] h-[104px] gap-6 flex flex-col">
            <ShippingInfo />
          </div>

          <div className="w-full">
            {addCardSelected ? (
              <button
                className={`sm:hidden btn-lg sm:w-[287px] w-full blue-btn-lg`}
                type="submit"
                form="add_card_form"
              >
                Review
              </button>
            ) : (
              <button
                className={`sm:hidden btn-lg sm:w-[287px] w-full ${
                  (selectedCard && !isExpired) || useWallet
                    ? "blue-btn-lg"
                    : "gray-btn-lg"
                }`}
                onClick={handleReviewPayment}
                disabled={!((selectedCard && !isExpired) || useWallet)}
              >
                Review
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ManagePaymentDetails;
