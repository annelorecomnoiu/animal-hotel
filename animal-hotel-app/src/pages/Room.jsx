import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import styled from "styled-components"
import { useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addRoom } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import  DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { differenceInCalendarDays } from "date-fns";
import moment from 'moment';
import { getCart, updateCart } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
    
`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`;

const ImageContainer = styled.div`
    flex: 1;
`;

const Image = styled.img`
    width: 100%;
    height: 85vh;
    object-fit: contain;
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 90px;
`;

const Title = styled.h1`
    font-weight: 200;
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`;


const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 12px;
    border: 2px solid #BF8E69;
    background-color:#C8935E;
    cursor: pointer;
    font-weight: 1000;
    color: white;
    margin-top: 200px;

    &:hover{
        background-color: #BF8E69;
    }
`;

const CalendarContainer = styled.div`
    width: 350px;
    height: 10px;
    background-color: white;
    position: absolute;
    bottom: 250px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    .react-datepicker__day--highlighted {
        background-color: #f0ad4e;
        color: white;
      }
`;

const Calendar = styled.div`
    width: 50%;
    height: 50%;
    background-color: white;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

const PeriodTitle = styled.h4`
    font-weight: bold;
`;

const Condition = styled.div`
   margin-top:20px;
`;


const Room = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [room, setRoom] = useState({});
    const dispatch = useDispatch();
    const [showCalendar, setShowCalendar] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const currentDate = new Date();
    const [datePairs, setDatePairs] = useState([[]]);
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    let firstUnavailableDate;
    const [datesSelected, setDatesSelected] = useState(false);
    const [showCondition, setShowCondition] = useState(false);


    const cart = useSelector(state => state.cart);

    useEffect(() => {
        const getRoom = async () => {
            try{
                const res = await publicRequest.get("/rooms/find/"+id);
                setRoom(res.data);
            } catch {}
        };
        getRoom();
    }, [id]);

    useEffect(() => {
        try{
            const pairs = room.availability.map(pair => {
            const startDate = moment(pair[0]).subtract(1, 'day').toDate();
            const endDate = moment(pair[1]).toDate();
            return [startDate, endDate];
            });
            setDatePairs(pairs);
        } catch {}
      }, [room?.availability]);

      const handleClick = () => {
        if (datesSelected === true) {
          if (user) {
            localStorage.setItem('startDate', startDate);
            if(startDate > endDate){
              localStorage.setItem('endDate', startDate);
              setEndDate(startDate);
            } else {
              localStorage.setItem('endDate', endDate);
            }
            dispatch(addRoom({ ...room }));
            let cartData = JSON.parse(localStorage.getItem('cart'));
            if (localStorage.getItem('cart').room === undefined) {
              cartData = JSON.parse(localStorage.getItem('cart'));
              cartData.room = cart.room;
              localStorage.setItem('cart', JSON.stringify(cartData));
            }
            updateCart(dispatch, cartData);
          } else {
            navigate("/login");
          }
        } else {
          setShowCondition(true);
        }
      };

      const handleDateChange = () => {
        if (startDate && endDate) {
          setDatesSelected(true);
        } else {
          setDatesSelected(false);
        }
        setShowCondition(false);
      };

    const excludeDateIntervals = datePairs.map(([startDate, endDate]) => ({
    start: new Date(startDate),
    end: new Date(endDate),
  }));

  const findFirstUnavailableDate = (date) => {
    const sortedIntervals = excludeDateIntervals.sort((a, b) => a.end - b.end);
    for (const interval of sortedIntervals) {
      if (interval.end > date) {
        return interval.end;
      }
    }
    return null;
  };
  firstUnavailableDate = findFirstUnavailableDate(startDate);

  return (
    <Container>
      <Navbar/>
      <Announcement announcement="You need to select a start date and an end date for your pet's stay at the hotel."/>
      <Wrapper>
        <ImageContainer>
            <Image src = { room.img }/>
        </ImageContainer>
        <InfoContainer>
            <Title>{ room.title }</Title>
            <Description>{ room.description }</Description>
            <Price>${ room.price } /day</Price>
            <CalendarContainer>
                        <Calendar>
                            <PeriodTitle>Choose start date: </PeriodTitle>
                            <DatePicker 
                            showIcon
                            selected={startDate}
                            selectsStart
                            onChange={(date) => { setStartDate(date); handleDateChange(); }}
                            startDate = {startDate}
                            endDate = {endDate} 
                            minDate = {currentDate}
                            excludeDateIntervals={excludeDateIntervals}
                            highlightDates={[
                                {
                                  "react-datepicker__day--highlighted": [
                                    startDate,
                                    ...Array.from(
                                      { length: differenceInCalendarDays(endDate, startDate) },
                                      (_, index) => new Date(startDate.getTime() + index * 86400000) // 86400000ms = 1 day
                                    ),
                                  ],
                                },
                              ]}
                              />
                        </Calendar>

                        <Calendar>
                            <PeriodTitle>Choose end date: </PeriodTitle>
                            <DatePicker
                            showIcon
                            selected={endDate}
                            selectsEnd
                            onChange={(date) => { setEndDate(date); handleDateChange(); }}
                            endDate = {endDate}
                            minDate = {startDate} 
                            maxDate = {firstUnavailableDate }
                            excludeDateIntervals={excludeDateIntervals}
                            highlightDates={[
                                {
                                  "react-datepicker__day--highlighted": [
                                    startDate,
                                    ...Array.from(
                                      { length: differenceInCalendarDays(endDate, startDate) },
                                      (_, index) => new Date(startDate.getTime() + index * 86400000) // 86400000ms = 1 day
                                    ),
                                  ],
                                },
                                {
                                    
                                }
                              ]}
                              />
                        </Calendar>
                    </CalendarContainer>
            <AddContainer>
                <Button onClick={handleClick}>RESERVE ROOM</Button>
            </AddContainer>
            <Condition>
            {showCondition && <p>Please select start date and end date.</p>}
            </Condition>
        </InfoContainer>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Room
