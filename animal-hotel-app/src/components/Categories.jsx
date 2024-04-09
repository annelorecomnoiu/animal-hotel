import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    background-color: #0D1114;
`;

const ItemContainer = styled.div`
    flex: 1;
    margin: 3px;
    height: 80vh;
    position: relative;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const Info = styled.div`
    position: absolute;
    top: 180px;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const Title = styled.h1`
    color: #E3BD94;
    font-size: 50px;
    margin-bottom: 20px;
    text-shadow: 
    -2px -2px 0 black,
    2px -2px 0 black,
    -2px 2px 0 black,
    2px 2px 0 black;  
`;
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: #C8935E;
    color: white;
    cursor: pointer;
    font-weight: 600;
`;


const Categories = () => {
  return (
    <Container>
      <ItemContainer>
        <Link to="/rooms">
        <Image src="https://images.pexels.com/photos/1560424/pexels-photo-1560424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <Info>
          <Title>ROOMS</Title>
          <Button>CHOOSE A ROOM</Button>
        </Info>
        </Link>
      </ItemContainer>

      <ItemContainer>
        <Link to="/foods">
        <Image src="https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        <Info>
          <Title>FOODS</Title>
          <Button>CHOOSE FOOD TYPE</Button>
        </Info>
        </Link>
      </ItemContainer>

    <ItemContainer>
      <Link to="/services">
      <Image src="https://images.pexels.com/photos/6864673/pexels-photo-6864673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
      <Info>
        <Title>OTHER SERVICES</Title>
        <Button>CHOOSE SERVICES</Button>
      </Info>
      </Link>
    </ItemContainer>
    </Container>
    
  )
}

export default Categories
