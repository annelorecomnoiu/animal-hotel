import { Badge } from "@material-ui/core";
import { LocalHotel } from "@material-ui/icons";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { logout } from "../redux/apiCalls";
import { setCartEmpty } from "../redux/cartRedux";
import logoImage from "../assets/images/lion-images-png-impremedia-25.png";
import avatarImage from "../assets/images/no-avatar.gif";

const Container = styled.div`
    height: 60px;
    background-color: white;
`;

const Image = styled.img`
    height: 47px;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const MenuItem = styled.div`
    font-size:14px;
    cursor: pointer;
    margin-left: 25px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`;

const Username = styled.div`
    font-size:14px;
    cursor: pointer;
    margin-left: 7px;
    margin-right: 12px;
`;

const Navbar = () => {

    const quantity = useSelector(state =>state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            await new Promise((resolve) => {
                localStorage.setItem('persist:root', undefined);
                resolve();
            });
            await logout(dispatch);
            dispatch(setCartEmpty());
        } catch (err) {
          console.log("ERROR: " + err);
        }
      };
    
    return (
        <Container>
        <Wrapper> 
            <Left>
                <Image src={logoImage} alt="Logo"/> 
            </Left>
            <Center>
                <Logo>ASLAN's PET HOUSE</Logo>
            </Center>
            <Right>
                
            {user ? (
                    <>
                    <Img src={avatarImage} alt="Avatar" />
                    <Username>{user.username}</Username>
                    <MenuItem onClick={handleClick} >LOGOUT</MenuItem>
                    </>
                ) : (
                    <>
                    <StyledLink to="/register">
                        <MenuItem>REGISTER</MenuItem>
                    </StyledLink>
                    
                    <StyledLink to="/login">
                        <MenuItem >SIGN IN</MenuItem>
                    </StyledLink>
                    </>
                )}
                <Link to="/cart">
                    <MenuItem>
                        <Badge badgeContent={quantity} color="primary" >
                            <LocalHotel style={{color:"black", fontSize: 30}}/>
                        </Badge>
                    </MenuItem>
                </Link>
                
            </Right>
        </Wrapper>
        </Container>
    )
}

export default Navbar
