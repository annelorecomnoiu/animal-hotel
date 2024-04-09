import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components"
import { useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addService, updateCartFromDatabase } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { updateCart } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`;

const ImageContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 85vh;
    object-fit: cover;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;

const FilterContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin: 30px 0px;
`;
const Filter = styled.div`
    display: flex;
    align-items:center;
`;
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin:0px 5px;
    cursor:pointer;

`;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border:1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;

`;
const Button = styled.button`
    padding: 12px;
    border: 2px solid #BF8E69;
    background-color:#C8935E;
    cursor: pointer;
    font-weight: 1000;
    color: white;
    margin-top: 30px;
    margin-bottom: 10px;

    &:hover{
        background-color: #BF8E69;
    }
`;



const Service = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [service, setService] = useState({});
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    useEffect(() => {
        const getService = async () => {
            try{
                const res = await publicRequest.get("/services/find/"+id);
                setService(res.data);
            } catch {}
        };
        getService();
    }, [id]);


    const handleQuantity = (type) =>{
        if(type === "dec"){
            if(service.nrOfServices > 1){
                setService((prevService) => ({
                    ...prevService,
                    nrOfServices: prevService.nrOfServices - 1,
                  }));
            }
        }else {
            setService((prevService) => ({
                ...prevService,
                nrOfServices: prevService.nrOfServices + 1,
              }));
        }
    };

    const handleClick = () => {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        if(user && cartData){
            const serviceExists = cartData.services.some((cartService) => cartService._id === service._id);
            if (serviceExists) {
                setError(true);
            } else {
                dispatch(addService({...service}));
                const currentCartData = JSON.parse(localStorage.getItem('cart'));
                updateCart(dispatch, currentCartData);
                //dispatch(updateCartFromDatabase(JSON.stringify(currentCartData)));
            }
        } else {
            navigate("/login");
        }
    }
            
  return (
    <Container>
      <Navbar/>
      <Announcement announcement="Choose how many times you would like your pet to benefit from this service during its stay."/>
      <Wrapper>
        <ImageContainer>
            <Image src = { service.img }/>
        </ImageContainer>
        <InfoContainer>
            <Title>{ service.title }</Title>
            <Description>{ service.description }</Description>
            <Price>${ service.price } </Price>
            <AddContainer>
                <AmountContainer>
                    <Remove onClick={() => handleQuantity("dec")}/>
                    <Amount>{service.nrOfServices}</Amount>
                    <Add onClick={() => handleQuantity("inc")}/>
                </AmountContainer>
                <Button onClick={handleClick}>CHOOSE SERVICE</Button>
            </AddContainer>
            {error && <p>This service is already in your cart!</p>}
        </InfoContainer>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Service
