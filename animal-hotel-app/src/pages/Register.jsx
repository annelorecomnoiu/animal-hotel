import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import validation from "../Validation";
import { getCart, register } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/aslan.jpg";
import { useEffect } from "react";

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
    flex-wrap: wrap;
    justify-content: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 30px;
`;

const Input = styled.input`
    flex:1;
    min-width: 40%;
    margin: 10px 0px 10px 0px;
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
  display: block;
`;


const Register = () => {
    const user = useSelector((state) => state.user.currentUser);
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInput = (e) => {
        setValues({...values, [e.target.name]: [e.target.value]})
    }

    useEffect(() => {
      if (user) {
        dispatch(getCart(user._id));
      }
    }, [dispatch, user]);
    
    const handleValidation = async(e) => {
        e.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);
      
        if (Object.keys(validationErrors).length === 0) {
          register(dispatch, {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password
          });
        
          // while(!user){
          //   await new Promise((resolve) => setTimeout(resolve, 1500));
          //   console.log("oo");
          // }
          // console.log(user.username);
          // dispatch(getCart(user._id));
          //navigate('/');
        }
    };
    
    
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleValidation}>
            <Input 
                type="text"
                placeholder="Enter first name"
                name="firstName"
                onChange={handleInput}
            />
            {errors.firstName && <Error>{errors.firstName}</Error>}
            <Input 
                type="text" 
                placeholder="Enter last name"
                name="lastName"
                onChange={handleInput}
            />
            {errors.lastName && <Error>{errors.lastName}</Error>}
            <Input 
                placeholder="Enter username"
                name="username"
                onChange={handleInput}
            />
            {errors.username && <Error>{errors.username}</Error>}
            <Input 
                type="email" 
                placeholder="Enter email"
                name="email"
                onChange={handleInput}
            />
            {errors.email && <Error>{errors.email}</Error>}
            <Input 
                type="password" 
                placeholder="password"
                name="password"
                onChange={handleInput}
            />
            {errors.password && <Error>{errors.password}</Error>}
            <Input 
                type="password" 
                placeholder="confirm password"
                name="confirmPassword"
                onChange={handleInput}
            />
            {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
            <Button >CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register
