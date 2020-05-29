import React, { Component } from "react";
import "./Header.css";
import {RightBar} from "../RightBar/RightBar"


export const NavigationCenterBar = () => (
  <div className="block-chat-header">
    <div>Name chat</div>
    <div>Menu</div>
   {/* // <Page /> */}
  </div>
);

// const NavigationBar = (props) => {
//   if (!props.warn) {
//     return null;
//   }
//   return <div className="block-bar">Warning!</div>;
// };

// class Page extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { showWarning: false };
//     this.handleToggleClick = this.handleToggleClick.bind(this);
//   }

//   handleToggleClick() {
//     this.setState((prevState) => ({
//       showWarning: !prevState.showWarning,
//     }));
//   }

//   render() {
//     return (
//       <div>
//         <NavigationBar warn={this.state.showWarning} />
//         <button className="nav-button" onClick={this.handleToggleClick}>
//           {this.state.showWarning ? "Hide" : "Show"}
//         </button>
//       </div>
//     );
//   }
// }

