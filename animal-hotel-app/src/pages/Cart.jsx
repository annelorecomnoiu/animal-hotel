import styled from "styled-components"
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import { Add, Remove, Delete } from "@material-ui/icons";
import { deleteRoom, deleteFood, deleteService, updateService, updateCartFromDatabase, addDatesToRoom, setCartEmpty } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect, useMemo } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { addReservation, updateCart } from "../redux/apiCalls";

const KEY = process.env.REACT_APP_STRIPE;


const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding:20px;
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Period = styled.h5`
    font-weight: 10;
    text-align: center;
    margin-top:10px;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

const TopButton = styled.div`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props)=>props.type === "filled" && "none"};
    background-color: ${(props)=>props.type === "filled" ? "black" : "transparent"};
    color: ${(props)=>props.type === "filled" && "white"};
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;


const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
`;
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;
const Image = styled.img`
    width: 200px;
`;
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const ProductName = styled.span`
    
`;
const ProductId = styled.span`
    
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
`;
const ProductPrice = styled.div`
    font-size: 20px;
    font-weight: 200;
    margin-bottom:20px;
`;

const ProductQuantity = styled.div`
    font-size: 15px;
    margin-bottom:20px;
`;


const ProductPriceTotal = styled.div`
    font-size: 30px;
    font-weight: 200;
    margin-bottom:20px;
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
    margin-bottom: 13px;
    margin-top: 13px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 25vh;
`;

const SummaryTitle = styled.h1`
    font-weight: 70;
    font-size: 27px;
    margin-bottom: 50px;
`;
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=> props.type === "total" && "500"};
    font-size: ${props=> props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span`

`;
const SummaryItemPrice = styled.span`

`;
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: ${({ disabled }) => (disabled ? 'gray' : 'black')};
    color: white;
    font-weight: 600;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const ErrorMessage = styled.p`
  color: red;
  display: ${props => (props.active ? "block" : "none")};
`;

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorActive, setErrorActive] = useState(false);
  let cartData = JSON.parse(localStorage.getItem('cart'));
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [hasError, setHasError] = useState(false);

  const findFoodCategoryMatch = useSelector((state) => (foodId) => {
    cartData = JSON.parse(localStorage.getItem('cart'));
    const food = cartData?.foods?.find((food) => food._id === foodId);
    if (food) {
      return food.categoryMatch;
    }
    return false;
  });

  const findServiceCategoryMatch = useSelector((state) => (serviceId) => {
    cartData = JSON.parse(localStorage.getItem('cart'));
    const service = cartData?.services?.find((service) => service._id === serviceId);
    if (service) {
      return service.categoryMatch;
    }
    return false;
  });
  const hasFoodError = useMemo(() => cart.foods?.some(food => !findFoodCategoryMatch(food._id)), [cart.foods, findFoodCategoryMatch]);
  const hasServiceError = useMemo(() => cart.services?.some(service => !findServiceCategoryMatch(service._id)), [cart.services, findServiceCategoryMatch]);
  const isButtonDisabled = hasFoodError || hasServiceError || buttonDisabled;

  useEffect(() => {
    cartData = JSON.parse(localStorage.getItem('cart'));
    if (cartData && (cartData.rooms.length === 0 )) {
        setErrorActive(false);
    } else {
        setErrorActive(true);
    }   
  }, [cart?.rooms]);

  useEffect(() => {
    cartData = JSON.parse(localStorage.getItem('cart'));
    const disableButton = cartData?.rooms?.length === 0 || cartData?.foods?.length === 0 || cartData?.foods?.length !== cartData?.rooms[0].categories.length-1;
    setButtonDisabled(disableButton);
  }, [cartData?.rooms?.length, cartData?.foods?.length]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleDeleteRoom = async (room) => {
    const previousCartData = JSON.parse(localStorage.getItem('cart'));
    dispatch(deleteRoom(room));
    let cart = localStorage.getItem('cart');
    cartData = JSON.parse(cart);
    while (JSON.stringify(previousCartData.rooms) === JSON.stringify(cartData.rooms)) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        cart = localStorage.getItem('cart');
        cartData = JSON.parse(cart);
      }
    await updateCart(dispatch, JSON.parse(cart));
    dispatch(updateCartFromDatabase(cart));
  };

  const handleDeleteFood = async (food) => {
    const previousCartData = JSON.parse(localStorage.getItem('cart'));
    dispatch(deleteFood(food));
    let cart = localStorage.getItem('cart');
    let cartData = JSON.parse(cart);
    while (JSON.stringify(previousCartData.foods) === JSON.stringify(cartData.foods)) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        cart = localStorage.getItem('cart');
        cartData = JSON.parse(cart);
      }
    await updateCart(dispatch, JSON.parse(cart));
    dispatch(updateCartFromDatabase(cart));
  };

  const handleDeleteService = async (service) => {
    const previousCartData = JSON.parse(localStorage.getItem('cart'));
    dispatch(deleteService(service));
    let cart = localStorage.getItem('cart');
    let cartData = JSON.parse(cart);
    while (JSON.stringify(previousCartData.services) === JSON.stringify(cartData.services)) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        cart = localStorage.getItem('cart');
        cartData = JSON.parse(cart);
      }
    await updateCart(dispatch, JSON.parse(cart));
    dispatch(updateCartFromDatabase(cart));
  };

  const handleQuantity = async (type, service) => {
    const previousCartData = JSON.parse(localStorage.getItem('cart'));
    dispatch(updateService({ service, type }));
    let cart = localStorage.getItem('cart');
    let cartData = JSON.parse(cart);
    while (JSON.stringify(previousCartData.services) === JSON.stringify(cartData.services)) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        cart = localStorage.getItem('cart');
        cartData = JSON.parse(cart);
      }
    
    await updateCart(dispatch, JSON.parse(cart));
    dispatch(updateCartFromDatabase(cart));
  };
  

  useEffect(() => {
    const makeRequest = async () => {
      try{
        const roomsId = cartData.rooms.map(room => ({ roomId: room._id }));
        const foodsId = cartData.foods.map(food => ({ foodId: food._id }));
        const servicesId = cartData.services.map(service => ({ serviceId: service._id }));
        const res = await userRequest.post(
            "/checkout/payment", 
          {
            tokenId: stripeToken.id,
            amount: cart.total * 100,
          }
        );
        addReservation(dispatch, {
          userId: user._id,
          rooms: roomsId,
          foods: foodsId,
          services: servicesId || [],
          startDate: cart.startDate,
          endDate: cart.endDate,
          amount: cart.total,
          billingDetails: res.data.billing_details
        });
        cartData = JSON.parse(localStorage.getItem('cart'));
        dispatch(addDatesToRoom(JSON.stringify(cartData)));
        dispatch(setCartEmpty());
        navigate("/success", {data: res.data});
      }catch(err){
        console.log(err);
      }
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <Container>
      <Navbar/>
      <Announcement announcement="You must select a room, choose a food type (one or more if you select a room for different types of pets), and optionally add any desired services."/>
      <Wrapper>
        <Title>YOUR RESERVATION</Title>
        <Period>{cart.startDate} - {cart.endDate}</Period>
        <Top>
            <TopButton onClick={goBack}>GO BACK</TopButton>
        </Top>
        <Bottom>
            <Info>
                {cart?.rooms && cart?.rooms[0] && (
                    <>
                <Product key={cart.rooms[0]?._id}>
                <ProductDetail>
                    <Image src={cart.rooms[0]?.img}/>
                    <Details>
                        <ProductName><b>Room: </b>{cart.rooms[0]?.title}</ProductName>
                        <ProductId><b>ID: </b>{cart.rooms[0]?._id}</ProductId>
                    </Details>
                    
                </ProductDetail>
                <PriceDetail>
                    <ProductPrice> ${cart.rooms[0]?.price }/ day </ProductPrice> 
                    <ProductPriceTotal> ${cart.rooms[0]?.price * cart.nrOfDays } </ProductPriceTotal> 
                    <Delete onClick={() => handleDeleteRoom(cart?.rooms[0])}/>
                </PriceDetail>
            </Product>
            </>
                )}

                {cart?.foods?.map(food => (
                <>
                <Hr/>
                    <Product key={food._id}>
                    <ProductDetail>
                        <Image src={food.img}/>
                        <Details>
                            <ProductName><b>Food: </b>{food.title}</ProductName>
                            <ProductId><b>ID: </b>{food._id}</ProductId>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductPrice> ${food.price }/ day</ProductPrice> 
                        <ProductPrice> ${food.price * cart.nrOfDays }/ pet</ProductPrice> 
                        <ProductPriceTotal>${food?.price * cart.nrOfDays * cart.nrOfPets } </ProductPriceTotal> 
                        <Delete onClick={() => handleDeleteFood(food)}/>
                    </PriceDetail>
                </Product>
                {findFoodCategoryMatch(food?._id) === false && (
                    <ErrorMessage key={food._id} active={errorActive}>
                    This food does not match the chosen room category
                  </ErrorMessage>
             )} 
                </>
                ))}


                {cart?.services?.map(service => (
                     <>
                     <Hr/>
                    <Product key={service?._id}>
                    <ProductDetail>
                        <Image src={service?.img}/>
                        <Details>
                            <ProductName><b>Service: </b>{service?.title}</ProductName>
                            <ProductId><b>ID: </b>{service?._id}</ProductId>

                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            <Add onClick={() => handleQuantity("inc", service)}/>
                            <ProductAmount>{service?.nrOfServices}</ProductAmount>
                            <Remove onClick={() => handleQuantity("dec", service)}/>
                        </ProductAmountContainer>
                        <ProductQuantity>{service?.nrOfServices } service/s of this type during your pet's stay</ProductQuantity> 
                        <ProductPrice> ${service?.price * service?.nrOfServices }/ pet</ProductPrice> 
                        <ProductPriceTotal>${service?.price * service?.nrOfServices * cart?.nrOfPets }</ProductPriceTotal> 
                        <Delete onClick={() => handleDeleteService(service)}/>
                    </PriceDetail>
                </Product>
                {findServiceCategoryMatch(service?._id) === false && (
                    <ErrorMessage key={service._id} active={errorActive}>
                    This service does not match the chosen room category
                  </ErrorMessage>
             )} 
                </>
                ))}


            </Info>
            <Summary>
                <SummaryTitle>RESERVATION   SUMMARY</SummaryTitle>

                <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>${cart.total} </SummaryItemPrice>
                </SummaryItem>
                <StripeCheckout 
                    name="Aslan's Pet House"
                    image = "https://www.freepnglogos.com/uploads/lion-png/lion-images-png-impremedia-25.png"
                    billingAddress
                    shippingAddress
                    description={`Your total is $${cart.total}`}
                    amount={cart.total*100}
                    token={onToken}
                    stripeKey={KEY}
                >
                    <Button disabled={isButtonDisabled}>CHECKOUT NOW</Button>
                </StripeCheckout>
                
            </Summary>
        </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Cart
