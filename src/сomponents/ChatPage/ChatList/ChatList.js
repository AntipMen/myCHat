import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./ChatList.css";
import { Pending } from "../../../helpers";
import { actionAllMessages, actionChatList } from "../../../actions";
import { MessagesList } from "../MessageForm/MessageForm";

import { CSearchResult } from "../../../saga";

const ChatList = ({ chats, ...props }) =>
  chats ? (
    <>
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

export const CreateNewChat = () => (
  <div className="create-chat">
    <button>Create New Chat</button>
  </div>
);

export const LeftNavigation = () => (
  <div className="block-users-list">
    <CSearchResult />
    <CChatList />
  </div>
);
