import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.css";
import { Pending } from "../../../helpers";
import { CSearchResult } from "../../../saga";
import { formatDate } from "../../../helpers/time";
import { store } from "../../../reducers";
import { AvatarColors } from "../MessageForm/messageList/avatars";
import { actionActiveChat } from "../../../actions";
import { MessageCounter } from "../MessageForm/messageTake";
import { message } from "antd";

const ChatList = ({ chats, router, isMe }) => {
  let today = formatDate(new Date(), "dd-MM-yyyy HH:mm EEE");
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 5);
  tomorrow = formatDate(tomorrow, "dd-MM-yyyy HH:mm EEE");

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
              <ChatAvatar chat={chat} />
             
              <div className="name-chat">
                <h3>{chat.title != null ? chat.title : "No Name Сhat"}</h3>
                <div>
                  <span>
                    {chat.messages.lastMessage &&
                    chat.messages.lastMessage.owner._id === isMe ? (
                      <span>You:</span>
                    ) : (
                      <span>
                        {chat.messages.lastMessage &&
                          chat.messages.lastMessage.owner.login}
                        :{" "}
                      </span>
                    )}
                  </span>
                  <span>
                    {chat.messages.lastMessage &&
                      chat.messages.lastMessage.text.slice(0, 10) + "..."}
                  </span>
                </div>
              </div>
              <div className="time-chat">
                {chat.messages.lastMessage &&
                chat.messages.lastMessage.createdAt.slice(0, 11) ===
                  today.slice(0, 11) ? (
                  <span>
                    {chat.messages.lastMessage.createdAt.includes("T")
                      ? chat.messages.lastMessage.createdAt.substr(8, 5)
                      : chat.messages.lastMessage.createdAt.slice(11, 16)}
                  </span>
                ) : chat.messages.lastMessage &&
                  chat.messages.lastMessage.createdAt <= tomorrow ? (
                  <span>
                    {chat.messages.lastMessage &&
                      chat.messages.lastMessage.createdAt.slice(17, 20)}
                  </span>
                ) : (
                  <span>
                    {chat.messages.lastMessage &&
                      chat.messages.lastMessage.createdAt.slice(0, 11)}
                  </span>
                )}
              </div>
              <MessageCounter
                chatId={chat._id}
                activeChat={router}
                message={chat.messages.lastMessage}
                isMe={isMe}
              />
            </div>
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
  isMe: state.auth.data.sub.id,
}))(ChatList);

export const LeftNavigation = () => (
  <div className="block-users-list">
    <CSearchResult />
    <CChatList />
  </div>
);

export const ChatAvatar = ({ chat }) => {
  const { color, colorLighten } = AvatarColors(chat.title + "a");
  return chat.avatar != null ? (
    <img
      src={chat.avatar && `http://chat.fs.a-level.com.ua/${chat.avatar.url}`}
      width="50px"
      alt="avatar"
    />
  ) : (
    <span
      className="circle-min-chat"
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
      }}
    >
      {chat.title ? <h1>{chat.title.slice(0, 1)}</h1> : ""}
    </span>
  );
};
