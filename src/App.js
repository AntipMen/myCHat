import React, { Component } from "react";
import "./index.css";
import { ChatMain } from "./сomponents/ChatPage/index";
import { Router, Switch, Redirect, Link } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { Provider, connect } from "react-redux";
import { store } from "./reducers";
import { CLoginForm } from "./сomponents/LoginPage";
import { Registration } from "./сomponents/RegisterPage";
import { CMessagesList } from "./сomponents/ChatPage/MessageForm/MessageForm";
import { NavigationLeftBar } from "./сomponents/ChatPage/ChatList/LeftBarNavigation";
import { CHeaderChat } from "./сomponents/ChatPage/MessageForm/HeaderMessageForm";
import { MainBlock } from "./сomponents/ChatPage";
import { CSearchResult } from "./saga";
import {
  CChatList,
  CreateNewChat,
  LeftNavigation,
} from "./сomponents/ChatPage/ChatList/ChatList";
import { MainPage } from "./helpers";
import { Nav } from "./сomponents/ChatPage/RightBar/RightBar";
import { Route } from "./reducers/routerReducer";
import { CUserInfo } from "./сomponents/ChatPage/ChatList/userInfo";

const Home = () => (
  <>
    <main className="main-block">
      <LeftNavigation />
      <div className="block-chat">
        <MainPage />
      </div>
      <Nav />
    </main>
  </>
);

const Header = () => (
  <>
    <header>
      <div className="header">
        <NavigationLeftBar />
        <CHeaderChat />
      </div>
    </header>
  </>
);

const AuthorizedUser = () => (
  <>
    <div className="page">
      <Header />
      <Switch>
        <Route exact path="/mychat" component={Home} />
        <Route path="/chat/:_id" component={CMessagesList} />
        <Route path="/user/:_id" component={CUserInfo} />
        <Redirect from="/" to="/mychat" />
      </Switch>
    </div>
  </>
);
const AnonUser = () => (
  <div>
    <Switch>
      <Route path="/" component={CLoginForm} exact />
      <Route path="/registration" component={Registration} exact />
    </Switch>
  </div>
);

const Content = connect((state) => ({
  logged: state.auth.jwt,
}))(({ logged }) => (!logged ? <AnonUser /> : <AuthorizedUser />));

const App = () => (
  <Provider store={store}>
    <Router history={createHistory()}>
      <Content />
    </Router>
  </Provider>
);

// const Main = () => (
//   <main>
//     <Switch>
//       <Route exact path="/mychat" component={Home} />
//       <Route path="/chat/:_id" component={CMessagesList} />
//     </Switch>
//   </main>
// );

// const App = () => (
//   <div>
//     <Provider store={store}>
//       <Router history={createHistory()}>
//         <Header />
//         <Main />
//       </Router>
//     </Provider>
//   </div>
// );

export default App;
