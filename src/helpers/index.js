import React from "react";
import boyDog from "./boyDog.svg";
//import logo from "../logo.svg";
import "./index.css";
import NavigationLeftBar from "../сomponents/ChatPage/ChatList/LeftBarNavigation";
import { NavigationCenterBar } from "../сomponents/ChatPage/MessageForm/HeaderMessageForm";
import { All } from "../сomponents/ChatPage/RightBar/RightBar";

export const Pending = () => (
  <img
    src="https://flevix.com/wp-content/uploads/2019/07/Spin-Preloader.gif"
    alt="loading"
  />
);

export const MainPage = () => (
  <div className="main-page">
    <img src={boyDog} alt="page" />
    <h3>Please select a chat to start messaging </h3>
  </div>
);

export const Header = () => (
  <div className="header">
    <NavigationLeftBar />
    <NavigationCenterBar />
    {/* <RightBar /> */}
 
  </div>
);
