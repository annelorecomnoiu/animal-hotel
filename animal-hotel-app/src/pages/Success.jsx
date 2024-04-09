import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import successIcon from '../assets/images/success.gif';
import thankyouIcon from '../assets/images/thankyou.png';
import { Link } from 'react-router-dom';
import { updateCart } from '../redux/apiCalls';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 100vh;
`;

const SuccessMessage = styled.h1`
  font-size: 24px;
  margin-top: 150px;
  position: relative;
  z-index: 1;
`;

const SuccessImage = styled.img`
  width: 200px;
  height: 200px;
  position: relative;
  z-index: 2;
`;

const ThankYouMessage = styled.p`
  font-size: 20px;
  margin-top: 50px;
  position: relative;
  z-index: 1;
`;

const ThankYouImage = styled.img`
  max-width: 100vw;
  max-height: 100vh;
  position: absolute;
  margin-bottom: -193px;
  margin-left: -2px;
  z-index: 0;
`;

const Button = styled(Link)`
  background-color: black;
  width: 124px;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  margin-top: 240px;
  font-weight: bold;
  transition: background-color 0.3s ease;
  position: relative;
  z-index: 1;
`;

const Success = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    updateCart(dispatch, JSON.parse(cart));
  }, []);

  return (
    <Container>
      <SuccessMessage>Successful Reservation!</SuccessMessage>
      <SuccessImage src={successIcon} alt="Success" />
      <ThankYouMessage>Thank you for choosing Aslan's Pet House!</ThankYouMessage>
      <ThankYouImage src={thankyouIcon} alt="Thank You" />
      <Button to="/">Go to Home Page</Button>
    </Container>
  );
}

export default Success;