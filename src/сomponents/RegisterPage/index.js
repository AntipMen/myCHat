import React, { Component } from "react";
import { Form, Button, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./index.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionLogin } from "../LoginPage";
import { actionFetch } from "../../reducers/PromiseReducer";
import { GQL } from "../../graphQL";
import girl from "./girl.png";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      nickname: "",
      check: false,
    };
  }
  render() {
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
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{ width: "450px", padding: "10px" }}
          >
            <input
              type="text"
              placeholder="Login..."
              value={this.state.login}
              onChange={(e) => this.setState({ login: e.target.value })}
              className="ant-input"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{ width: "450px" }}
          >
            <input
              type={this.state.check === false ? "password" : "text"}
              placeholder="Password..."
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
              className="ant-input"
            />
            <input
              type="checkbox"
              className="ant-input-suffix"
              checked={this.state.check}
              onClick={(event) =>
                this.setState({ check: event.target.checked })
              }
            />
          </Form.Item>

          <Form.Item
            name="nickname"
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
            style={{ width: "450px" }}
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <input
              className="ant-input"
              type="text"
              placeholder="Nickname..."
              value={this.state.nickname}
              onChange={(e) => this.setState({ nickname: e.target.value })}
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Link to="/mychat">
              <Button
                type="primary"
                htmlType="submit"
                onClick={() =>
                  this.props.onReg(
                    this.state.login,
                    this.state.password,
                    this.state.nickname
                  )
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
          </Form.Item>
          <Form.Item {...tailLayout}>
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
          </Form.Item>
        </Form>
      </div>
    );
  }
}

function actionRegister(login, password, nick) {
  return async (dispatch) => {
    let reg = await dispatch(
      actionFetch(
        "reg",
        GQL(
          `mutation reg($login: String, $password: String, $nick: String){
          UserUpsert(user: {login:$login, password: $password, nick: $nick})
          {_id 
            login
            nick
          }
      }`,
          { login, password, nick }
        )
      )
    );
    await dispatch(actionLogin(login, password));
  };
}

export const CRegistrationForm = connect(null, { onReg: actionRegister })(
  RegistrationForm
);
