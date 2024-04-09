import styled from "styled-components"
import Service from './Service'
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

  const Services = ({filters, sort}) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    const getServices = async () => {
      try{
        const res = await axios.get(`http://localhost:5000/api/services`);
        setServices(res.data);
      }catch(err){}
    };
    getServices();
  }, []);

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setFilteredServices(services);
    } else {
      setFilteredServices(
        services.filter(item =>
          Object.entries(filters).every(([key, value]) => {
            return item.categories.some(category => category === value);
          
          })
        )
      );
    }
  }, [services, filters]);
  
  useEffect(() => {
    if(sort === "asc"){
      setFilteredServices((prev) =>
        [...prev].sort((a,b) => a.price - b.price)
        );
    }else{
      setFilteredServices((prev) =>
        [...prev].sort((a,b) => b.price - a.price)
        );
    }
  }, [sort]);

  return (
    <Container>
      {filteredServices.map((item)=>(
        <Service item ={item} key={item._id}/>
      ))}
    </Container>
  )
}

export default Services
