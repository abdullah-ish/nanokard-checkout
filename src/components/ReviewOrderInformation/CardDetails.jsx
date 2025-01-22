import React from 'react';

const CardDetails = ({ cardData, cardBrand }) => {
  const getCardIcon = (brand) => {
    switch (brand) {
      case 'Visa':
        return '/visa-card.svg';
      case 'Mastercard':
        return '/mastercard.svg';
      case 'Discover':
        return '/discover-card.svg';
      case 'American Express':
        return '/amex-card.svg';
      default:
        return '/visa-card.svg'; // Default fallback
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <img src={getCardIcon(cardBrand)} alt={`${cardBrand} Card Icon`} />
        <div className="text-gray-600">
          {cardData?.cardNumber ? `**** ${cardData?.cardNumber.slice(-4)}` : ""}
        </div>
      </div>
      <div className="text-gray-600">
        {cardData?.cardHolderName || cardData?.associatedName || ""}
      </div>
      <div className="text-gray-600">
        {cardData?.street
          ? `${cardData?.street}${cardData?.secondStreet ? `, ${cardData?.secondStreet}` : ""}`
          : ""}
      </div>
      <div className="text-gray-600">
        {[
          cardData?.city,
          cardData?.state,
          cardData?.zip
        ].filter(Boolean).join(" ")}
      </div>
    </>
  );
};

export default CardDetails;
