import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../redux/apiCalls'
import { userRequest } from "../requestMethods";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();


  useEffect(() => {
    localStorage.setItem('cart', null);
    const firstLoad = localStorage.getItem("firstLoad");
    if (firstLoad === null) {
      localStorage.setItem("firstLoad", "true");
      window.location.reload();
    } else {
      localStorage.removeItem("firstLoad");
    }
  }, []);
  
  useEffect (()=>{ 
    if (user) {
      dispatch(getCart(user._id));
    }
  }, [user]);


  return (
    <div className="container">
        <Navbar/>
        <Slider/>
        <Categories/>
        <Footer/>
    </div>
  )
}

export default Home
