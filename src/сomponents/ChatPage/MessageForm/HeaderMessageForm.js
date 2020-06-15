import React from "react";
import "./Header.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { CContactsModal } from "./contactModal";
import { Link } from "react-router-dom";

const HeaderChat = ({ chats, id, auth }) => {
  var chatId = chats
    ? Object.values(chats).find((chat) => chat._id === id)
    : {};
  let nick = auth.data.sub.login;

  return (
    <>
      {chatId ? (
        <div className="block-chat-header">
          <div className="chat-name">
            <h3>{chatId.title}</h3>
            <span>{chatId.members.length} members</span>
            <span>Online: {auth.status === "online" ? nick : "0"}</span>
          </div>
          <div className="button">
            <CContactsModal />
          </div>
        </div>
      ) : (
        <h2
          style={{
            textAlign: " left",
            margin: "0 20px 0",
            textDecoration: "none",
            color: "white",
          }}
        >
          <Link to="/mychat" style={{ textDecoration: "none", color: "white" }}>
            Welcome to myChat, {nick}!
          </Link>
        </h2>
      )}{" "}
    </>
  );
};

export const CHeaderChat = connect((state) => ({
  chats: state.chats,
  id: state.router && state.router.match && state.router.match.params._id,
  auth: state.auth,
}))(HeaderChat);
