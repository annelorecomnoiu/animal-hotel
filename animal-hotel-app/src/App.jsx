import Home from "./pages/Home"
import RoomList from "./pages/RoomList";
import Room from "./pages/Room";
import FoodList from "./pages/FoodList";
import Food from "./pages/Food";
import ServiceList from "./pages/ServiceList";
import Service from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import AboutUs from "./pages/AboutUs";


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {

    const user = useSelector((state) => state.user.currentUser);

    return(
    <Router>
        <Routes>

          <Route exact path="/" element={ <Home/> }></Route>

          <Route path="/rooms" element={<RoomList/>}></Route>

          <Route path="/rooms/:category" element={<RoomList/>}></Route>

          <Route path="/room/:id" element={<Room/>}></Route> 

          <Route path="/foods" element={<FoodList/>}></Route>

          <Route path="/foods/:category" element={<FoodList/>}></Route>

          <Route path="/food/:id" element={<Food/>}></Route> 
          
          <Route path="/services" element={<ServiceList/>}></Route>

          <Route path="/services/:category" element={<ServiceList/>}></Route>

          <Route path="/service/:id" element={<Service/>}></Route> 

          <Route path="/success" element={<Success/>}></Route> 

          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>

          <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>}></Route>

          <Route path="/cart" element={<Cart/>}></Route>

          <Route path="/aboutUs" element={<AboutUs/>}></Route>
          
        </Routes>
    </Router>
)};

export default App;