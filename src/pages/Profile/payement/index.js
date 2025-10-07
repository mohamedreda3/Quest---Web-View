import React, { useState } from 'react';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleCardNumberChange = (e) => {
    const formattedValue = e.target.value
      .replace(/\s/g, '')
      .replace(/(\d{4})/g, '$1 ')
      .trim();
    setCardNumber(formattedValue);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    const input = e.target.value.replace(/\s/g, '').substring(0, 5);
    const parts = input.match(/^(\d{1,2})?\/?(\d{1,2})?$/);

    if (parts) {
      let formattedValue = '';
      if (parts[1]) {
        formattedValue += parts[1].substring(0, 2);
        if (parts[2]) {
          formattedValue += '/' + parts[2].substring(0, 2);
        }
      }
      setExpirationDate(formattedValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="payment">
      <div className="form">
        <div className="inputField">
          <label htmlFor="cardNumber">Name On Card</label>
          <input type="text" id="cardNumber" required />
        </div>
        <div className="inputField">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            maxLength={19}
            onChange={handleCardNumberChange}
            placeholder="3333 4444 4444 5556"
            required
          />
        </div>
        <div className="inputField">
          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            maxLength={3}
            value={cvv}
            onChange={handleCvvChange}
            placeholder="CVV"
            required
          />
        </div>
        <div className="inputField">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            type="text"
            id="expirationDate"
            value={expirationDate}
            maxLength={5}
            onChange={handleExpirationDateChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="inputField">
          <label htmlFor="">Country</label>
          <select name="" id=""></select>
        </div>
      </div>
      <button type="submit" className="defultButtonStyle">
        Save
      </button>
    </form>
  );
};

export default PaymentForm;
