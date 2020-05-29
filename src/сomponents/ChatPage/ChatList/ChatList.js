import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./ChatList.css";
import { Pending } from "../../../helpers";
import { actionAllMessages, actionChatList } from "../../../actions";
import { MessagesList } from "../MessageForm/MessageForm";

const ChatList = ({ chats }) =>
  chats ? (
    <>
      {console.log(chats)}
      <div className="chats-list">
        {Object.values(chats).map((chat) => (
          <div className="chat" key={chat._id} chat={chat}>
            <Link to={`/chat/${chat._id}`}>
              {chat.title}
              {/* {chat._id.length > 1 ? `${chat.title}` : null} */}
            </Link>
          </div>
        ))}
      </div>
    </>
  ) : (
    <Pending />
  );

export const CChatList = connect((state) => ({
  chats: state.chats,
}))(ChatList);
