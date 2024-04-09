import styled from "styled-components"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Rooms from '../components/Rooms'
import { useLocation } from "react-router-dom"
import { useState } from "react"

const Container = styled.div`
    
`;
const Title = styled.h1`
    margin: 20px;
`;
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const Filter = styled.div`
    margin: 20px;
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
`;

const Option = styled.option`
    
`;

const RoomList = () => {
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("no");

    const handleFilters = (e) => {
        const name = e.target.name;
        const value = e.target.value;
      
        if (name === "sort" && value === "no") {
            setSort("");
        } else if (value === "All") {
          const updatedFilters = { ...filters };
          delete updatedFilters[name];
          setFilters(updatedFilters);
        } else {
          setFilters({
            ...filters,
            [name]: value,
          });
        }
      };
    
    return (
        <Container>
        <Navbar/>
        <Title>Rooms</Title>
        <FilterContainer>
            <Filter>
                <FilterText> Filter Rooms: </FilterText>
                <Select name="petType" onChange={handleFilters}>
                    <Option>All</Option>
                    <Option>cat</Option>
                    <Option>dog</Option>
                    <Option>bird</Option>
                    <Option>rabbit</Option>
                    <Option>hamster</Option>
                    <Option>other</Option>
                </Select>
                <Select name="capacity" onChange={handleFilters}>
                    <Option>All</Option>
                    <Option>1</Option>
                    <Option>2</Option>
                    <Option>3</Option>
                    <Option>4</Option>
                    <Option>5</Option>
                </Select>
            </Filter>
            <Filter>
                <FilterText> Sort Rooms: </FilterText>
                <Select onChange={e => setSort(e.target.value)}>
                    <Option value="no"> No </Option>
                    <Option value="asc"> Price (asc) </Option>
                    <Option value="desc"> Price (desc) </Option>
                </Select>
            </Filter>
        </FilterContainer>
        <Rooms filters={filters} sort={sort}/>
        <Footer/>
        </Container>
    )
}

export default RoomList