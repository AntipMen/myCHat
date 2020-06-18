import React, { useState } from "react";
import "./index.css";
import "antd/dist/antd.css";
import { Input, Button } from "antd";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { LeftNavigation } from "./index";
import { Pending } from "../../../helpers";
import { actionCreateNewChat, actionChatList } from "../../../actions";
import { store } from "../../../reducers";

export const UserInfo = ({ users, id, auth, onCreate, min = 2, onLoading }) => {
  const [chatName, setChatName] = useState("");
  var error = {
    avatar: {
      _id: "5ed61ab0781b8d11e0707b4c",
      url: "images/5b07e2379e89c452787fba095ba6d0b0",
    },
    login: "Try again...",
    _id: "error",
  };

  var userId = users ? users.find((user) => user._id === id) : error;

  const valid = !(chatName.length < min);
  return (
    <>
      <LeftNavigation />
      <div className="block-user-info">
        <div className="block-close">
          {" "}
          <Link to="/mychat">
            <Button
              type="primary"
              onClick={() => onLoading(store.getState())}
              icon={<CloseOutlined />}
            />
          </Link>
        </div>
        {userId ? (
          <>
            <div className="block-body">
              <div className="block-user-avatar">
                {userId.avatar != null ? (
                  <img
                    src={
                      userId.avatar &&
                      `http://chat.fs.a-level.com.ua/${userId.avatar.url}`
                    }
                    width="250px"
                    alt="avatar"
                  />
                ) : (
                  <span className="circle">
                    <h1>{userId.login.slice(0, 1)}</h1>
                  </span>
                )}
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
                      onClick={() => onCreate(userId, auth, chatName)}
                      disabled={!valid}
                    >
                      Create New Chat
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
  }),
  {
    onCreate: actionCreateNewChat,
    onLoading: actionChatList,
  }
)(UserInfo);
