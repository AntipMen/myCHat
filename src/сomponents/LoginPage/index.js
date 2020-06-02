import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { Component } from "react";
import "antd/dist/antd.css";
import "./index.css";
import alien from "./alien.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionFetch } from "../../reducers/PromiseReducer";
import { GQL } from "../../graphQL";
import {
  actionAuthLogin,
  actionChatList,
  actionSaveChat,
  actionUser,
} from "../../actions";
import { store } from "../../reducers";
import { Pending } from "../../helpers";

class LoginForm extends Component {
  state = {
    login: "",
    password: "",
  };
  render() {
    const valid = true;

    return (
      <div className="main-block">
        <div className="block-login">
          <form className="block-login-form">
            <img src={alien} alt="page" />
            <h1>Sign in MyChat</h1>
            <div className="block-login-form-input">
              <div>
                <span className="form" aria-hidden="true">
                  <UserOutlined />
                </span>
                <input
                  className="ant-input"
                  value={this.state.login}
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Login..."
                  value={this.state.login}
                  onChange={(e) => this.setState({ login: e.target.value })}
                />
              </div>
              <div>
                <span className="form" aria-hidden="true">
                  <LockOutlined className="site-form-item-icon" />
                </span>
                <input
                  className="ant-input"
                  value={this.state.password}
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password..."
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
            </div>
          </form>
          <div className="block-login-button">
            <Button
              type="primary"
              htmlType="submilogin-formt"
              className="login-button"
              onClick={() =>
                this.props.onLogin(this.state.login, this.state.password)
              }
            >
              <Link to="/mychat">Sign in</Link>
            </Button>
            <span>New to MyChat?</span>
            <Button type="primary" htmlType="submit" className="registr-button">
              <Link to="/registration"> Create an account</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export function actionLogin(login, password) {
  //debugger;
  return async (dispatch) => {
    let token = await dispatch(
      actionFetch(
        "login",
        GQL(
          `query login($login: String, $password: String){
            login(login: $login, password: $password)
        }`,
          { login, password }
        )
      )
    );
    dispatch(actionAuthLogin(token.data.login));
  };
}
if (store.auth.jwt) {
            store.dispatch(actionChatList(store.getState()))} return {}
store.dispatch(actionUser(store.getState()));

const mapStateToProps = (state) => ({
  login: state.auth.data && state.auth.data.sub.login,
});

const UserName = ({ login }) =>
  login ? <a href="/dashboard">{login}</a> : <span>Anon</span>;

export const CUserName = connect(mapStateToProps)(UserName);

export const CLoginForm = connect(null, {
  onLogin: actionLogin,
})(LoginForm);

// const CLog = connect((state) => ({ cart: state.cart }), {
//   onLogin: actionAuthLogin,
//   onLogout: actionAuthLogout,
// })(LoginForm);
