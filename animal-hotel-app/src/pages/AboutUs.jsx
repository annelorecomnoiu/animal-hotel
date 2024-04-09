import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Container = styled.div`
  width: 100%;
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 120vh;
  background: linear-gradient(
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0)
  ),
  url("https://coolwallpapers.me/th700/6133876-poster-luminos-movie-orange-eye-black-aslan-narnia-lion-fantasy-ship.jpg")
  center;
  background-size: 86%;
  background-repeat: no-repeat;
  background-position: right; 
  background-color: black;
  box-shadow: 0px 0px 55px -10px rgba(0, 0, 0, 2);
`;

const Wrapper = styled.div`
  width: 47%;
  margin-left: 40px;
  max-width: 800px;
  padding: 40px;
  box-shadow: 0px 0px 55px -10px rgba(255, 255, 255, 0.5);
  background: linear-gradient(
    rgba(108, 122, 137, 0.1),
    rgba(108, 122, 137, 0.1)
  ), center;
  justify-content: flex-start;
`;

const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 20px;
`;

const Description = styled.p`
  color: white;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 15px;
`;

const NavbarWrapper = styled.div`
  width: 100%;
`;

const AboutUs = () => {
  return (
    <Container>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <Wrapper>
        <Title>Welcome to Aslan's Pet House</Title>
        <Description>
            At Aslan's Pet House, we are dedicated to providing exceptional care and comfort for your beloved pets. As a premier pet hotel, we understand that your pets are an important part of your family, and we strive to create a safe and nurturing environment where they can thrive.
          </Description>
          <Description>
            Our state-of-the-art facilities are designed to cater to a wide range of pets, including dogs, cats, rabbits, hamsters, turtles, birds, and reptiles. We offer a variety of spacious and well-appointed rooms, ensuring that each guest receives the most comfort during their stay. Whether your pet prefers a cozy private room or enjoys the company of other animals in a communal space, we have the perfect accommodation to suit their needs.
          </Description>
          <Description>
            At Aslan's Pet House, we go above and beyond to provide personalized care for each pet. Our highly trained and compassionate staff are passionate about animals and are committed to ensuring the well-being of your furry, feathery, or scaly friends. From regular feeding and exercise routines to grooming and medical assistance, we provide comprehensive care to meet all your pet's needs.
          </Description>
          <Description>
            In addition to our exceptional accommodations, we offer a wide range of premium services to enhance your pet's experience. Our grooming salon provides professional grooming and spa treatments to keep your pet looking and feeling their best. We also offer training programs to help your pet develop new skills and behaviors. You can rest assured that your pet will receive the highest level of care and attention from our dedicated team.
          </Description>
          <Description>
            Booking at Aslan's Pet House is simple and convenient. With our user-friendly online platform, you can easily make reservations and manage your pet's stay from the comfort of your own home. We also offer secure online payment options, ensuring a seamless and hassle-free booking process.
          </Description>
          <Description>
            Thank you for considering Aslan's Pet House for your pet's lodging needs. We look forward to providing a delightful and unforgettable experience for your furry companions. Contact us today to make a reservation or to learn more about our services. We can't wait to welcome your pets to their home away from home!
          </Description>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default AboutUs;
