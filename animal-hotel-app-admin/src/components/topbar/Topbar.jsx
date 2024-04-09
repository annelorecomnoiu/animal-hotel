import React from 'react';
import "./topbar.css";
import { ExitToApp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '../../redux/apiCalls';

export default function Topbar() {
    const dispatch = useDispatch();

    const handleClick = () => {
         logout(dispatch);
    };

   
  return (
    <div className="topbar">
        <div className="topbarWrapper">
        <img src="https://www.freepnglogos.com/uploads/lion-png/lion-images-png-impremedia-25.png" alt="" className="topAvatar" />
            <div className="topLeft">
                <span className="logo">ASLAN'S PET HOUSE ADMIN</span>
            </div>
            <div className="topRight">
            <div className="logout">Logout</div>
            <Link to="/login" className="link">
                <div className="topbarIconContainer">
                    <ExitToApp onClick={handleClick}/>
                </div>
            </Link>
            </div>
        </div>
    </div>
  )
}
