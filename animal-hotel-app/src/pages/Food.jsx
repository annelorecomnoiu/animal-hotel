import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import styled from "styled-components"
import { useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addFood, updateCartFromDatabase } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
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

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const Food = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [food, setFood] = useState({});
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [categoriesError, setCategoriesError] = useState(false);

    useEffect(() => {
        const getFood = async () => {
            try{
                const res = await publicRequest.get("/foods/find/"+id);
                setFood(res.data);
            } catch {}
        };
        getFood();
    }, [id]);

    const handleClick = () => {
        const cartData = JSON.parse(localStorage.getItem('cart'));
        if(user && cartData){
            const foodExists = cartData.foods.some((cartFood) => cartFood._id === food._id);
            const foodCategories = cartData.foods.map((cartFood) => cartFood.categories);
            const categoriesMatch = food.categories.some((category) =>
                foodCategories.flat().includes(category)
            );
            if (foodExists) {
                setError(true);    
            }else if (categoriesMatch){
                setCategoriesError(true);
            } else {
            dispatch(addFood({ ...food }));
            const currentCartData = JSON.parse(localStorage.getItem('cart'));
            updateCart(dispatch, currentCartData);
            dispatch(updateCartFromDatabase(JSON.stringify(currentCartData)));
            }
        } else {
            navigate("/login");
        }
    
    }

  return (
    <Container>
      <Navbar/>
      <Announcement announcement="Please select the same type of food as the chosen room type for your pet."/>
      <Wrapper>
        <ImageContainer>
            <Image src = { food.img }/>
        </ImageContainer>
        <InfoContainer>
            <Title>{ food.title }</Title>
            <Description>{ food.description }</Description>
            <Price>${ food.price } /day</Price>
            <AddContainer>
              <Button onClick={handleClick}>CHOOSE THIS FOOD</Button>
            </AddContainer>
            {error && <p>This food is already in your cart!</p>}
            {categoriesError && <p>You have already chosen food from the same category!</p>}
        </InfoContainer>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Food
