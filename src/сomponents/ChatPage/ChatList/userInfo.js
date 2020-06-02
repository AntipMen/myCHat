import React, { useState } from "react";
import "./ChatList.css";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import {
  UserAddOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LeftNavigation } from "./ChatList";
import { actionCreateNewChat } from "../../../actions";
import { MainPage, Pending } from "../../../helpers";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export const UserInfo = ({ users, id, auth, onCreate, newchat, min = 2 }) => {
  const [chatName, setChatName] = useState("");
  var error = {
    avatar: {
      _id: "5ed61ab0781b8d11e0707b4c",
      url: "images/5b07e2379e89c452787fba095ba6d0b0",
    },
    login: "Try again",
    _id: "error",
  };

  var userId = users ? users.find((user) => user._id === id) : error;
  console.log(userId);

  const valid = !(chatName.length < min);
  return (
    <>
      <LeftNavigation />
      <div className="block-user-info">
        <div className="block-close">
          {" "}
          <Link to="/mychat">
            <Button type="primary" icon={<CloseOutlined />} />
          </Link>
        </div>
        {userId ? (
          <>
            <div className="block-body">
              <div className="block-user-avatar">
                {" "}
                <img
                  src={
                    userId.avatar &&
                    `http://chat.fs.a-level.com.ua/${userId.avatar.url}`
                  }
                  width="200px"
                />
              </div>
              <div className="block-user-login">
                <h1>{userId.login}</h1>
              </div>
              {userId !== error ? (
                <>
                  <div className="block-navigation">
                    <Input
                      type="text"
                      placeholder="Chat name..."
                      value={chatName}
                      onChange={(event) => setChatName(event.target.value)}
                      style={{
                        border: !valid ? "solid 2px #f0999f" : "",
                      }}
                    />
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      onClick={() => onCreate(chatName, userId, auth)}
                      disabled={!valid}
                    >
                      <Link to={`/chat/${newchat._id}`}>Create New Chat</Link>
                    </Button>
                  </div>{" "}
                </>
              ) : null}
            </div>
          </>
        ) : (
          <Pending />
        )}
      </div>
    </>
  );
};

export const CUserInfo = connect(
  (state) => ({
    users: state.search.result,
    id: state.router.match.params._id,
    auth: state.auth.data.sub.id,
    newchat: state.chats,
  }),
  {
    onCreate: () => console.log("value"),
    // actionCreateNewChat
  }
)(UserInfo);
