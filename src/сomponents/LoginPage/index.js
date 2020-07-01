import { Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import alien from "./alien.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionLogin } from "../../actions";

import { CInvalidMessageForSignIn } from "../RegisterPage/valid";

const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
                value={login}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Login..."
                onChange={(event) => setLogin(event.target.value)}
              />
            </div>
            <div>
              <span className="form" aria-hidden="true">
                <LockOutlined className="site-form-item-icon" />
              </span>
              <input
                className="ant-input"
                value={password}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password..."
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>
        </form>
        <div className="block-login-button">
          <CInvalidMessageForSignIn />

          <Button
            type="primary"
            htmlType="submilogin-formt"
            className="login-button"
            onClick={() => onLogin(login, password)}
          >
            <Link to="/mychat">Sign in</Link>
          </Button>
          <span>New to MyChat?</span>
          <Button
            type="primary"
            htmlType="submit"
            className="registr-button"
            style={{ backgroundColor: "#b37feb" }}
          >
            <Link to="/registration"> Create an account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CLoginForm = connect(null, {
  onLogin: actionLogin,
})(LoginForm);
