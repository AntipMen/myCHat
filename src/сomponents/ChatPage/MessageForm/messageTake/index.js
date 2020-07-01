import React, { useEffect, useState } from "react";
import { Badge } from "antd";
import "./index.css";
import { formatDate } from "../../../../helpers/time";

export const MessageCounter = ({ message, chatId, activeChat, isMe }) => {
  const [counter, setCounter] = useState(0);
  let today = formatDate(new Date(), "yyyy-MM-dd HH:mm");
  const chatWithNewMes = message && message.chat ? message.chat._id : null;
  const owner = message && message.owner._id;

  useEffect(() => {
    if (
      message !== undefined &&
      message._id &&
      chatWithNewMes === chatId &&
      owner !== isMe
    ) {
      setCounter((counter) => counter + 1);
    }
  }, [message && message._id, isMe, chatId, chatWithNewMes, owner]);

  useEffect(() => {
    if (chatId === activeChat) {
      setCounter(0);
    }
  }, [activeChat, chatId]);
  useEffect(() => {
    if (message && message.createdAt < today) {
      setCounter(0);
    }
  }, [today, message && message.createdAt]);
  return (
    <>
      {counter > 0 && chatWithNewMes !== activeChat && owner !== isMe && (
        <div className="badge">
          <Badge count={counter}>
            <span href="#" className="head-example"></span>
          </Badge>
        </div>
      )}
    </>
  );
};
