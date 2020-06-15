import React from "react";
import { CloseOutlined, RetweetOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { connect } from "react-redux";
import { actionCleanMessage } from "../../../reducers/messageReducer";

const ReplyToMessage = ({ onClean, message }) => (
  <>
    <div className="reply-to">
      <RetweetOutlined />
      <div>
        <span style={{ fontWeight: "bold" }}>{message.messageOwner}</span>
        <span>{message.messageText}</span>
      </div>
      <div>
        <Button
          className="ant-button"
          type="dashed"
          shape="circle"
          onClick={() => onClean()}
        >
          <CloseOutlined />
        </Button>
      </div>
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
      </div>
    </a>
  );
};

export const CReplyToMessage = connect((state, props) => ({ props: props }), {
  onClean: actionCleanMessage,
})(ReplyToMessage);
