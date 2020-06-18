import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.css";
import { Pending } from "../../../helpers";
import { CSearchResult } from "../../../saga";

const ChatList = ({ chats, router }) => {
  return chats ? (
    <>
      <div className="chats-list">
        {Object.values(chats).map((chat) => (
          <Link to={`/chat/${chat._id}`} key={chat._id}>
            {" "}
            <div
              className={chat._id === router ? "selected-chat" : "chat"}
              key={chat._id}
              chat={chat}
            >
              {chat.avatar != null ? (
                <img
                  src={
                    chat.avatar &&
                    `http://chat.fs.a-level.com.ua/${chat.avatar.url}`
                  }
                  width="50px"
                  alt="avatar"
                />
              ) : (
                <span className="circle-min-chat">
                  {chat.title ? <h1>{chat.title.slice(0, 1)}</h1> : ""}
                </span>
              )}
              <h3>{chat.title}</h3>
            </div>{" "}
          </Link>
        ))}
      </div>
    </>
  ) : (
    <Pending />
  );
};

export const CChatList = connect((state) => ({
  chats: state.chats,
  router: state.router.match.params._id,
}))(ChatList);

export const LeftNavigation = () => (
  <div className="block-users-list">
    <CSearchResult />
    <CChatList />
  </div>
);
