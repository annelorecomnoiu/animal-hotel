import styled from "styled-components"
import Room from './Room'
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;
const Rooms = ({filters, sort}) => {


  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      try{
        const res = await axios.get(`http://localhost:5000/api/rooms`);
        setRooms(res.data);
      }catch(err){}
    };
    getRooms();
  }, []);

  

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setFilteredRooms(rooms);
    } else {
      setFilteredRooms(
        rooms.filter(item =>
          Object.entries(filters).every(([key, value]) => {
            return item.categories.some(category => category === value);
          
          })
        )
      );
    }
  }, [rooms, filters]);


  useEffect(() => {
    if(sort === "asc"){
      setFilteredRooms((prev) =>
        [...prev].sort((a,b) => a.price - b.price)
        );
    }else{
      setFilteredRooms((prev) =>
        [...prev].sort((a,b) => b.price - a.price)
        );
    }
  }, [sort]);

  return (
    <Container>
      {filteredRooms.map((item)=>(
        <Room item ={item} key={item._id}/>
      ))}
    </Container>
  )
}

export default Rooms
