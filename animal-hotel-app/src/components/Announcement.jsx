import styled from "styled-components"

const Container = styled.div`
    height: 30px;
    background-color: #C8935E;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
`

const Announcement = ({ announcement }) => {
  return (
    <Container>
      {announcement}
    </Container>
  );
};

export default Announcement;
