import { useEffect, useState } from "react";
import styled from "styled-components"
import { login, getCart } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import backgroundImage from "../assets/images/aslan.jpg";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    url(${backgroundImage})
    center;
  background-size: 80%; 
  background-repeat: no-repeat;
  background-position: right; 
  background-color:black;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 55px -10px rgba(0, 0, 0, 2);
`;

const Wrapper = styled.div`
width: 35%;
padding: 40px;
box-shadow: 0px 0px 55px -10px rgba(255, 255, 255, 0.5);
background: linear-gradient(
  rgba(108, 122, 137, 0.1),
  rgba(108, 122, 137, 0.1)
),center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
    color: white;
    font-size: 24px;
    font-weight: 300;
`;

const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin:10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding:12px 20px;
    background-color: #A55C27;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:disabled{
      color:green;
      cursor:not-allowed;
    }
`;

const StyledLink = styled(Link)`
    color:white;
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
  font-size: 12px;
  padding: 3px;
  color: red;
`;

const Login = () => {
  const [username, setUsername]  = useState("");
  const [password, setPassword]  = useState("");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (user) {
      dispatch(getCart(user._id));
    }
  }, [dispatch, user]);
  
  
  const handleClick = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrors("Please complete all fields");
      return;
    }

    await login(dispatch, { username, password });
    
    if (user) {
      navigate("/");
    } else {
      setErrors("Wrong username/password");
    }
  };
  


  const handleChangeInput = (e) => {
    setErrors("");
    if(e.target.name == "username")
      setUsername(e.target.value);
    else if(e.target.name == "password")
      setPassword(e.target.value);
    
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
            <Input 
              type="text"
              placeholder="username"
              name="username"
              onChange={handleChangeInput}/>
            <Input 
              placeholder="password" 
              onChange={handleChangeInput}
              name = "password"
              type = "password"/>
            <Button onClick={handleClick} >
              LOGIN
            </Button>
            {errors && <Error>{errors}</Error>}
            <StyledLink to="/register">New user? Create an account here! </StyledLink>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
