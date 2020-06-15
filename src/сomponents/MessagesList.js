import React, { Component } from "react";
import "./MainStylesAll.css";
import { GQL, PromiseComponent, P, CError } from "./PromiseComponent";
import io from "socket.io-client";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";

// const socket = io("http://chat.fs.a-level.com.ua/");

// const MessageOne = (props) => <div>{this.props.value}</div>;

// socket.on("msg", () => MessageOne(props));

class MessagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: "",
    };
  }

  render() {
    return (
      <>
        <div className="message-list">
          {this.props.payload.data.MessageFind.map((message) => (
            <div
              className="message"
              key={message._id}
              // text={message.text}
              // from={message.owner.login}
            >
              <div className="message-text">{message.text}</div>
              <div className="message-username">{message.owner.login}</div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

const BlockMessegesList = () => (
  <>
    <div className="block-message-list">
      <PromiseComponent
        Pending={P}
        Resolved={MessagesList}
        Rejected={CError}
        promise={GQL(
          `query mesF($q: String){
  MessageFind(query: $q) {
    _id
    owner {
      _id
      login
    }
    createdAt
    chat {
      _id
      title
    }
    text
  }
}`,
          { q: JSON.stringify([{}, { limit: [50], skip: [850] }]) }
        )}
      />
    </div>
  </>
);

export default BlockMessegesList;
