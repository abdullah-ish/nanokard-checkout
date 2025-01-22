import React from 'react';
import { MdCancel } from 'react-icons/md';

const CardItem = ({ card, isSelected, onClick, onEditClick }) => {
  const getCardImage = () => {
    if (card?.card_brand === "Visa") {
      return card?.is_expired ? "/disb-visa-card.svg" : "/visa-card.svg";
    }
    if (card?.card_brand === "Mastercard") {
      return card?.is_expired ? "/disb-mastercard-card.svg" : "/mastercard.svg";
    }
    if (card?.card_brand === "Discover") {
      return card?.is_expired ? "/disb-discover-card.svg" : "/discover-card.svg";
    }
    if (card?.card_brand === "American Express") {
      return card?.is_expired ? "/disb-amex-card.svg" : "/amex-card.svg";
    }
    return "/visa-card.svg"; // default
  };

  return (
    <div
      key={card?.card_id}
      onClick={() => onClick(card)}
      className={`w-full h-[49px] flex items-center justify-between p-2 rounded-lg cursor-pointer ${
        isSelected ? "bg-[#E6F5FD] border-[1px]" : "bg-white"
      }`}
    >
      <div className="w-full h-[26px] flex gap-4 items-center">
        <input
          type="radio"
          checked={isSelected}
          onChange={() => onClick(card)}
          className="cursor-pointer"
        />
        <img src={getCardImage()} alt={`${card?.card_brand} Card Icon`} />
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
        onClick={(e) => {
          e.stopPropagation(); // Prevents triggering the onClick of parent div
          onEditClick(card);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default CardItem;
