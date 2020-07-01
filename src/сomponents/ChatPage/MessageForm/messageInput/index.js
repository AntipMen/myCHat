import React, { useState } from "react";
import { connect } from "react-redux";
import "./index.css";
import { Button, Input, Popover } from "antd";
import {
  actionCreateMessage,
  actionReply,
  actionForward,
  actionMedia,
  actionSaveMes,
  actionEdit,
  actionCleanMessage,
  actionAudioMessage,
} from "../../../../actions";
import { CUpload } from "../upload";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { CReplyToMessage } from "../messageReply";
import { CForwardMessage } from "../messageForward";
import { CEditFormMessage } from "../messageEdit";
import newFile from "./new-file.png";

const InputMessage = ({
  message,
  id,
  onMessage,
  onReply,
  onForward,
  onMedia,
  onClean,
  onEdit,
}) => {
  const [value, setValue] = useState("");

  let handleSubmit = (event) => {
    event.preventDefault();

    setValue("");
  };

  const addEmoji = (emoji) => {
    setValue(value + emoji.native);
  };

  return (
    <>
      {message.type === "media" ? (
        <div className="attached-file">
          <img src={newFile} width="64px" alt="media" />{" "}
          <span>Attached File</span>
          <Button
            style={{ marginLeft: "auto" }}
            className="ant-button"
            type="dashed"
            shape="circle"
            onClick={() => onClean()}
          >
            X
          </Button>
        </div>
      ) : null}
      {message.type === "reply" ? <CReplyToMessage message={message} /> : null}
      {message.type === "forward" ? (
        <CForwardMessage message={message} />
      ) : null}
      {message.type === "edit" ? <CEditFormMessage message={message} /> : null}
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
            value={value}
            autoFocus={true}
            onChange={(event) => setValue(event.target.value)}
            className="input-text"
            onKeyPress={(event) => (event.keyCode === 13 ? onMessage() : null)}
          />

          <button
            className="ant-btn ant-btn-primary ant-btn-circle ant-btn-lg ant-btn-icon-only"
            onClick={
              message.type === "reply"
                ? () => onReply(value, id, message.messageId) && onClean()
                : message.type === "forward"
                ? () => onForward(value, id, message.messageId) && onClean()
                : message.type === "media"
                ? () => onMedia(value, message.media._id, id) && onClean()
                : message.type === "edit"
                ? () => onEdit(value, message.messageId) && onClean()
                : () => onMessage(value, id) && onClean()
            }
            style={{ margin: "10px" }}
          >
            <SendOutlined />
          </button>
        </form>

        <CUpload />
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
    onAudio: actionAudioMessage,
    onClean: actionCleanMessage,
    onSave: actionSaveMes,
    onEdit: actionEdit,
  }
)(InputMessage);
