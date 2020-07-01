import React from "react";
import boyDog from "./boyDog.svg";
import "./index.css";

export const Pending = () => (
  <img
    src="https://flevix.com/wp-content/uploads/2019/07/Spin-Preloader.gif"
    alt="loading"
    height="700px"
  />
);

export const MainPage = () => (
  <div className="main-page">
    <img src={boyDog} alt="page" />
    <h3>Please select a chat to start messaging </h3>
  </div>
);
