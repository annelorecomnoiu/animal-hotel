import styled from "styled-components"
import Food from './Food'
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const Foods = ({filters, sort}) => {


  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    const getFoods = async () => {
      try{
        const res = await axios.get(`http://localhost:5000/api/foods`);
        setFoods(res.data);
      }catch(err){}
    };
    getFoods();
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setFilteredFoods(foods);
    } else {
      setFilteredFoods(
        foods.filter(item =>
          Object.entries(filters).every(([key, value]) => {
            return item.categories.some(category => category === value);
          
          })
        )
      );
    }
  }, [foods, filters]);
  
  
  


  useEffect(() => {
    if(sort === "asc"){
      setFilteredFoods((prev) =>
        [...prev].sort((a,b) => a.price - b.price)
        );
    }else{
      setFilteredFoods((prev) =>
        [...prev].sort((a,b) => b.price - a.price)
        );
    }
  }, [sort]);

  return (
    <Container>
      {filteredFoods.map((item)=>(
        <Food item ={item} key={item._id}/>
      ))}
    </Container>
  )
}

export default Foods
