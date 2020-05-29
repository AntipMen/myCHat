import React, { Component, useState, useEffect } from "react";
import { GQL, PromiseComponent, P, CError } from "./PromiseComponent";
import io from "socket.io-client";

const socket = io("http://chat.fs.a-level.com.ua/");

// class MessageOne extends Component {
//   render() {
//     return <div>{this.props.value}</div>;
//   }
// }

// socket.on("msg", () => MessageOne);

// function Come() {
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const socket = io("http://chat.fs.a-level.com.ua/");
//     socket.on("msg", (data) => {
//       setMessage(data);
//     });
//   }, []);

//   return <div message={message}>{message}</div>;
// }

const NewInput = ({ onMessage }) => {
  const [message, setMessage] = useState("");

  function submitHandler(event) {
    event.preventDefault();
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          // className="text-message"
          placeholder="SendMessageForm"
          type="text"
          onChange={(event) => setMessage(event.target.value)}
          value={message}
        />
        <button onClick={() => onMessage(message)} type="submit">
          Send2
        </button>
      </form>
    </>
  );
};

const Container = ({message}) => {
  const [mes, setMes] = useState("");
  useEffect(() => {
    const socket = io("http://chat.fs.a-level.com.ua/");
    socket.on("msg", (data) => {
      setMes(data);
    });
  }, []);
  return (
    <div style={{ border: "solid 1px black" }} message={message}>
      {message}
    </div>
  );
};

export { NewInput, Container };
