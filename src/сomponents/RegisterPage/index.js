import React, { useState } from "react";
import { Form, Button } from "antd";
import "./index.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import girl from "./girl.png";
import { actionRegister, actionLogin } from "../../actions";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const RegistrationForm = ({ onReg, onAuth }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [check, setCheck] = useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="form-registr">
      <div className="form-logo">
        <img src={girl} alt="page" />
        <span>Join MyChat</span>
        <h1>Create your account</h1>
      </div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="form-reg-main"
        style={{ width: "450px" }}
      >
        <input
          type="text"
          placeholder="Login..."
          value={login}
          onChange={(event) => setLogin(event.target.value)}
          className="ant-input"
        />
        <span className="input-checkbox">
          <input
            type={check === false ? "password" : "text"}
            placeholder="Password..."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="ant-input"
          />
          <input
            type="checkbox"
            className="ant-input-suffix"
            checked={check}
            onChange={(event) => setCheck(event.target.checked)}
          />
        </span>
        <input
          className="ant-input"
          type="text"
          placeholder="Nickname..."
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />

        <Link to="/mychat">
          <Button
            type="primary"
            htmlType="submit"
            onClick={() =>
              onReg(login, password, nickname) && onAuth(login, password)
            }
            style={{
              width: "250px",
              height: " 40px",
              margin: "0 10px 5px",
            }}
          >
            Create account
          </Button>
        </Link>

        <Link to="/">
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "#b37feb",
              width: "250px",
              height: " 40px",
              margin: "0 10px 5px",
            }}
          >
            Sign in
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export const CRegistrationForm = connect(null, {
  onReg: actionRegister,
  onAuth: actionLogin,
})(RegistrationForm);
