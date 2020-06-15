import React, { Component, useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./MessageForm.css";
import { Button, Popover } from "antd";
import { actionReply } from "../../../actions";
import { MoreOutlined } from "@ant-design/icons";
import { CNewMessage } from "./MessageForm";
import { actionReplyMessage } from "../../../reducers/messageReducer";
import { CForwardChatsList } from "./forwardChats";
import { actionDeleteMessage } from "../../../reducers/chatsReducer";

const Content = ({ onReply, replyMessage, chatId, onDelete }) => (
  <>
    {console.log(replyMessage)}
    <div className="content-menu">
      <Button
        className="button-menu"
        type="dashed"
        onClick={() => onReply(chatId, replyMessage)}
      >
        Reply
      </Button>
      <CForwardChatsList forwardMessage={replyMessage} />
      <Button className="button-menu" type="dashed" onClick={() => onDelete(chatId, replyMessage)}>
        Delete Message
      </Button>
    </div>
  </>
);

const CContent = connect(
  (state, props) => ({
    chatId: state.router.match.params._id,
    replyMessage: props.replyMessage,
  }),
  {
    onReply: actionReplyMessage,
    onDelete: actionDeleteMessage,
  }
)(Content);

export const MessageMenu = (replyMessage) => (
  <>
    <Popover
      content={<CContent replyMessage={replyMessage.message} />}
      trigger="click"
    >
      <MoreOutlined />
    </Popover>
  </>
);
