import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import { Link } from "react-router-dom";
import styled from "styled-components"
import { sliderItems } from "../data"
import { useState } from 'react';


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  background-color: #0D1114;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props=> props.direction === "left" && "10px"};
  right: ${props=> props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform:translateX(${props=>props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width:100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 92%;
`;

const InfoContainer = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  color:white;
  font-size: 70px;
`;
const Description = styled.p`
  margin:100px 80px 40px 0px;
  font-size: 20px;
  font-weight:500;
  letter-spacing: 3px;
  color:white;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  color:white;
  box-shadow: 0 0 0 1.5px white;
  cursor: pointer;
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) =>{
    if(direction ==="left"){
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }

  }
  return (
    <Container>
      <Arrow direction="left" onClick={()=> handleClick("left")}>
        <ArrowLeftOutlined/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
          { sliderItems.map((item) => (
        <Slide bg={item.bg} key={item.id}>
          <ImgContainer> 
            <Image src={item.img}/> 
          </ImgContainer>
          <InfoContainer>
            <Description>{item.description}</Description>
            <Link to="/rooms">
              <Button>RESERVE NOW</Button>
            </Link>
          </InfoContainer>
        </Slide>
        ))}

      </Wrapper>
      <Arrow  direction="right" onClick={()=> handleClick("right")}>
        <ArrowRightOutlined/>
      </Arrow>
    </Container>
  )
}

export default Slider
