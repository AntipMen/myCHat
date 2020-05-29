import React, { Component } from "react";
import { ChatMain } from "./сomponents/ChatPage/index";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { Provider, connect } from "react-redux";
import { store } from "./reducers";
import { CLoginForm } from "./сomponents/LoginPage";
import { Registration } from "./сomponents/RegisterPage";
import { CMessagesList } from "./сomponents/ChatPage/MessageForm/MessageForm";

const AuthorizedUser = () => (
  <div>
    <Switch>
      {/* <Redirect from='/mychat' to='/' /> */}
      <Route path="/mychat" component={ChatMain} exact />
      <Route path="/chat/:_id" component={CMessagesList} exact />
    </Switch>
  </div>
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

export default App;
