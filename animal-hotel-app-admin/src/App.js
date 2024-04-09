import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  useLocation,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import ServiceList from "./pages/serviceList/ServiceList";
import Service from "./pages/service/Service";
import NewService from "./pages/newService/NewService";
import RoomList from "./pages/roomList/RoomList";
import Room from "./pages/room/Room";
import NewRoom from "./pages/newRoom/NewRoom";
import FoodList from "./pages/foodList/FoodList";
import Food from "./pages/food/Food";
import NewFood from "./pages/newFood/NewFood";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import ReservationList from "./pages/reservationList/ReservationList";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const showTopbarAndSideBar = location.pathname !== '/login';
  const user = useSelector((state) => state.user.currentUser);
  let admin = user ? user.isAdmin : false;

  return (
    <>
      {showTopbarAndSideBar && <Topbar /> }
      <div className="container">
      {showTopbarAndSideBar && <Sidebar /> }
        <Routes>
          {admin && 
          <>
          <Route path="/home" element={<Home />} /> 
          <Route path="/users" element={<UserList />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/rooms/:roomId" element={<Room />} />
          <Route path="/newRoom" element={<NewRoom />} />
          <Route path="/foods" element={<FoodList />} />
          <Route path="/foods/:foodId" element={<Food />} />
          <Route path="/newFood" element={<NewFood />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:foodId" element={<Service/>} />
          <Route path="/newService" element={<NewService />} />
          <Route path="/reservations" element={<ReservationList />} />
          </>
          }
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;