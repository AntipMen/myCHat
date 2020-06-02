import React, { Component, useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import "./MessageForm.css";
import { Button } from "antd";
import { Pending } from "../../../helpers";
import {
  actionCreateMessage,
  actionSaveMes,
  actionMedia,
} from "../../../actions";
import { store } from "../../../reducers";
import { LeftNavigation } from "../ChatList/ChatList";

import { CMedia } from "./upload";

import { SmileOutlined } from "@ant-design/icons";

import { Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const socket = io("http://chat.fs.a-level.com.ua/");
if (localStorage.authToken) socket.emit("jwt", localStorage.authToken);

socket.on("jwt_ok", (data) => console.log(data));
socket.on("jwt_fail", (error) => console.log(error));

socket.on("msg", (message) => store.dispatch(actionSaveMes(message)));

const MessagesList = ({
  chats,
  match: {
    params: { _id },
  },
  auth,
}) =>
  chats[_id] ? (
    <>
      <main className="main-block">
        <LeftNavigation />
        <div className="block-chat">
          <div className="block-chat-main">
            <Messages messages={chats[_id].messages} auth={auth} />
            <CNewMessage />
          </div>
        </div>
      </main>
    </>
  ) : (
    <Pending />
  );

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      showEmoji: false,
    };
    this.handleEmojiClick = this.handleEmojiClick.bind(this);
  }

  handleEmojiClick() {
    this.setState((prevState) => ({
      showEmoji: !prevState.showEmoji,
    }));
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const value = this.state.value;
  };

  handleValueChange = (event) => {
    this.setState({ value: event.target.value });
  };
  addEmoji = (e) => {
    let emoji = e.native;
    this.setState({
      value: this.state.value + emoji,
    });
  };

  addMedia = (e) => {
    console.log(e);
  };
  render() {
    return (
      <>
        <form className="chat-message-form" onSubmit={this.handleSubmit}>
          {this.state.showEmoji && (
            <div className="block-emoji">
              <Picker
                onSelect={this.addEmoji}
                emojiTooltip={true}
                title="weChat"
              />
            </div>
          )}
          <Button
            type="primary"
            shape="circle"
            onClick={this.handleEmojiClick}
            style={{
              backgroundColor: this.state.showEmoji ? "blue" : "red",
            }}
          >
            <SmileOutlined />
          </Button>
          <input
            type="text"
            placeholder="Type a message..."
            value={this.state.value}
            onChange={this.handleValueChange}
            // onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null }
          />

          <button
            onClick={() =>
              this.props.onMessage(this.state.value, this.props.id)
            }
          >
            Send
          </button>
          <CMedia {...this.props} />
          {/* <AudioMessage /> */}
        </form>
      </>
    );
  }
}

export const Messages = ({ messages, auth }) =>
  messages ? (
    <>
      <div className="chat-messages-list">
        {Object.values(messages).map((message) => (
          <Message message={message} key={message._id} auth={auth} />
        ))}
      </div>
    </>
  ) : (
    <Pending />
  );

const Message = ({ message, auth }) => {
  console.log(auth);
  return (
    <>
      <div
        className={message.owner.login === auth ? "message" : "partner"}
        key={message._id}
      >
        <div className="message-text">
          {reactStringReplace(message.text, (emoji, props) => (
            <Emoji
              emoji={emoji}
              set="apple"
              size={20}
              fallback={
                ((emoji, props) => {
                  console.log(emoji, props);
                },
                emoji ? `${emoji.native}` : props.emoji)
              }
            />
          ))}

          <div>
            {message.media != null ? (
              <img
                src={
                  message.media &&
                  `http://chat.fs.a-level.com.ua/${message.media[0].url}`
                }
                width="200px"
              />
            ) : null}
          </div>
        </div>
        <div className="message-username">{message.owner.login}</div>
        {/* <span>{message.createdAt}</span> */}
      </div>
    </>
  );
};

export const CMessagesList = connect((state) => ({
  chats: state.chats,
  auth: state.auth.data && state.auth.data.sub.login,
}))(MessagesList);

export const CNewMessage = connect(
  (state) => ({
    id: state.router && state.router.match && state.router.match.params._id,
  }),
  { onMessage: actionCreateMessage }
)(Input);
