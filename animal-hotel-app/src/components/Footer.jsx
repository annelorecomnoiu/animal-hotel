import { Facebook, Instagram, Pinterest, Room, Phone, MailOutlined } from "@material-ui/icons";
import styled, { css } from 'styled-components';
import { Link, useLocation } from "react-router-dom";

const Container = styled.div`
    display: flex;
    background-color: #D2AA87;
`;
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;
const Logo = styled.h1`
    
`;
const Description = styled.p`
    margin: 20px 0px;
`;
const SocialContainer = styled.div`
    display: flex;
`;
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50px;
    color: white;
    background-color: #${props=>props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 20px;
`;

const Right = styled.div`
    flex: 1;
    padding: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center; 
`;

const Payment = styled.img`
    width: 50%;
`;

const LinkFooter = styled(Link)`
  text-decoration: none;
  color: inherit;
  ${(props) =>
    props.isActive &&
    css`
      font-weight: bold;
    `};
`;

const Button = styled.button`
    width: 100%;
    height: 100%;
    border: none;
    background-color:transparent;
`;

const Footer = () => {
  const location = useLocation();

  return (
    <Container>
      <Left>
        <Logo>ASLAN's PET HOUSE</Logo>
        <Description>Planning to go away but don't have anyone to take care of your furry friend? Look no further! At Aslan's Pet House, we offer a reliable and caring solution for your pet's needs. Our dedicated team is ready to provide a comfortable and safe environment, ensuring your beloved companion receives the attention and care they deserve while you're away.</Description>
        <SocialContainer>
            <Button>
                <Link to="https://www.facebook.com/Aslans-Pet-House-107882185678068" target="_blank">
                    <SocialIcon color="3B5999">
                        <Facebook/>
                    </SocialIcon>
                </Link>
            </Button>
            <Button>
                <Link to="https://www.instagram.com/aslan.pethouse" target="_blank">
                    <SocialIcon color="E4405F">
                        <Instagram/>
                    </SocialIcon>
                </Link>
            </Button>
            
            <Button>
                <Link to="https://ro.pinterest.com/aslanspethouse" target="_blank">
                    <SocialIcon color="E60023">
                        <Pinterest/>
                    </SocialIcon>
                </Link>
            </Button>
        
        </SocialContainer>
      </Left>

      <Center>
        <Title>Useful Links</Title>
        <List>
      <ListItem>
        <LinkFooter to="/" isActive={location.pathname === '/'}>
          Home
        </LinkFooter>
      </ListItem>
      <ListItem>
        <LinkFooter to="/rooms" isActive={location.pathname === '/rooms'}>
          Rooms
        </LinkFooter>
      </ListItem>
      <ListItem>
        <LinkFooter to="/foods" isActive={location.pathname === '/foods'}>
          Foods
        </LinkFooter>
      </ListItem>
      <ListItem>
        <LinkFooter to="/services" isActive={location.pathname === '/services'}>
          Services
        </LinkFooter>
      </ListItem>
      <ListItem>
        <LinkFooter to="/cart" isActive={location.pathname === '/cart'}>
          Cart
        </LinkFooter>
      </ListItem>
      <ListItem>
        <LinkFooter to="/aboutUs" isActive={location.pathname === '/aboutUs'}>
          About us
        </LinkFooter>
      </ListItem>
    </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem><Room style={{marginRight:"10px"}}/> Bulevardul Soarelui nr. 987, Brașov, Romania </ContactItem>
        <ContactItem><Phone style={{marginRight:"10px"}}/> +40 742 229 189 </ContactItem>
        <ContactItem><MailOutlined style={{marginRight:"10px"}}/> aslanpethouse@yahoo.com </ContactItem>
        <Payment src= "https://i.ibb.co/Qfvn4z6/payment.png"/>
      </Right>
    </Container>
  )
}

export default Footer
