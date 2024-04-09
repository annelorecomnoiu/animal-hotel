import styled from "styled-components";
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect, useHistory } from "react";
import axios from 'axios';
import { logoImage } from "./src/assets/lion-images-png-impremedia-25.png";


const KEY = "pk_test_51NFdwbGe5hSuwFaozuC0WuWfl6owyNNlBP2xZuVbx9SgBtcg5o2emWU4OoYPLlkU156yj9gnSEMqcxV0sCnvXgK8008KKYfNbp";
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.div`
    border: none;
    padding: 10px;
    background-color: #C8935E;
    color: white;
    cursor: pointer;
    font-weight: 600;
`;

const Pay = () => {

  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory;

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try{
        const res = await axios.post(
            "http://localhost:5000/api/checkout/payment", 
          {
            tokenId: stripeToken.id,
            amount: 2000,
          }
        );
        console.log(res.data);
        history.push("/success");
      }catch(err){
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, history]);

  return (
    
    <Container>
      
      {stripeToken ? ( 
        <span>Processing. Please wait...</span>
        
      ): ( 
      <StripeCheckout 
       name="Aslan's Pet House"
       image = {logoImage}
       billingAddress
       shippingAddress
       description={`Your total is $${cart.total}`}
       amount={finalTotal * 100} 
       currency="usd"
       token={onToken}
       stripeKey={KEY}
       >
        <Button>PAY NOW</Button>
      </StripeCheckout>

      
      )};
    </Container>
  )
}

export default Pay
