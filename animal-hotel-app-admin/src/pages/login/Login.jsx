import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../redux/apiCalls";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    url("https://coolwallpapers.me/th700/6133876-poster-luminos-movie-orange-eye-black-aslan-narnia-lion-fantasy-ship.jpg")
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
 
const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #A55C27;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  font-size: 12px;
  padding: 3px;
  color: red;
`;
const Text = styled.h3`
  font-size: 14px;
  font-weight: 400;
  padding: 3px;
`;

const LinkContainer = styled.span`
  flex: 1;
  min-width: 96%;
  margin-left: 0px;
  margin-top: 1px;
  padding: 10px;
`

const Login = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);


  const [errors, setErrors] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setErrors("Please complete all fields");
      return false;
    } else {
      try {
        console.log("Attempting login...");
        await login(dispatch, { username, password });
      } catch (error) {
        setErrors("Wrong username/password");
        console.log(error);
      }
    }
  };


  
  useEffect(() => {
       if (user !== null) {
        console.log("Login successful!");
        if (user.isAdmin === true) {
          navigate("/home");
          
        } else {
          logout(dispatch);
          setErrors("Not allowed to login! You need an administrator account!");
          return;
        }
      }
  }, [user, navigate, dispatch]);


  const handleChangeInput = (e) => {
    setErrors("");
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };
  

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
            <Input
                type="text"
                placeholder="username"
                name = "username"
                onChange={handleChangeInput}>
            </Input>
            <Input
                type="password"
                placeholder="password"
                name ="password"
                onChange={handleChangeInput}>
            </Input>
            <Button onClick={handleClick}>
                LOGIN
            </Button>
            {errors && <Error>{errors}</Error>}
            
      </Form>
        </Wrapper>
      </Container>
  );
};

export default Login;