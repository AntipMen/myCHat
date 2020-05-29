import React, { Component } from "react";
import "../Styles/HeaderStyle.css";
import { Link } from "react-router-dom";

class HeaderBar extends Component {
  render() {
    return (
      <header className="Header">
        <Link to="/">Home</Link>
        <Link to="/authorization">Authorization</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/chatMain">ChatMain</Link>
      </header>
    );
  }
}

export { HeaderBar };
