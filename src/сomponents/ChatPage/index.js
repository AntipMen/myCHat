import React, { Component } from "react";
import "./index.css";
import { Nav } from "./RightBar/RightBar";
import { CChatList, CreateNewChat } from "./ChatList/ChatList";
import { MainPage, Header } from "../../helpers";
import { CSearchResult } from "../../saga";
import { NavigationLeftBar } from "./ChatList/LeftBarNavigation";
import { NavigationCenterBar } from "./MessageForm/HeaderMessageForm";

// export class ChatMain extends Component {
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
//       <>
//         <div className="header">
//           <NavigationLeftBar />
//           <NavigationCenterBar />
//           <button
//             className="ant-btn ant-btn-primary ant-btn-icon-only"
//             onClick={this.handleToggleClick}
//           >
//             {this.state.showWarning ? ">" : "<"}
//           </button>
//         </div>
//         <MainBlock warn={this.state.showWarning} />
//       </>
//     );
//   }
// }

// export const MainBlock = ({ warn }) => (
//   <main className="main-block">
//     <div className="block-users-list">
//       <CSearchResult />
//       <CChatList />
//       <CreateNewChat />
//     </div>
//     <div className="block-chat">
//       <MainPage />
//     </div>

//     <Nav warn={warn} />
//   </main>
// );
