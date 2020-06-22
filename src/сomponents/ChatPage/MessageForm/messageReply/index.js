import React from "react";
import { RetweetOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { connect } from "react-redux";
import { actionCleanMessage } from "../../../../actions";
import "./index.css";
import { CMessageMedia } from "../messageMedia";
import { MessageAudio } from "../messageAudio";
import { MessageVideo, LinkMessage } from "../messageVideo";

const ReplyToMessage = ({ onClean, message }) => (
  <>
    <div className="reply-to">
      <RetweetOutlined />
      <div>
        <span style={{ fontWeight: "bold" }}>{message.messageOwner}</span>
        <span>{message.messageText}</span>
      </div>
      <Button
        className="ant-button"
        type="dashed"
        shape="circle"
        onClick={() => onClean()}
      >
        X
      </Button>
    </div>
  </>
);

export const RepliesMessage = ({ message }) => {
  let replies = message.replyTo && message.replyTo._id;
  return (
    <a href={"#" + replies}>
      <div className="reply-message">
        <span className="line-reply"></span>
        <span>
          {message.replyTo &&
            message.replyTo.owner &&
            message.replyTo.owner.login}
        </span>
        <span>{message.replyTo.text.slice(0, 16) + "..."}</span>
        {message.replyTo.media !== null &&
        message.replyTo.media !== undefined ? (
          <div className="reply-media">
            {message.replyTo.media[0].type === "image/jpeg" ||
            message.replyTo.media[0].type === "image/png" ? (
              <CMessageMedia image={message.replyTo.media} />
            ) : message.replyTo.media[0].type === "audio/x-m4a" ||
              message.replyTo.media[0].type === "audio/mpeg" ||
              message.replyTo.media[0].type === "audio/mp3" ||
              message.replyTo.media[0].type === "audio/ogg" ||
              message.replyTo.media[0].type === "audio/mp4" ? (
              <MessageAudio audio={message.replyTo.media} />
            ) : message.replyTo.media[0].type === "video/mp4" ||
              message.replyTo.media[0].type === "video/ogg" ||
              message.replyTo.media[0].type === "video/webm" ? (
              <MessageVideo video={message.replyTo.media} />
            ) : null}
          </div>
        ) : null}
      </div>
    </a>
  );
};

export const CReplyToMessage = connect((state, props) => ({ props: props }), {
  onClean: actionCleanMessage,
})(ReplyToMessage);
