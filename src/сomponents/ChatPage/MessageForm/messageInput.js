import React, { Component, useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./MessageForm.css";
import { Button, Input, Popover } from "antd";
import {
  actionCreateMessage,
  actionReply,
  actionForward,
  actionMedia,
} from "../../../actions";
import { CMedia } from "./upload";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { CReplyToMessage } from "./replyMessage";
import { CForwardMessage } from "./forwardChats";

const InputMessage = ({
  message,
  id,
  onMessage,
  onReply,
  onForward,
  onMedia,
}) => {
  const [value, setValue] = useState("");
  const [size, setSize] = useState("large");

  let handleSubmit = (event) => {
    event.preventDefault();

    setValue("");
  };

  const addEmoji = (emoji) => {
    setValue(value + emoji.native);
  };

  return (
    <>
      {message.type === "reply" ? <CReplyToMessage message={message} /> : null}
      {message.type === "forward" ? (
        <CForwardMessage message={message} />
      ) : null}
      <div className="chat-footer">
        <Popover
          style={{ position: "relative" }}
          placement="topLeft"
          content={
            <div className="block-emoji">
              <Picker onSelect={addEmoji} emojiTooltip={true} title="weChat" />
            </div>
          }
          trigger="hover"
        >
          <Button
            type="submit"
            shape="circle"
            icon={<SmileOutlined className="icon-emoji" />}
            style={{
              margin: "10px ",
              minHeight: "42px",
              minWidth: "42px",
            }}
          />
        </Popover>
        <form className="chat-message-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Type a message..."
            autoSize={{ minRows: 1.5, maxRows: 6 }}
            value={value}
            autoFocus={true}
            onChange={(event) => setValue(event.target.value)}
            className="input-text"
            onKeyPress={(event) =>
              event.key === "Enter" ? onMessage(value, id) : null
            }
          />
          <button
            className="ant-btn ant-btn-primary ant-btn-circle ant-btn-lg ant-btn-icon-only"
            onClick={
              message.type === "reply"
                ? () => onReply(value, id, message.messageId)
                : message.type === "forward"
                ? () => onForward(value, id, message.messageId)
                : message.type === "media"
                ? () => onMedia(value, message.media._id, id)
                : () => onMessage(value, id)
            }
            style={{ margin: "10px" }}
          >
            <SendOutlined />
          </button>
        </form>
        <CMedia />
      </div>
    </>
  );
};

export const CNewMessage = connect(
  (state) => ({
    id: state.router && state.router.match && state.router.match.params._id,
    message: state.message,
  }),
  {
    onMessage: actionCreateMessage,
    onReply: actionReply,
    onForward: actionForward,
    onMedia: actionMedia,
  }
)(InputMessage);
