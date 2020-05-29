import React, { Component, useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import "./MessageForm.css";
import { Pending } from "../../../helpers";
import { actionCreateMessage, actionSaveMes } from "../../../actions";
import { store } from "../../../reducers";
import { CChatList } from "../ChatList/ChatList";

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
}) =>
  chats[_id] ? (
    <>
      <div className="block-chat-main">
        <Messages messages={chats[_id].messages} />
        <CNewMessage />
      </div>
    </>
  ) : (
    <Pending />
  );

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const value = this.state.value;
  };

  handleValueChange = (event) => {
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <>
        <form className="chat-message-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={this.state.value}
            onChange={this.handleValueChange}
            // onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null }
          />
          <button onClick={() => this.props.onMessage(this.state.value)}>
            Send
          </button>
        </form>
      </>
    );
  }
}

export const Messages = ({ messages }) =>
  messages ? (
    <>
      <div className="chat-message-list">
        {Object.values(messages).map((message) => (
          <Message message={message} key={message._id} />
        ))}
      </div>
    </>
  ) : (
    <Pending />
  );

const Message = ({ message }) => {
  return (
    <div className="message" key={message._id}>
      <div className="message-text">{message.text}</div>
      <div className="message-username">{message.owner.login}</div>
    </div>
  );
};

export const CMessagesList = connect((state) => ({
  chats: state.chats,
}))(MessagesList);

export const CNewMessage = connect(null, { onMessage: actionCreateMessage })(
  Input
);
