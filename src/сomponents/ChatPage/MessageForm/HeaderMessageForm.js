import React, { Component } from "react";
import "./Header.css";
import "antd/dist/antd.css";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { CContactsModal } from "./contactModal";

const HeaderChat = ({ chats, id }) => {
  var chatId = chats
    ? Object.values(chats).find((chat) => chat._id === id)
    : {};
  console.log(chatId);
  return (
    <>
      {chatId ? (
        <div className="block-chat-header">
          <div>{chatId.title}</div>
          <span>{chatId.members.length} members</span>
          <div>
            <CContactsModal />
          </div>
        </div>
      ) : (
        <span>Welcome to myChat!</span>
      )}{" "}
    </>
  );
};

export const CHeaderChat = connect((state) => ({
  chats: state.chats,
  id: state.router && state.router.match && state.router.match.params._id,
}))(HeaderChat);
