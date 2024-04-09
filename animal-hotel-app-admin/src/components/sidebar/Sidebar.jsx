import "./sidebar.css";
import {Bathtub, SingleBed, Restaurant, LineStyle, PermIdentity, AttachMoney } from "@material-ui/icons";
 import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3 className="sidebarTitle">Menu</h3>
            <ul className="sidebarList">
                <Link to="/" className="link">
                    <li className={`sidebarListItem ${location.pathname === "/home" ? "active" : ""}`}>
                        <LineStyle className="sidebarIcon"/>
                        Home
                    </li>
                </Link>

                <Link to="/users" className="link">
                <li className={`sidebarListItem ${location.pathname === "/users" ? "active" : ""}`}>
                    <PermIdentity className="sidebarIcon"/>
                    Users
                </li>
                </Link>
                <Link to="/rooms" className="link">
                <li className={`sidebarListItem ${location.pathname === "/rooms" ? "active" : ""}`}>
                    <SingleBed className="sidebarIcon"/>
                    Rooms
                </li>
                </Link>
                <Link to="/foods" className="link">
                <li className={`sidebarListItem ${location.pathname === "/foods" ? "active" : ""}`}>
                    <Restaurant className="sidebarIcon"/>
                    Foods
                </li>
                </Link>

                <Link to="/services" className="link">
                <li className={`sidebarListItem ${location.pathname === "/services" ? "active" : ""}`}>
                    <Bathtub className="sidebarIcon"/>
                    Services
                </li>
                </Link>

                <Link to="/reservations" className ="link">
                <li className={`sidebarListItem ${location.pathname === "/reservations" ? "active" : ""}`}>
                    <AttachMoney className="sidebarIcon"/>
                    Reservations
                </li>
                </Link>
                
            </ul>
        </div>
    
      </div>
    </div>
  )
}
