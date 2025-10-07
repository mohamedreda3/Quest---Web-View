import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Global style to reset CSS and apply a consistent baseline
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Open Sans', sans-serif;
    background: #ecf0f1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const Header = styled.header`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

const Container = styled.div`
  background: white;
  width: 90%;
  max-width: 800px;
  min-height: 500px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const Left = styled.div`
  flex-basis: 50%;
  padding: 1.5rem;
  background: #f8f9fa;

  @media only screen and (max-width: 770px) {
    flex-basis: 100%;
  }
`;

const Right = styled.div`
  flex-basis: 50%;
  padding: 1.5rem;

  @media only screen and (max-width: 770px) {
    flex-basis: 100%;
  }
`;

const Form = styled.form`
  padding: 1rem 0;
`;

const H3 = styled.h3`
  margin-bottom: 1rem;
  color: #2c3e50;
  font-size: 1.5rem;
`;

const InputText = styled.input.attrs({ type: 'text' })`
  width: 100%;
  padding: 0.7rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #34495e;
  }
`;

const ZipContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;

  label {
    flex-basis: 48%;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #34495e;
  }
`;

const InputNumber = styled.input.attrs({ type: 'number' })`
  width: 100%;
  padding: 0.7rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: #34495e;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.7rem 1.5rem;
  background: #34495e;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #2c3e50;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 0.5rem;
`;

function PaymentForm() {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cardError, setCardError] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [expDateError, setExpDateError] = useState('');

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    setCvv(value);
  };

  const handleExpDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    setExpDate(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (cardNumber.replace(/\s/g, '').length !== 16 || !/^\d+$/.test(cardNumber.replace(/\s/g, ''))) {
      setCardError('Card number must be exactly 16 digits.');
      valid = false;
    } else {
      setCardError('');
    }

    if (cvv.length !== 3 && cvv.length !== 4 || !/^\d+$/.test(cvv)) {
      setCvvError('CVV must be 3 or 4 digits.');
      valid = false;
    } else {
      setCvvError('');
    }

    if (expDate.length !== 5 || !/^\d{2}\/\d{2}$/.test(expDate)) {
      setExpDateError('Expiration date must be in MM/YY format.');
      valid = false;
    } else {
      setExpDateError('');
    }

    if (valid) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <>
      {/* <GlobalStyle /> */}
      <Header>
        <Container>
          <Left>
            <H3>BILLING ADDRESS</H3>
            <Form>
              <label>
                Full name
                <InputText placeholder="Enter name" />
              </label>
              <label>
                Email
                <InputText placeholder="Enter email" />
              </label>
              <label>
                Address
                <InputText placeholder="Enter address" />
              </label>
              <label>
                City
                <InputText placeholder="Enter city" />
              </label>
              <ZipContainer>
                <label>
                  State
                  <Select>
                    <option>Choose State..</option>
                    <option>Rajasthan</option>
                    <option>Hariyana</option>
                    <option>Uttar Pradesh</option>
                    <option>Madhya Pradesh</option>
                  </Select>
                </label>
                <label>
                  Zip code
                  <InputNumber placeholder="Zip code" />
                </label>
              </ZipContainer>
            </Form>
          </Left>
          <Right>
            <H3>PAYMENT</H3>
            <Form onSubmit={handleSubmit}>
              <div>Accepted Card</div>
              <img src={require("./image/card1.png")} width="100" alt="Card 1" />
              <img src={require("./image/card2.png")} width="50" alt="Card 2" />
              <br /><br />
              <label>
                Credit card number
                <InputText
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="xxxx xxxx xxxx xxxx"
                />
              </label>
              {cardError && <ErrorMessage>{cardError}</ErrorMessage>}
              <label>
                Exp date
                <InputText
                  value={expDate}
                  onChange={handleExpDateChange}
                  placeholder="mm/yy"
                />
              </label>
              {expDateError && <ErrorMessage>{expDateError}</ErrorMessage>}
              <ZipContainer>
                <label>
                  CVV
                  <InputNumber
                    value={cvv}
                    onChange={handleCvvChange}

                    placeholder="CVV"
                  />
                </label>
              </ZipContainer>
              {cvvError && <ErrorMessage>{cvvError}</ErrorMessage>}
              <SubmitButton type="submit">Proceed to Checkout</SubmitButton>
            </Form>
          </Right>
        </Container>
      </Header>
    </>
  );
}

export default PaymentForm;
