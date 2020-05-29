import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";
import {
  GQL,
  PromiseComponent,
  P,
  CError,
} from "../MainBlock/PromiseComponent";
import { message } from "antd";

const socket = io("http://chat.fs.a-level.com.ua/");
const MessageView = ({ payload }) => {
  return (
    <div
      style={{
        display: "flex",
        weight: "200px",
        height: "200px",
        border: "solid 1px black",
      }}
    >
      {payload.data.MessageUpsert.text}
    </div>
  );
};

const NewMessage = ({ onMessage, onSubmit }) => {
  const [message, setMessage] = useState("");
 
  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(message)
    setMessage("")
  };

  socket.on("msg", message => setMessage(message))

  return (
    <>
     {/* // <div onMessage={message => socket.on("msg", ViewMes(message))} /> */}
      <form onSubmit={submitHandler}>
        <input
          // className="text-message"
          placeholder="SendMessageForm"
          type="text"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button type="submit" onClick={() => onMessage(message)}>
          send1
        </button>
      </form>
      {/* <PromiseComponent
        Pending={P}
        Resolved={MessageView}
        Rejected={CError}
        promise={GQL(
          `mutation MesRedAll($text: String){
MessageUpsert (message: {
text: $text
chat: {
title: null
}
}){
_id
text
owner {
login
}
}
}`,
          { text: message }
        )}
      /> */}
    </>
  );
};

const ViewMes = ({message}) => <div>{message}</div>;
export { NewMessage, ViewMes };
