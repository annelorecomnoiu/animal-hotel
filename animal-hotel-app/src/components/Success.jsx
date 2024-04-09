import styled from "styled-components"

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.div`
border: none;
padding: 10px;
background-color: black;
color: white;
cursor: pointer;
font-weight: 600;
`;

const Success = () => {
  return (
    <Container>
       <Button>SUCCESSFUL</Button>
    </Container>
  )
}

export default Success
