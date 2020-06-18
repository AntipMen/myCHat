import React from "react";
import "./index.css";
import { Home, Header } from "./сomponents/ChatPage";
import { Router, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider, connect } from "react-redux";
import { store } from "./reducers";
import { CLoginForm } from "./сomponents/LoginPage";
import { CRegistrationForm } from "./сomponents/RegisterPage";
import { CMessagesList } from "./сomponents/ChatPage/MessageForm";
import { Route } from "./reducers/routerReducer";
import { CUserInfo } from "./сomponents/ChatPage/ChatList/userInfo";

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
      <Route path="/registration" component={CRegistrationForm} exact />
      <Redirect from="/mychat" to="/" />
    </Switch>
  </div>
);

const Content = connect((state) => ({
  logged: state.auth.jwt,
}))(({ logged }) => (!logged ? <AnonUser /> : <AuthorizedUser />));

const App = () => (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <Content />
    </Router>
  </Provider>
);

export default App;
