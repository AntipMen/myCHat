import React, { useEffect, useState } from "react";
import { Badge } from "antd";
import "./index.css";

export const MessageCounter = ({ message, chatId, activeChat, isMe }) => {
  console.log(message, chatId, activeChat);
  const [counter, setCounter] = useState(0);
  const chatWithNewMes = message && message.chat ? message.chat._id : null;
  const owner = message && message.owner._id;
  console.log(owner, isMe);
  useEffect(() => {
    if (
      message &&
      chatWithNewMes === chatId &&
      chatId !== activeChat &&
      owner !== isMe
    ) {
      setCounter(counter + 1);
    }
    if (chatId === activeChat) {
      setCounter(0);
    }
  }, [message, activeChat]);
  return (
    <>
      {counter > 0 && (
        <div className="badge">
          <Badge count={counter}>
            {}
            <a href="#" className="head-example" />
          </Badge>
        </div>
      )}
    </>
  );
};
